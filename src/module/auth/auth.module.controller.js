const Auth = require("./auth.module.model");
const { sendMail } = require("../../service/email.service");
const { generateOTP, generateHash, verify } = require("../../helpers/helpers");

exports.getOTP = async (req, res, next) => {
  let { email } = req.body;
  let otp = generateOTP();

  try {
    await sendMail(
      email,
      "OTP for authentication",
      `Your OTP is ( ${otp} ) it will expire in 10 minutes`
    );

    let hash = generateHash(email, otp);

    res.status(200).json({
      success: true,
      message: "Send otp for authentication success",
      hash,
      email,
    });
  } catch (e) {
    console.error("get otp failed");
    next(e);
  }
};

exports.login = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    let user = await Auth.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email or password not match",
      });
    }

    if (password !== user.password) {
      return res.status(404).json({
        success: false,
        message: "Email or password not match",
      });
    }

    res.status(200).json({
      success: false,
      message: "Login success",
    });
  } catch (error) {
    console.error("Login error");
    next(error);
  }
};

exports.registration = async (req, res, next) => {
  let { email, otp, hash, password } = req.body;

  try {
    if (!email || !password || !otp) {
      return res.status(404).json({
        success: false,
        message: "Email , password and OTP is required",
      });
    }

    let isVerified = verify(email, otp, hash);
    if (!isVerified) {
      return res.status(404).json({
        success: false,
        message: "registration failed try again with valid credentials",
      });
    }

    let user = await Auth.create({
      email: email,
      password: password,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user,
    });
  } catch (error) {
    console.error("registration failed");
    next(error);
  }
};

exports.forgotPassword = (req, res, next) => {};
exports.logout = (req, res, next) => {};
