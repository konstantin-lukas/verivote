import type { Page } from "@playwright/test";

export default class PollPage {
    readonly locators;
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
        this.locators = {
            h2: page.getByTestId("poll-type-heading"),
        };
    }
    async goto(id: string) {
        await this.page.goto(`/poll/${id}`);
    }
}
