describe("Blog App", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("EXTERNAL_API")}/testing/reset`);
    const user = {
      name: "E2E Test User",
      username: "e2e",
      password: "password",
    };
    cy.request("POST", `${Cypress.env("EXTERNAL_API")}/users`, user);
    cy.visit("");
  });

  it("front page can be opened", function () {
    cy.contains("Blogs");
  });

  it("Login form is shown", function () {
    cy.get("input[name='username']");
    cy.get("input[name='password'");
    cy.get("button:contains('Login')");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("input[name='username']").type("e2e");
      cy.get("input[name='password'").type("password");
      cy.get("button:contains('Login')").click();

      cy.contains("E2E Test User logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("input[name='username']").type("e2e");
      cy.get("input[name='password'").type("wrong");
      cy.get("button:contains('Login')").click();

      cy.get(".error")
        .should("contain", "invalid username or password")
        .and("have.css", "border", "4px solid rgb(255, 0, 85)")
        .and("have.css", "background-color", "rgb(255, 240, 240)");

      cy.get("html").should("not.contain", "E2E Test User logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "e2e", password: "password" });
    });

    it("A blog can be created", function () {
      cy.contains("Add a new blog").click();
      cy.get("input[placeholder='title']").type("a blog");
      cy.get("input[placeholder='author']").type("cypress");
      cy.get("input[placeholder='url']").type(
        "url of the blog added by cypress"
      );
      cy.get("button:contains('Create')").click();
      cy.contains("a blog | cypress");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "cy title",
          author: "cy author",
          url: "cy url",
        });
      });

      it("it can be liked", function () {
        cy.contains("cy title | cy author").as("theBlog");
        cy.get("@theBlog").contains("Details").click();
        cy.get("@theBlog").contains("Like").click();

        cy.contains("Likes: 1");
      });

      it("it can be deleted", function () {
        cy.contains("cy title | cy author").as("theBlog");
        cy.get("@theBlog").contains("Details").click();
        cy.get("@theBlog").contains("Delete").click();

        cy.get("html").should("not.contain", "cy title | cy author");
      });
    });
  });

  describe("When blogs from multiple users exist", function () {
    beforeEach(function () {
      const user = {
        name: "E2E Test User 2",
        username: "e2e2",
        password: "password",
      };
      cy.request("POST", `${Cypress.env("EXTERNAL_API")}/users`, user);
      cy.login({ username: "e2e", password: "password" });
      cy.createBlog({
        title: "title 1",
        author: "author 1",
        url: "url 1",
      });
      cy.contains("Log out").click();
      cy.login({ username: "e2e2", password: "password" });
      cy.createBlog({
        title: "title 2",
        author: "author 2",
        url: "url 2",
      });
    });

    it("another user does not see delete button", function () {
      cy.contains("title 1 | author 1").as("theBlog");
      cy.get("@theBlog").contains("Details").click();
      cy.get("@theBlog").should("not.contain", "Delete");
    });

    it("original user does see delete button", function () {
      cy.contains("title 2 | author 2").as("theBlog");
      cy.get("@theBlog").contains("Details").click();
      cy.get("@theBlog").contains("Delete");
    });
  });

  describe("When multiple blogs exist", function () {
    beforeEach(function () {
      cy.login({ username: "e2e", password: "password" });
      cy.createBlog({
        title: "title 1",
        author: "author 1",
        url: "url 1",
        likes: 4,
      });
      cy.createBlog({
        title: "title 2",
        author: "author 2",
        url: "url 2",
        likes: 6,
      });
      cy.createBlog({
        title: "title 3",
        author: "author 3",
        url: "url 3",
        likes: 2,
      });
    });

    it("blogs should be sorted by likes", function () {
      cy.get(".blog").eq(0).should("contain", "title 2");
      cy.get(".blog").eq(1).should("contain", "title 1");
      cy.get(".blog").eq(2).should("contain", "title 3");
    });
  });
});
