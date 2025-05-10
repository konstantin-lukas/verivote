import type { Page } from "@playwright/test";

export default class PollPage {
    readonly locators;
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
        this.locators = {
            h1: page.getByTestId("poll-title"),
            h2: page.getByTestId("poll-type-heading"),
            shareButton: page.getByTestId("share-button"),
            shareButtonMessage: page.getByTestId("share-button-message"),
            canvas: page.getByTestId("poll-result-chart"),
            winners: page.getByTestId("winners"),
            resultsButton: page.getByTestId("see-results-button"),
        };
    }
    async goto(id: string) {
        await this.page.goto(`/poll/${id}`, { waitUntil: "networkidle" });
    }
}
