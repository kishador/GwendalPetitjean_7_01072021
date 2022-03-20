const express = require("express");
const multer = require("../middleware/multer-config");
const router = express.Router();
const usersCtrl = require("../controllers/users");
const auth = require("../middleware/auth");

router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);
router.delete("/:id", usersCtrl.deleteProfile);
router.get("/:id", auth, usersCtrl.getUser);
router.get("/", usersCtrl.getAllUsers);
router.put("/picture/:id", auth, multer, usersCtrl.updateProfile);

module.exports = router;
