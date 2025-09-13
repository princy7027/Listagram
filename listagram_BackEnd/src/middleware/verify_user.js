const { verifyToken } = require("../authentication/jwt_token");
const ApiError = require("../utils/error");

function verifyUser(role) {
    return async (req, _res, next) => {
        try {
            const authorization = req.headers["authorization"];
            if (!authorization) {
                return next(new ApiError(401, "Unauthorized user"));
            }
            const token = authorization.split(" ")[1];
            if (!token) {
                return next(new ApiError(401, "Unauthorized user"));
            }
            const data = verifyToken(token);

            if (!data || !data.valid) {
               //  if (data.expired) {
               //      return next(new ApiError(401, "Token expired")); // Handle expired token
               //  } else {
                    return next(new ApiError(401, "Invalid token"));
               //  }
            }

            const { decoded } = data;
            if (typeof role === "string") {
                if (decoded.role === role) {
                    req.id = decoded._id;
                    req.role = decoded.role;
                    return next();
                }
            } else {
                if (role.includes(decoded.role)) {
                    req.id = decoded._id;
                    req.role = decoded.role;
                    return next();
                }
            }

            return next(new ApiError(401, "Role mismatch"));
        } catch (e) {
            return next(new ApiError(400,e.message));
        }
    }
}

module.exports = { verifyUser };