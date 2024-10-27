describe("Create Page", () => {
    it("should allow to create an instant-runoff poll", () => {
        cy.login();
        cy.visit(Cypress.env("SITE_NAME") + "/create");
        cy.get("[aria-label='Select poll type']").click();
        cy.contains("Instant-Runoff").click();
        cy.get("[data-cy=name]").type("What should we have for dinner?");
        cy.get("[data-cy=majority]").click().should("have.attr", "aria-checked", "true");
        for (let i = 0; i < 18; i++) {
            cy.get("[data-cy=addOption").click();
        }
        cy.get("[data-cy=addOption").should("not.exist");
        [
            "Sushi", "Pizza", "Tacos", "Pasta", "Ramen", "Falafel", "Cheeseburger", "Pad Thai", "Dim Sum", "Burrito",
            "Poutine", "Curry", "Samosa", "Paella", "Shakshuka", "Quesadilla", "Pho", "Kimchi", "Empanada", "Goulash",
        ].forEach((x, i) => cy.get("[data-cy=option" + i).type(x));
        cy.get("[data-cy=submit").click();
        cy.url().should("contain", "/poll/");
    });
});