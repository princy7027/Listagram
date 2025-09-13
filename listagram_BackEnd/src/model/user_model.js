const { Schema, model } = require("mongoose");
const { hashPassword } = require("../utils/hash");

const userSchema = new Schema(
    {
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
        password: {
            type: String,
            required: true,
        },
        isLister: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        have_MemberShip: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: (_doc, ret, _option) => {
                delete ret._id;
                delete ret.password;
            },
            virtuals: true,
            versionKey: false,
        },
    },
);

userSchema.pre("save", function (next) {
    if (this.isModified(["password"])) {
        this.password = hashPassword(this.password);
    }
    next();
});
const UserModel = model("user", userSchema);

module.exports = UserModel;
