const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const JoiPassword = Joi.extend(joiPasswordExtendCore);

const addUserValidation = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: JoiPassword.string().min(6).minOfSpecialCharacters(1).minOfLowercase(1).minOfUppercase(1).minOfNumeric(1).noWhiteSpaces().required(),
});

const addHomeValidation = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().integer().required(),
    // price_After_Tax:,
    photos: Joi.string(),
    address: Joi.any().required(),
    //  address:{
    //    type:{
    //       house_no:Joi.number().required(),
    //       strret_name:Joi.string().required(),
    //    },},
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    zip: Joi.number().integer().required(),
    size: Joi.number().integer().required(),
    rooms: Joi.number().integer().required(),
    badrooms: Joi.number().integer().required(),
    bathrooms: Joi.number().integer().required(),
    garages: Joi.string(),
    garage_size: Joi.string().required(),
    basement: Joi.string().required(),
    roofing: Joi.string().required(),
    floor_no: Joi.number().integer().required(),
    available_from: Joi.date().required(),
    publicId: Joi.string(),
});

const becameListerValidation = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    contact_Number: Joi.number().required(),
    driving_licence: Joi.number().required(),
    sin_Number: Joi.number().required(),
    home_Address: Joi.any().required(),
    bathrooms: Joi.number().required(),
    badrooms: Joi.number().required(),
    link: Joi.string().required(),
});
module.exports = {
    addUserValidation,
    addHomeValidation,
    becameListerValidation,
};
