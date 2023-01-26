const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "HTML is easy",
    author: "Author 1",
    url: "url 1",
    likes: 5,
  },
  {
    title: "HTML is still easy",
    author: "Author 2",
    url: "url 2",
    likes: 2,
  },
];

async function nonExistingId() {
  const blog = new Blog({ author: "a", url: "b", title: "c" });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
}

async function blogsInDb() {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
