describe("Note App", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "E2E Test User",
      username: "e2e",
      password: "password",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.visit("");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2023"
    );
  });

  it("user can log in", function () {
    cy.contains("log in / out").click();
    cy.get("input[name='username']").type("e2e");
    cy.get("input[name='password'").type("password");
    cy.get("button:contains('Login')").click();

    cy.contains("E2E Test User logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "e2e", password: "password" });
    });

    it("new note can be created", function () {
      cy.contains("Add a new note").click();
      cy.get("input[placeholder='Note content']").type(
        "a note created by cypress"
      );
      cy.contains("Save").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.createNote({
          content: "another note cypress",
          important: true,
        });
        cy.createNote({
          content: "second note cypress",
          important: true,
        });
        cy.createNote({
          content: "third note cypress",
          important: true,
        });
      });

      it("it can be made important", function () {
        cy.contains("another note cypress")
          .contains("make not important")
          .click();

        cy.contains("another note cypress").contains("make important");
      });
    });
  });

  it("login fails with wrong password", function () {
    cy.contains("log in / out").click();
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
