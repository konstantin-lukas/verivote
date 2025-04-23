import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { VotingMethod } from "@/enum/poll";

import CreatePage from "./page-objects/create.page";

test.describe("create poll", () => {
    test.beforeEach(async ({ page }) => {
        const createPage = new CreatePage(page);
        await createPage.goto();
    });
    test.describe("the create page", () => {
        test.beforeEach(async ({ page }) => {
            const createPage = new CreatePage(page);
            await createPage.goto();
        });
        test("should not contain any automatically detectable accessibility issues", async ({ page }) => {
            expect((await new AxeBuilder({ page }).analyze()).violations).toStrictEqual([]);
        });
        test("should allow selecting different voting methods", async ({ page }) => {
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
        test("should allow inserting a page title with a max length of 200", async ({ page }) => {
            const createPage = new CreatePage(page);
            const testTitle = "This is a test title";
            await createPage.locators.nameInput.fill(testTitle);
            await expect(createPage.locators.nameInput).toHaveValue(testTitle);
            const longTestTitle = "A".repeat(200);
            await createPage.locators.nameInput.fill(`${longTestTitle}B`);
            await expect(createPage.locators.nameInput).toHaveValue(longTestTitle);
        });
        test("should allow inserting up to twenty poll options but always require at least two", async ({ page }) => {
            const createPage = new CreatePage(page);
            const maxPollOptions = 20;
            const minPollOptions = 2;
            for (let i = minPollOptions - 1; i < maxPollOptions - 1; i++) {
                for (let j = 0; j <= i; j++) {
                    await expect(createPage.locators.optionInputs[j]).toBeVisible();
                }
                for (let j = i + 1; j < maxPollOptions - 1; j++) {
                    await expect(createPage.locators.optionInputs[j]).not.toBeVisible();
                }
                await createPage.locators.addButton.click();
            }
            await expect(createPage.locators.addButton).not.toBeVisible();
            await expect(page.locator("delete-poll-option-1")).not.toBeVisible();
            await expect(page.locator("delete-poll-option-2")).not.toBeVisible();
            await Promise.all(
                [...Array(18).keys()].map(i => expect(createPage.locators.optionDeleteButtons[i]).toBeVisible()),
            );
            for (let i = 0; i < 18; i++) {
                await createPage.locators.optionDeleteButtons[0].click();
            }
            await Promise.all(
                [...Array(18).keys()].map(i => expect(createPage.locators.optionDeleteButtons[i]).not.toBeVisible()),
            );
        });
    });
    //test.describe("the create poll workflow", () => {});
});
