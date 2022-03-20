const express = require("express");
const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comments");
const router = express.Router();

router.post("/new", auth, commentCtrl.createComment);
router.get("/", commentCtrl.getComments);
router.delete("/:id", commentCtrl.deleteComment);

module.exports = router;
