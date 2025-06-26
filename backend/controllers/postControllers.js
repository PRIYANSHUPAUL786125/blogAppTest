const BlogPost = require("../models/BlogPost");
const postBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await BlogPost.create({
      title,
      content,
      author: req.user.name,
      userId: req.user._id,
    });
    res.status(201).json({
      message: "blogpost has been successfully stored",
      newPost,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "sorry the blog cant being posted", error });
    console.log(error);
  }
};
const getPost = async (req, res) => {
  try {
    const allPost = await BlogPost.find({});
    res.status(200).json({
      message: "the post are retrieved successfully",
      allPost,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "sorry error retrieving the blog posts", error });
    console.log(error);
  }
};
const putPost = async (req, res) => {
  try {
    const tokenid = req.user._id;
    const updatedBlogId = req.params.id;
    const blog = await BlogPost.findById(updatedBlogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (tokenid.toString() !== blog.userId.toString()) {
      return res.status(401).json({
        message: "unauthorized user that to be updated",
      });
    } else {
      const reqdPost = await BlogPost.findOneAndUpdate(
        { _id: updatedBlogId },
        req.body,
        { new: true, runValidators: true }
      );
      res.status(200).json({
        message: "blog post has been successfully updated",
        reqdPost,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "the blog post cant been updated",
      error,
    });
  }
};
const deletePost = async (req, res) => {
  try {
    const tokenid = req.user._id;
    const updatedBlogId = req.params.id;
    const blog = await BlogPost.findById(updatedBlogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (tokenid.toString() !== blog.userId.toString()) {
      return res.status(401).json({
        message: "unauthorized user that to be updated",
      });
    } else {
      const reqdPost = await BlogPost.findOneAndDelete(
        { _id: updatedBlogId },
        { new: true, runValidators: true }
      );
      res.status(200).json({
        message: "blog post has been successfully deleted",
        reqdPost,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "the blog post cant been deleted",
      error,
    });
  }
};
module.exports = { postBlog, getPost, putPost, deletePost };
