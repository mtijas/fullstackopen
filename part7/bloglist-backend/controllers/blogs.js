const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments", {
      content: 1,
    });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("comments", {
    content: 1,
  });
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  if (request.token === null) {
    return response.status(401).json({ error: "token missing" });
  }
  const user = request.user;

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  });
  if (updatedBlog !== null) {
    response.json(updatedBlog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id);

  if (blogToDelete === null) {
    return response.status(204).end();
  }
  if (blogToDelete.user.toString() !== request.user._id.toString()) {
    return response.status(401).end();
  }

  await blogToDelete.delete();
  response.status(204).end();
});

blogsRouter.post("/:id/comments", async (request, response) => {
  if (request.token === null) {
    return response.status(401).json({ error: "token missing" });
  }

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    response.status(404).end();
  }

  const user = request.user;

  const comment = new Comment({
    content: request.body.content,
    user: user._id,
    blog: blog._id,
  });
  const savedComment = await comment.save();
  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();

  response.status(201).json(savedComment);
});

module.exports = blogsRouter;
