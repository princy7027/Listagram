const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } = require("../config/config");
const fs = require("fs");
const cloudiary = require("cloudinary").v2;

cloudiary.config({
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
	cloud_name: CLOUDINARY_CLOUD_NAME,
});

async function upload(path, folder = 'home') {
	const result = await cloudiary.uploader.upload(path, { folder, overwrite: true, allowed_formats: ['jpg', 'jpeg', 'png', 'svg'], });
	fs.unlinkSync(path);
	return result;
}

async function multipleImageUpload(paths) {
	const uploadPromises = paths.map(path => upload(path));
	const uploadedImages = await Promise.all(uploadPromises);
	return uploadedImages;
}

async function destroy(publicId) {
	await cloudiary.uploader.destroy(publicId);
}

module.exports = { upload, multipleImageUpload,destroy };