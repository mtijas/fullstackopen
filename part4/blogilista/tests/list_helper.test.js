const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Foo",
      author: "Bar",
      url: "",
      likes: 42,
      __v: 0,
    },
  ];

  const listWithManyBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Foo",
      author: "Bar",
      url: "",
      likes: 42,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f7",
      title: "Foo1",
      author: "Bar1",
      url: "url1",
      likes: 3,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f6",
      title: "Foo2",
      author: "Bar2",
      url: "",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f5",
      title: "Foo3",
      author: "Bar3",
      url: "",
      likes: 15,
      __v: 0,
    },
  ];

  test("Empty list has zero likes", () => {
    const result = listHelper.totalLikes([]);

    expect(result).toBe(0);
  });

  test("List with one blog should result in likes equal the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);

    expect(result).toBe(42);
  });

  test("List with many blogs should result in sum of likes", () => {
    const result = listHelper.totalLikes(listWithManyBlogs);

    expect(result).toBe(60);
  });
});

describe("favorite blog", () => {
  test("Empty list returns undefined", () => {
    const result = listHelper.favoriteBlog([]);

    expect(result).toBe(undefined);
  });

  test("List with one blog should return that one blog", () => {
    const result = listHelper.favoriteBlog([
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Foo",
        author: "Bar",
        url: "",
        likes: 42,
        __v: 0,
      },
    ]);

    expect(result).toEqual({
      _id: "5a422aa71b54a676234d17f8",
      title: "Foo",
      author: "Bar",
      url: "",
      likes: 42,
      __v: 0,
    });
  });

  test("List with many blogs should return the blog with most likes", () => {
    const result = listHelper.favoriteBlog([
      {
        _id: "5a422aa71b54a676234d17f7",
        title: "Foo1",
        author: "Bar1",
        url: "url1",
        likes: 3,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f6",
        title: "Foo2",
        author: "Bar2",
        url: "",
        likes: 0,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Foo",
        author: "Bar",
        url: "",
        likes: 42,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f5",
        title: "Foo3",
        author: "Bar3",
        url: "",
        likes: 15,
        __v: 0,
      },
    ]);

    expect(result).toEqual({
      _id: "5a422aa71b54a676234d17f8",
      title: "Foo",
      author: "Bar",
      url: "",
      likes: 42,
      __v: 0,
    });
  });

  test("List with many blogs should return the blog with most likes, test 2", () => {
    const result = listHelper.favoriteBlog([
      {
        _id: "5a422aa71b54a676234d17f7",
        title: "Foo1",
        author: "Bar1",
        url: "url1",
        likes: 3,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f6",
        title: "Foo2",
        author: "Bar2",
        url: "",
        likes: 42,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Foo",
        author: "Bar",
        url: "",
        likes: 42,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f5",
        title: "Foo3",
        author: "Bar3",
        url: "",
        likes: 15,
        __v: 0,
      },
    ]);

    expect(result).toEqual({
      _id: "5a422aa71b54a676234d17f6",
      title: "Foo2",
      author: "Bar2",
      url: "",
      likes: 42,
      __v: 0,
    });
  });
});

describe("most blogs", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Foo",
      author: "Bar",
      url: "",
      likes: 42,
      __v: 0,
    },
  ];

  const listWithManyBlogs = [
    {
      _id: "5a422aa71b54a676234d17f7",
      title: "Foo1",
      author: "Bar",
      url: "url1",
      likes: 3,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f6",
      title: "Foo2",
      author: "Bar",
      url: "",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Foo",
      author: "Bar1",
      url: "",
      likes: 42,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f5",
      title: "Foo3",
      author: "Bar2",
      url: "",
      likes: 15,
      __v: 0,
    },
  ];

  test("Empty list should return object with empty author and zero blogs", () => {
    const result = listHelper.mostBlogs([]);

    expect(result).toEqual({
      author: "",
      blogs: 0,
    });
  });

  test("List with one blog should result in author of that blog and 1 as blogs", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);

    expect(result).toEqual({
      author: "Bar",
      blogs: 1,
    });
  });

  test("List with many blogs from same author returns that author and number of blogs", () => {
    const result = listHelper.mostBlogs(listWithManyBlogs);

    expect(result).toEqual({
      author: "Bar",
      blogs: 2,
    });
  });
});

describe("most likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Foo",
      author: "Bar",
      url: "",
      likes: 42,
      __v: 0,
    },
  ];

  const listWithManyBlogs = [
    {
      _id: "5a422aa71b54a676234d17f7",
      title: "Foo1",
      author: "Bar",
      url: "url1",
      likes: 8,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f6",
      title: "Foo2",
      author: "Bar",
      url: "",
      likes: 2,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f9",
      title: "Foo",
      author: "Bar1",
      url: "",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Foo",
      author: "Bar1",
      url: "",
      likes: 6,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f5",
      title: "Foo3",
      author: "Bar2",
      url: "",
      likes: 11,
      __v: 0,
    },
  ];

  test("Empty list should return object with empty author and zero likes", () => {
    const result = listHelper.mostLikes([]);

    expect(result).toEqual({
      author: "",
      likes: 0,
    });
  });

  test("List with one blog should result in author of that blog and number of likes", () => {
    const result = listHelper.mostLikes(listWithOneBlog);

    expect(result).toEqual({
      author: "Bar",
      likes: 42,
    });
  });

  test("List with many blogs from same author returns author with most likes and sum of likes", () => {
    const result = listHelper.mostLikes(listWithManyBlogs);

    expect(result).toEqual({
      author: "Bar1",
      likes: 11,
    });
  });
});
