const { Router } = require("express");
const loginsignUpRouter =require("./auth/loginsignUp_router")
const adminRouter =require("./admin_router")
const userRouter =require("./user_router")
const router=Router();

router.use("/auth",loginsignUpRouter)
router.use("/admin",adminRouter)
router.use("/user",userRouter)
module.exports=router