const { createToken } = require("../../authentication/jwt_token");
const { addUserValidation } = require("../../config/joi.validation");
const UserModel = require("../../model/user_model");
const ApiError = require("../../utils/error");
const { compareHash, hashPassword } = require("../../utils/hash");
const { USER_ROLE, ADMIN_ROLE } = require("../../config/string");
const generateOtp = require("../../utils/genarate_otp");
const transporter = require("../../utils/transporter");
const fs = require("fs");
const path = require("path");
const OtpModel = require("../../model/otp_model");
const AdminModel = require("../../model/admin_model");

async function createUser(req, res, next) {
    try {
        const id = req.id;
        const findUser = await UserModel.findOne({ email: req.body.email });
        if (findUser) {
            return next(new ApiError(400, "Already contain this email"));
        }
        // req.body.company = id;

        const userValid = addUserValidation.validate(req.body);
        if (userValid.error) {
            return next(new ApiError(403, userValid.error.details[0].message));
        }

        const user = new UserModel(req.body);
        await user.save();
        res.status(201).json({ success: true, message: "User added successfully" });
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const findUser = await UserModel.findOne({ email });
        if (findUser) {
            const userActive = await UserModel.findOne({ email: email, isActive: true })
            if (userActive) {
                const comparePass = compareHash(password, findUser.password);
                if (comparePass == true) {
                    const token = createToken({ id: findUser._id, role: USER_ROLE, ...findUser.toObject() });
                    res.status(200).json({ success: true, message: "login successfully", token: token, role: USER_ROLE });
                } else {
                    return next(new ApiError(401, "Password is wrong"));
                }
            } else {
                return next(new ApiError(401, "You aren't user anymore!!"));

            }

        } else {
            const findAdmin = await AdminModel.findOne({ email });
            if (findAdmin) {
                const token = createToken({ id: findAdmin._id, role: ADMIN_ROLE });
                res.status(200).json({
                    success: true,
                    message: "you login successfully",
                    token: token,
                    role: ADMIN_ROLE,
                });
            }
            return next(new ApiError(401, "Email not exist"));
        }
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

async function forgetPasswordVerifyEmail(req, res, next) {
    try {
        debugger;
        const { email } = req.body;
        const filePath = path.join(__dirname, "../../../public/otp.html");
        let htmlData = fs.readFileSync(filePath, "utf-8");
        const otp = generateOtp();
        htmlData = htmlData.replace("${otp}", otp);
        transporter.sendMail(
            {
                to: email,
                subject: "Verify email",
                html: htmlData,
            },
            async (err, _result) => {
                if (err) {
                    return next(new ApiError(400, err.message));
                }
                await OtpModel.deleteMany({ email: email });
                const otpModel = new OtpModel({ email, otp });
                await otpModel.save();
                setTimeout(async () => {
                    await OtpModel.findByIdAndDelete(otpModel._id);
                }, 1000 * 60);
                res.status(200).json({
                    statusCode: 200,
                    success: true,
                    message: "Otp send your email",
                });
            },
        );
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

async function verifyOtpForgetPwd(req, res, next) {
    try {
        const { otp } = req.body;
        const findOtp = await OtpModel.findOne({ otp });
        if (!findOtp) {
            return next(new ApiError(400, "Otp Expired"));
        } else {
            res.status(200).json({
                statusCode: 200,
                success: true,
                message: "Otp verify successfully",
            });
        }
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

async function newPasswordForgetPwd(req, res, next) {
    try {
        const { email, newPassword } = req.body;
        const findEmail = await UserModel.findOne({ email });
        if (!findEmail) {
            return next(new ApiError(400, "Email not exist"));
        } else {
            const hashPwd = hashPassword(newPassword);
            const newPwdSet = await UserModel.updateOne({ email: email }, { $set: { password: hashPwd } });
            res.status(200).json({
                statusCode: 200,
                success: true,
                message: "Password update successfully",
            });
        }
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}
module.exports = {
    createUser,
    login,
    forgetPasswordVerifyEmail,
    verifyOtpForgetPwd,
    newPasswordForgetPwd,
};
