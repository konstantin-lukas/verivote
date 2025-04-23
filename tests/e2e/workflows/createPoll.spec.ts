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
        const pollQuestion = "What should we get for lunch?";
        await createPage.createPoll(pollQuestion, "future", false, [
            "Indian",
            "Japanese",
            "Korean",
            "Italian",
            "Afghan",
        ]);
        await expect(page).toHaveTitle(`${pollQuestion} - Verivote`);
        await expect(pollPage.locators.h2).toHaveText("Instant-Runoff");
    });
});
