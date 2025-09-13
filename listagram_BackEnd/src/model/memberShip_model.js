const { required, date } = require("joi");
const { Schema, model } = require("mongoose");

const mmemberShipSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    creditCard_Number: {
        type: Number,
        required: true,
    },
    cvv_Number: {
        type: Number,
        required: true,
    },
    expiry_date: {
        type: Date,
        required: true,
    },
    memberShip_Amount: {
        type: Number,
        default: 0,
    },
    memberShip_Type: {
        type: String,
        required: true,
        enum: ["Free", "Standard", "Enterprised"],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
});

const MemberShipModel = new model("memberShip", mmemberShipSchema);
module.exports = MemberShipModel;
