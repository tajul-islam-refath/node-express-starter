var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.sendMail = async (email, subject, body) => {
  let mailOptions = {
    from: `${process.env.EMAIL}`,
    to: email,
    subject: subject,
    text: body,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log(info.response);
  } catch (err) {
    throw new Error("Email send fail");
  }
};
