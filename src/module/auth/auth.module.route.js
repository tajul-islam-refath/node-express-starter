const router = require("express").Router();

const {
  login,
  registration,
  logout,
  forgotPassword,
  getOTP,
} = require("./auth.module.controller");

router.post("/getOTP", getOTP);
router.post("/login", login);
router.post("/registation", registration);
router.post("/forgotPassword", forgotPassword);
router.get("/logout", logout);

module.exports = router;
