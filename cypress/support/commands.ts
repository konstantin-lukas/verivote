/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
    interface Chainable<Subject> {
        login(): Chainable<Subject>
        logout(): Chainable<Subject>
        createPoll(type: string, options?: string[]): Chainable<Subject>
    }
}

Cypress.Commands.add("login", () => {
    cy.setCookie(Cypress.env("TOKEN_NAME"), Cypress.env("TOKEN"), {
        httpOnly: true,
    });
    return cy.visit(Cypress.env("SITE_NAME"));
});

Cypress.Commands.add("logout", () => {
    return cy.contains("Sign Out").click().reload();
});

Cypress.Commands.add("createPoll", (type: string, options?: string[]) => {
    cy.visit(Cypress.env("SITE_NAME") + "/create");
    cy.get("[aria-label='Select poll type']").click();
    cy.contains(type).click();
    cy.get("[data-cy=name]").type("What should we have for dinner?");
    cy.get("[data-cy=majority]").click().should("have.attr", "aria-checked", "true");
    for (let i = 0; i < (options?.length ?? 20) - 2; i++) {
        cy.get("[data-cy=addOption").click();
    }
    cy.get("[data-cy=addOption").should("not.exist");
    (options ?? [
        "Sushi", "Pizza", "Tacos", "Pasta", "Ramen", "Falafel", "Cheeseburger", "Pad Thai", "Dim Sum", "Burrito",
        "Poutine", "Curry", "Samosa", "Paella", "Shakshuka", "Quesadilla", "Pho", "Kimchi", "Empanada", "Goulash",
    ]).forEach((x, i) => cy.get("[data-cy=option" + i).type(x));
    cy.get("[data-cy=submit").click();
    return cy.url().should("contain", "/poll/");
});