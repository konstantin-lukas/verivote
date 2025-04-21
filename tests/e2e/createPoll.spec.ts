import { expect, test } from "@playwright/test";

import { VotingMethod } from "@/enum/poll";

import CreatePage from "./page-objects/create.page";

test.describe("the create poll workflow", () => {
    test.beforeEach(async ({ page }) => {
        const createPage = new CreatePage(page);
        await createPage.goto();
    });
    test("the create page should allow selecting different voting methods", async ({ page }) => {
        const createPage = new CreatePage(page);
        await createPage.selectMethod(VotingMethod.POSITIONAL_VOTING);
        await expect(createPage.locators.methodSelectText).toHaveText("Positional Voting");
        await createPage.selectMethod(VotingMethod.PLURALITY_VOTING);
        await expect(createPage.locators.methodSelectText).toHaveText("Plurality Voting");
        await createPage.selectMethod(VotingMethod.APPROVAL_VOTING);
        await expect(createPage.locators.methodSelectText).toHaveText("Approval Voting");
        await createPage.selectMethod(VotingMethod.SCORE_VOTING);
        await expect(createPage.locators.methodSelectText).toHaveText("Score Voting");
        await createPage.selectMethod(VotingMethod.INSTANT_RUNOFF_VOTING);
        await expect(createPage.locators.methodSelectText).toHaveText("Instant-Runoff");
    });
});
