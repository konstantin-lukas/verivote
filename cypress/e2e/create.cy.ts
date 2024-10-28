describe("Create Page", () => {
    beforeEach(() => {
        cy.login();
    });
    afterEach(() => {
        cy.get("[data-cy=pollOption").should("have.length", 20);
        cy.get("[data-cy=manage").click();
        cy.get("[data-cy=deletePoll").should("have.length", 1).click();
        cy.get("[data-cy=acceptBtn").click();
        cy.get("[data-cy=deletePoll").should("have.length", 0);
    });
    it("should allow to create an instant-runoff poll", () => {
        cy.createPoll("Instant-Runoff");
    });
    it("should allow to create a positional voting poll", () => {
        cy.createPoll("Positional Voting");
    });
    it("should allow to create a score voting poll", () => {
        cy.createPoll("Score Voting");
    });
    it("should allow to create an approval voting poll", () => {
        cy.createPoll("Approval Voting");
    });
    it("should allow to create a plurality voting poll", () => {
        cy.createPoll("Plurality Voting");
    });
});