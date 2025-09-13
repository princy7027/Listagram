const jwt=require("jsonwebtoken")

const {JWT_SECRET_KEY}=require("../config/config");
const createToken = (data) => {
   return jwt.sign(data, JWT_SECRET_KEY)
}

function verifyToken(token) {
   const decoded = jwt.verify(token, JWT_SECRET_KEY);
   // const currentTimestamp = Math.floor(Date.now() / 1000); 
       return { valid: true, expired: false, decoded };
   
}


module.exports = { createToken, verifyToken }