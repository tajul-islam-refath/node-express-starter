const otpGenerator = require("otp-generator");
const crypto = require("crypto");

exports.generateOTP = () => {
  const otp = otpGenerator.generate(6, {
    alphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  return otp;
};

exports.generateHash = (email, otp) => {
  let time = 10 * 60 * 1000;
  let exTime = Date.now() + time;

  let hashObj = `${email}.${otp}.${exTime}`;
  let hash = crypto
    .createHmac("sha256", process.env.KEY)
    .update(hashObj)
    .digest("hex");
  let fullHash = `${hash}.${exTime}`;

  return fullHash;
};

exports.verify = (email, otp, fullHash) => {
  let [hash, exTime] = fullHash.split(".");

  if (Date.now() > exTime) return false;

  let hashObj = `${email}.${otp}.${exTime}`;
  let newhash = crypto
    .createHmac("sha256", process.env.KEY)
    .update(hashObj)
    .digest("hex");

  if (newhash == hash) return true;
  return false;
};
