const { Schema, model } = require("mongoose");
const { hashPassword } = require("../utils/hash");

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (_doc, ret, _option) => {
            delete ret._id;
            delete ret.password;
        },
        virtuals: true,
        versionKey: false,
    },
});

// adminSchema.pre("save", function (next) {
//     if (this.isModified(["password"])) {
//         this.password = hashPassword(this.password);
//     }
//     next();
// });
const AdminModel = model("admin", adminSchema);

module.exports = AdminModel;