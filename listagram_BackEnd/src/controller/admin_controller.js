const { addHomeValidation } = require("../config/joi.validation");
const { USER_ROLE, ADMIN_ROLE } = require("../config/string");
const HomeModel = require("../model/home_model");
const UserModel = require("../model/user_model");
const { multipleImageUpload } = require("../utils/cloudinary");
const fs = require("fs");
const path = require("path");
const ApiError = require("../utils/error");
const ListerModel = require("../model/lister_model");
const transporter = require("../utils/transporter");
const WishListModel = require("../model/wishList_model");
const MemberShipModel = require("../model/memberShip_model");

async function viewAllUsers(req, res, next) {
    debugger;
    try {
        const allUsers = await UserModel.find({ isActive: true });
        res.status(200).json({ success: true, data: allUsers });
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

async function addHome(req, res, next) {
    try {
        const id = req.id;
        const role = req.role;
        if (req.role === USER_ROLE) {
            console.log(id);
            const findStatus = await ListerModel.find({ userId: id, request_status: "approved" });
            console.log(findStatus);
            if (findStatus.length === 0) {
                return next(new ApiError(403, "You are not approved as a lister"));
            } else {
                const updateLister = await UserModel.findByIdAndUpdate({ _id: id }, { $set: { isLister: true } }, { new: true });
            }
        }
        const homeValidation = addHomeValidation.validate(req.body);
        if (homeValidation.error) {
            return next(new ApiError(403, homeValidation.error.details[0].message));
        }
        const file = req.files;
        if (!file) {
            return next(new ApiError(403, "Home photos ares required"));
        }
        const result = await multipleImageUpload(file.map((e) => e.path));
        req.body.photos = result.map((e) => {
            return { url: e.secure_url, publicId: e.public_id };
        });
        const home = new HomeModel({
            ...req.body,
            role: role,
        });
        await home.save();
        res.status(201).json({ success: true, message: "New home listed" });
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

async function updateHome(req, res, next) {
    try {
        const id = req.params.id;
        if (req.file) {
            const result = await multipleImageUpload(file.map((e) => e.path));
            req.body.photos = result.map((e) => {
                return { url: e.secure_url, publicId: e.public_id };
            });
        }
        const home = await HomeModel.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true });
        res.status(201).json({ success: true, data: home, message: "details update successfully" });
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}
async function deleteHome(req, res, next) {
    try {
        const id = req.params.id;
        const home = await HomeModel.findByIdAndUpdate({ _id: id }, { $set: { isActive: false } }, { new: true });
        res.status(201).json({ success: true, data: home, message: "details delete successfully" });
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

async function viewAllList(req, res, next) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    try {
        const totalDocuments = await HomeModel.countDocuments({ isActive: true });

        const allHomes = await HomeModel.find({ isActive: true }).limit(limit).skip(startIndex);

        // Pagination result object
        const paginationResult = {};
        if (endIndex < totalDocuments) {
            paginationResult.next = {
                page: page + 1,
                limit: limit,
            };
        }
        if (startIndex > 0) {
            paginationResult.previous = {
                page: page - 1,
                limit: limit,
            };
        }

        res.status(200).json({ success: true, data: allHomes, pagination: paginationResult, message: "List of data" });
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

async function getAllListerRequest(req, res, next) {
    try {
        const listerRequest = await ListerModel.find();
        const filteredRequests = listerRequest.filter((e) => e.request_status != "rejected");
        res.status(200).json({ success: true, data: filteredRequests, message: "List of requests to become lister" });
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

async function updateListerStatus(req, res, next) {
    try {
        const id = req.params.id;
        const findLister = await ListerModel.findOneAndUpdate({ _id: id }, { $set: { request_status: req.body.request_status } }, { new: true });

        const email = findLister.email;
        const filePath = path.join(__dirname, "../../public/status.html");
        let htmlData = fs.readFileSync(filePath, "utf-8");
        const status = findLister.request_status;
        htmlData = htmlData.replace("${status}", status);
        transporter.sendMail(
            {
                to: email,
                subject: "update status",
                html: htmlData,
            },
            async (err, _result) => {
                if (err) {
                    return next(new ApiError(400, err.message));
                }

                res.status(200).json({
                    statusCode: 200,
                    success: true,
                    message: "request_status send to  your email",
                });
            },
        );
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

async function viewAllLister(req, res, next) {
    try {
        const lister = await HomeModel.find({ role: "User" });
        res.status(200).json({ success: true, data: lister });
    } catch (error) {
        next(new ApiError(error.message));
    }
}

async function deleteUser(req, res, next) {
    try {
        const id = req.params.id;
        const deleteUser = await UserModel.findByIdAndUpdate({ _id: id }, { $set: { isActive: false } }, { new: true });
        res.status(201).json({ success: true, data: deleteUser, message: "User delete successfully" });
    } catch (error) {
        next(new ApiError(error.message));
    }
}

async function getWishList(req, res, next) {
    try {
        const allWishList = await WishListModel.find().populate("homeId").populate("user");
        const filterData = allWishList.filter((e) => e.isWishList === true);
        res.status(200).json({ success: true, data: filterData });
    } catch (error) {
        next(new ApiError(error.message));
    }
}
async function getMemberShipDetail(req, res, next) {
    try {
        const allMemberShip = await MemberShipModel.find().populate("user");
        res.status(200).json({ success: true, data: allMemberShip });
    } catch (error) {
        next(new ApiError(error.message));
    }
}
module.exports = { viewAllUsers, addHome, updateHome, deleteHome, viewAllList, getAllListerRequest, updateListerStatus, viewAllLister, deleteUser, getWishList, getMemberShipDetail };
