const lodash = require("lodash");

function dummy(blogs) {
  return 1;
}

function totalLikes(blogs) {
  let likes = 0;

  blogs.forEach((blog) => {
    likes += blog.likes;
  });

  return likes;
}

function favoriteBlog(blogs) {
  if (blogs.length === 0) {
    return undefined;
  }

  let favorite = blogs[0];

  blogs.forEach((blog) => {
    if (blog.likes > favorite.likes) {
      favorite = blog;
    }
  });

  return favorite;
}

function mostBlogs(blogs) {
  const result = {
    author: "",
    blogs: 0,
  };

  const blogCountByAuthor = lodash.countBy(blogs, (blog) => blog.author);
  lodash.forOwn(blogCountByAuthor, (value, key) => {
    if (value > result.blogs) {
      result.author = key;
      result.blogs = value;
    }
  });

  return result;
}

function mostLikes(blogs) {
  const result = {
    author: "",
    likes: 0,
  };

  const blogsByAuthor = lodash.groupBy(blogs, (blog) => blog.author);
  lodash.forOwn(blogsByAuthor, (value, key) => {
    const numLikes = totalLikes(value);
    if (numLikes > result.likes) {
      result.author = key;
      result.likes = numLikes;
    }
  });

  return result;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
