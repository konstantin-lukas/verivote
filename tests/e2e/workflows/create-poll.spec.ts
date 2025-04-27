import { randomUUID } from "node:crypto";

import { expect, test } from "@playwright/test";

import CreatePage from "../page-objects/create.page";
import PollPage from "../page-objects/poll.page";

test.describe("the create poll workflow", () => {
    test.beforeEach(async ({ page }) => {
        const createPage = new CreatePage(page);
        await createPage.goto();
    });
    test("should allow creating instant-runoff polls", async ({ page }) => {
        const createPage = new CreatePage(page);
        const pollPage = new PollPage(page);
        const pollQuestion = randomUUID();
        await createPage.createPoll(pollQuestion, "future", false, [
            "Indian",
            "Japanese",
            "Korean",
            "Italian",
            "Afghan",
        ]);
        await page.waitForURL("/poll/*");
        await expect(page).toHaveTitle(`${pollQuestion} - Verivote`);
        await expect(pollPage.locators.h1).toHaveText(pollQuestion);
        await expect(pollPage.locators.h2).toHaveText("Instant-Runoff");
    });
});
