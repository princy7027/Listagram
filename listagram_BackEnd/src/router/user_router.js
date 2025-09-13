const { USER_ROLE, ADMIN_ROLE } = require("../config/string");
const { Router } = require("express");
const { verifyUser } = require("../middleware/verify_user");
const { becameLister, singleList, filterData, addToWishList, removeWishList, getWishList, getMemberShip } = require("../controller/user_controller");
const { addHome, viewAllList } = require("../controller/admin_controller");
const multer = require("../middleware/multer");

const router = Router();
router.post("/becameLister", verifyUser(USER_ROLE), becameLister);
router.post("/addHome", verifyUser(USER_ROLE), multer.array("photos", 9), addHome);
router.get("/view_All_List", verifyUser(USER_ROLE), viewAllList);
router.get("/view_Single_All_List/:id", verifyUser(USER_ROLE), singleList);
router.get("/filter/:key", verifyUser(USER_ROLE), filterData);
router.post("/wishList", verifyUser(USER_ROLE), addToWishList);
router.get("/get/wishList", verifyUser(USER_ROLE), getWishList);
router.delete("/remove/wishList/:id", verifyUser(USER_ROLE), removeWishList);
router.post("/memberShip", verifyUser(USER_ROLE), getMemberShip);

module.exports = router;
