const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

async function fetchBearerToken() {
  const result = await api
    .post("/api/login")
    .send({ username: "root", password: "Danger Zone" });

  return `Bearer ${result.body.token}`;
}

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  let passwordHash = await bcrypt.hash("Danger Zone", 10);
  let user = new User({ username: "root", passwordHash });

  await user.save();

  const initialBlogs = helper.initialBlogs.map((b) => {
    return {
      ...b,
      user: user._id,
    };
  });

  passwordHash = await bcrypt.hash("Highway", 10);
  user = new User({ username: "user", passwordHash });

  await user.save();

  initialBlogs[0].user = user._id;

  await Blog.insertMany(initialBlogs);
});

describe("common api behaviour", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are initialBlogs.length blogs", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("id should be named id", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].id).toBeDefined();
  });
});

describe("viewing a specific blog", () => {
  test("a specific blog can be viewed", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(resultBlog.body.author).toEqual(blogToView.author);
  });

  test("fails with 404 if blog does not exist", async () => {
    const validNonExistingBlogId = await helper.nonExistingId();

    await api.get(`/api/blogs/${validNonExistingBlogId}`).expect(404);
  });

  test("fails with 400 if id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe("adding a new blog", () => {
  test("a new blog is added", async () => {
    const blog = {
      title: "A new blog",
      author: "Author of the blog",
      url: "url of the blog",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .set({ Authorization: await fetchBearerToken() })
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const contents = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(contents).toContain("A new blog");
  });

  test("likes default to zero", async () => {
    const blog = {
      title: "no likes",
      author: "author",
      url: "url",
    };

    const response = await api
      .post("/api/blogs")
      .set({ Authorization: await fetchBearerToken() })
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  test("blog without title is not added", async () => {
    const blog = {
      author: "author",
      url: "url",
    };

    await api
      .post("/api/blogs")
      .set({ Authorization: await fetchBearerToken() })
      .send(blog)
      .expect(400);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("blog without url is not added", async () => {
    const blog = {
      title: "title",
      author: "author",
    };

    await api
      .post("/api/blogs")
      .set({ Authorization: await fetchBearerToken() })
      .send(blog)
      .expect(400);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});

describe("deleting a blog", () => {
  test("an existing blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[1];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: await fetchBearerToken() })
      .expect(204);

    const blogsAfterDelete = await helper.blogsInDb();
    expect(blogsAfterDelete).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAfterDelete.map((r) => r.title);
    expect(titles).not.toContain(blogToDelete.title);
  });

  test("deleting a blog that belongs to another user is not allowed", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: await fetchBearerToken() })
      .expect(401);

    const blogsAfterDelete = await helper.blogsInDb();
    expect(blogsAfterDelete).toHaveLength(blogsAtStart.length);
  });

  test("deleting nonexisting blog results 204", async () => {
    const validNonExistingBlogId = await helper.nonExistingId();

    await api
      .delete(`/api/blogs/${validNonExistingBlogId}`)
      .set({ Authorization: await fetchBearerToken() })
      .expect(204);
  });
});

describe("updating a blog", () => {
  test("a blog can be updated", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    blogToUpdate.title = "new title";
    blogToUpdate.author = "new author";
    blogToUpdate.url = "new url";
    blogToUpdate.likes += 1;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set({ Authorization: await fetchBearerToken() })
      .send(blogToUpdate)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const updatedBlog = await api.get(`/api/blogs/${blogToUpdate.id}`);

    expect(updatedBlog.body).toMatchObject(blogToUpdate);

    const blogsAfterUpdate = await helper.blogsInDb();
    expect(blogsAfterUpdate).toHaveLength(blogsAtStart.length);
  });

  test("updating nonexisting blog results in 404", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const validNonExistingBlogId = await helper.nonExistingId();

    blogToUpdate = {
      title: "new title",
      author: "new author",
      url: "new url",
      likes: 1,
    };

    await api
      .put(`/api/blogs/${validNonExistingBlogId}`)
      .set({ Authorization: await fetchBearerToken() })
      .send(blogToUpdate)
      .expect(404);

    await api.get(`/api/blogs/${blogToUpdate.id}`);

    const blogsAfterUpdate = await helper.blogsInDb();
    expect(blogsAfterUpdate).toHaveLength(blogsAtStart.length);

    const titles = blogsAfterUpdate.map((r) => r.title);
    expect(titles).not.toContain("new title");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
