const express = require("express");
const controller = require("../controller/Clogin");
const router = express.Router();

router.get("/",controller.main);

router.get("/register",controller.registerMain);
router.post("/register",controller.registerId);

router.get("/login",controller.userMain);
router.post("/login",controller.userLogin);

router.post("/profile",controller.postProfile);
router.patch("/profile/edit",controller.editProfile);
router.delete("/profile/delete",controller.deleteProfile);

router.get("/findall",controller.findAll);
module.exports = router;