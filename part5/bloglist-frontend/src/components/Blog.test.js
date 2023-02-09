import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Blog } from "./Blog";

describe("<Blog />", () => {
  let container;
  let blogService;
  let handleSetBlogs;
  let handleSetNotification;
  let dummyUser;
  let blog;

  beforeEach(() => {
    blogService = jest.fn();
    blogService.update = jest.fn();
    handleSetBlogs = jest.fn();
    handleSetNotification = jest.fn();
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
    blogService.update.mockResolvedValue(blog);

    container = render(
      <Blog
        blog={blog}
        user={dummyUser}
        blogService={blogService}
        handleSetBlogs={handleSetBlogs}
        handleSetNotification={handleSetNotification}
        blogs={[]}
      />
    ).container;
  });

  test("renders blog and author only by default", () => {
    const blogElement = container.querySelector(".blog");
    expect(blogElement.textContent).toContain("title | author");
    expect(blogElement.textContent).not.toContain("url");
  });

  test("renders likes, user and url after details button clicked", async () => {
    const user = userEvent.setup();

    const button = screen.getByText("Details");
    await user.click(button);

    const blogElement = container.querySelector(".blog");
    expect(blogElement.textContent).toContain("title | author");
    expect(blogElement.textContent).toContain("url");
    expect(blogElement.textContent).toContain("42");
    expect(blogElement.textContent).toContain("User's Name");
  });

  test("double press on like button results two callback calls", async () => {
    const user = userEvent.setup();

    const detailsButton = screen.getByText("Details");
    await user.click(detailsButton);
    const likeButton = screen.getByText("Like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(blogService.update.mock.calls).toHaveLength(2);
  });
});
