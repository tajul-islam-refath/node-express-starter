const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// authSchema.pre("save", async function () {
//   let hashPass = await bcrypt.hash(this.password, 11);
//   this.password = hashPass;
// });

// authSchema.methods.checkPassword = async function (password) {
//   console.log(await bcrypt.hash(this.password, 11));
//   let res = await bcrypt.compare(password, this.password);
//   return res;
// };

authSchema.methods.getToken = function () {
  var token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.KEY,
    { expiresIn: 5 * 60 * 60 * 1000 }
  );

  return token;
};

const Auth = model("Auth", authSchema);
module.exports = Auth;
