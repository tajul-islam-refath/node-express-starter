const { Schema, model } = require("mongoose");

const authSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Auth = model("Auth", authSchema);
module.exports = Auth;
