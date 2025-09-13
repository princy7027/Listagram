const { Router } = require("express");
const { verifyUser } = require("../../middleware/verify_user");
const { createUser, login, forgetPasswordVerifyEmail, verifyOtpForgetPwd, newPasswordForgetPwd } = require("../../controller/auth/loginsignUp_controller");

const router = Router();
router.post("/add-User", createUser);
router.post("/login", login);
router.post("/verify-email", forgetPasswordVerifyEmail);
router.post("/verify-otp-ChnagePwd", verifyOtpForgetPwd);
router.post("/changePwd-ForgetPwd", newPasswordForgetPwd);

module.exports = router;
