const { Schema, model } = require("mongoose");

const listerSchema = new Schema(
    {
      userId:{
         type: Schema.Types.ObjectId,
         ref: "user",
      },
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
        contact_Number: {
            type: Number,
            required: true,
        },
        driving_licence: {
            type: Number,
            required: true,
        },
        sin_Number: {
            type: Number,
            required: true,
        },
        home_Address: {
            type: String,
            required: true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        badrooms: {
            type: Number,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
        request_status: {
            type: String,
            default: "pending",
            enum: ["pending", "approved", "rejected"]
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

const ListerModel = new model("lister", listerSchema);

module.exports = ListerModel;
