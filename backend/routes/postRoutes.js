const express = require("express");
const router = express.Router();
const blogpostController = require("../controllers/postControllers");
router.post("/posts", blogpostController.postBlog);
router.get("/posts", blogpostController.getPost);
router.put("/post/:id", blogpostController.putPost);
router.delete("/post/:id", blogpostController.deletePost);
module.exports = router;
