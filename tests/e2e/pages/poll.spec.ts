import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { VotingMethod } from "@/enum/poll";

import { POLL_FIXTURES } from "../../../fixtures";
import PollPage from "../page-objects/poll.page";

test.describe("the poll page", () => {
    test.describe("for instant-runoff polls", async () => {
        const instantRunoffPoll = POLL_FIXTURES.find(
            fixture => fixture.votingMethod === VotingMethod.INSTANT_RUNOFF_VOTING,
        )!;
        test("should not contain any automatically detectable accessibility issues", async ({ page }) => {
            const pollPage = new PollPage(page);
            await pollPage.goto(instantRunoffPoll.id);
            expect((await new AxeBuilder({ page }).analyze()).violations).toStrictEqual([]);
        });
        test("should return a 404 when an unknown poll id is provided in the url", async ({ page }) => {
            await page.goto("/poll/abc");
            await expect(page.locator("h1")).toHaveText("Page not found");
            await page.goto("/poll");
            await expect(page.locator("h1")).toHaveText("Page not found");
        });
        test("should allow copying the page url", async ({ page, browserName }) => {
            const pollPage = new PollPage(page);
            const { id } = instantRunoffPoll;
            await pollPage.goto(id);
            const url = page.url();
            await pollPage.locators.shareButton.click();
            await expect(pollPage.locators.shareButtonMessage).toBeVisible();
            await expect(pollPage.locators.shareButtonMessage).toHaveAttribute("data-url", url);
            if (browserName === "chromium" || browserName === "firefox") {
                const clipboard = await page.evaluate("navigator.clipboard.readText()");
                expect(clipboard).toStrictEqual(url);
            }
            await expect(pollPage.locators.shareButtonMessage).not.toBeVisible();
        });
    });
});
