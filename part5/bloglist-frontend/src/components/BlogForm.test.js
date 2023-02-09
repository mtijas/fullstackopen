import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  let blogService;
  let handleSetBlogs;
  let handleSetNotification;
  let dummyUser;
  let blog;
  let blogFormRef;

  beforeEach(() => {
    blogService = jest.fn();
    blogService.create = jest.fn();
    handleSetBlogs = jest.fn();
    handleSetNotification = jest.fn();
    blogFormRef = jest.fn();
    blogFormRef.current = jest.fn();
    blogFormRef.current.toggleVisibility = jest.fn();

    dummyUser = {
      name: "User's Name",
      username: "username",
    };
    blog = {
      id: "1",
      title: "title",
      author: "author",
      likes: 42,
      user: dummyUser,
      url: "url",
    };
    blogService.create.mockResolvedValue(blog);

    render(
      <BlogForm
        blog={blog}
        user={dummyUser}
        blogService={blogService}
        handleSetBlogs={handleSetBlogs}
        handleSetNotification={handleSetNotification}
        blogs={[]}
        blogFormRef={blogFormRef}
      />
    );
  });

  test("double press on like button results two callback calls", async () => {
    const user = userEvent.setup();

    const titleInput = screen.getByPlaceholderText("title");
    const authorInput = screen.getByPlaceholderText("author");
    const urlInput = screen.getByPlaceholderText("url");
    const sendButton = screen.getByText("Create");

    await user.type(titleInput, "Title input");
    await user.type(authorInput, "Author input");
    await user.type(urlInput, "Url input");

    await user.click(sendButton);

    expect(blogService.create.mock.calls).toHaveLength(1);
    expect(blogService.create.mock.calls[0][0].title).toBe("Title input");
    expect(blogService.create.mock.calls[0][0].author).toBe("Author input");
    expect(blogService.create.mock.calls[0][0].url).toBe("Url input");
  });
});
