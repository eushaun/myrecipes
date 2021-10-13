const { Router } = require("express");
const commentController = require("../controllers/commentController");

const router = Router();

router.get("/", commentController.getComments);

router.post("/", commentController.createComment);

router.put("/", commentController.editComment);

router.delete("/:cid([0-9]+)", commentController.deleteComment);

router.post("/flag", commentController.flagComment);

router.delete("/unflag/:cid([0-9]+)/:uid([0-9]+)", commentController.unflagComment);

module.exports = router;
