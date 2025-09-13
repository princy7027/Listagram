const ApiError = require("../utils/error");

module.exports = function (err, _req, res, _next) {
	if (err instanceof ApiError) {
		res.status(err.statusCode).json({ success: false, message: err.message });
	} else {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
