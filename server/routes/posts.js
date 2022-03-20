
const express = require("express");
const postsCtrl = require("../controllers/posts");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const router = express.Router();

router.post("/new", auth, multer, postsCtrl.createPost);
router.get("/", postsCtrl.getPosts);
router.delete("/:id", multer, postsCtrl.deletePost);

module.exports = router;


