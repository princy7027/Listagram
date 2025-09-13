const { USER_ROLE, ADMIN_ROLE } = require("../config/string");
const { becameListerValidation } = require("../config/joi.validation");
const ListerModel = require("../model/lister_model");
// const UserModel = require("../model/user_model");
const ApiError = require("../utils/error");
const HomeModel = require("../model/home_model");
const WishListModel = require("../model/wishList_model");
const MemberShipModel = require("../model/memberShip_model");
const UserModel = require("../model/user_model");

async function becameLister(req, res, next) {
    try {
        const id = req.id;
        // const findUser=await UserModel.findById({id:id})
        // const listerValid = becameListerValidation.validate(req.body);
        // if (listerValid.error) {
        //    return next(new ApiError(403, listerValid.error.details[0].message));
        // }
        const listerRequest = new ListerModel({
            ...req.body,
            userId: id,
        });
        await listerRequest.save();
        res.status(201).json({ success: true, message: "lister request created" });
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

async function singleList(req, res, next) {
    try {
        const id = req.params.id;
        const findList = await HomeModel.findById({ _id: id });
        res.status(200).json({ success: true, data: findList });
    } catch (error) {
        next(new ApiError(error.message));
    }
}

async function filterData(req, res, next) {
    try {
        const userInput = req.params.key;

        const data = {
            $or: [
                {
                    title: { $regex: userInput, $options: "i" },
                },

                {
                    address: { $regex: userInput, $options: "i" },
                },
                {
                    country: { $regex: userInput, $options: "i" },
                },
                {
                    state: { $regex: userInput, $options: "i" },
                },
                {
                    city: { $regex: userInput, $options: "i" },
                },
                {
                    garages: { $regex: userInput, $options: "i" },
                },
                {
                    garage_size: { $regex: userInput, $options: "i" },
                },
                {
                    basement: { $regex: userInput, $options: "i" },
                },
                {
                    roofing: { $regex: userInput, $options: "i" },
                },
                {
                    price: parseInt(userInput),
                },
                {
                    size: parseInt(userInput),
                },
                {
                    zip: parseInt(userInput),
                },
                {
                    bathrooms: parseInt(userInput),
                },
                {
                    badrooms: parseInt(userInput),
                },
                {
                    rooms: parseInt(userInput),
                },
                {
                    floor_no: parseInt(userInput),
                },
            ],
        };
        let filteredData = await HomeModel.find(data);
        res.status(200).json({
            success: true,
            data: filteredData,
        });
    } catch (error) {
        next(new ApiError(error.message));
    }
}

async function addToWishList(req, res, next) {
    try {
        const wishListProduct = new WishListModel({ user: req.id, ...req.body });
        await wishListProduct.save();
        res.status(201).json({ success: true, data: wishListProduct, message: "Add to wishlist..!" });
    } catch (error) {
        next(new ApiError(error.message));
    }
}

async function removeWishList(req, res, next) {
    try {
        const id = req.params.id;
        const deleteWishList = await WishListModel.findByIdAndUpdate({ _id: id }, { $set: { isWishList: false } }, { new: true });
        res.status(200).json({ success: true, message: "Remove from wishlist..!", data: deleteWishList });
    } catch (error) {
        next(new ApiError(error.message));
    }
}
async function getWishList(req, res, next) {
    try {
        const id = req.id;
        const allWishList = await WishListModel.find({ user: id }).populate("homeId").populate("user");
        const filterData = allWishList.filter((e) => e.isWishList === true);
        res.status(200).json({ success: true, data: filterData });
    } catch (error) {
        next(new ApiError(error.message));
    }
}

async function getMemberShip(req, res, next) {
    try {
        const email = req.body.email;
        const findUser = await UserModel.find({ email: email });
        if (findUser) {
            const memberShip = new MemberShipModel({ user: req.id, ...req.body });
            await memberShip.save();
            const setMemberShip = await UserModel.findByIdAndUpdate({ _id: req.id }, { $set: { have_MemberShip: true } }, { new: true });
            res.status(201).json({ success: true, data: memberShip, message: "Get membership..!🎉🎉" });
        } else {
            res.status(403).json({ success: false, data: memberShip, message: "Email not exist" });
        }
    } catch (error) {
        next(new ApiError(error.message));
    }
}
module.exports = {
    becameLister,
    singleList,
    filterData,
    addToWishList,
    removeWishList,
    getWishList,
    getMemberShip,
};
