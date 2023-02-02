import React from "react";

function BlogList(blogs) {
  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
}

function Blog({ blog }) {
  return (
    <div>
      {blog.title} {blog.author}
    </div>
  );
}

export { Blog, BlogList };
