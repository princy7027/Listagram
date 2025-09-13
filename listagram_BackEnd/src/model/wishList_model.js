const { Schema, model } = require("mongoose");

const wishListSchema = new Schema({
    homeId: {
        type: Schema.Types.ObjectId,
        ref: "home",
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    isWishList: {
        type: Boolean,
        default: true,
    },
});

const WishListModel = new model("wishList", wishListSchema);
module.exports = WishListModel;
