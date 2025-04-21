import type { Page } from "@playwright/test";

import type { VotingMethod } from "@/enum/poll";

export default class CreatePage {
    readonly locators;
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
        this.locators = {
            methodSelect: page.getByTestId("poll-type-select"),
            methodSelectText: page.getByTestId("poll-type-select-selected-text"),
            methodOptions: [...Array(5).keys()].map(i => page.getByTestId(`poll-type-select-option-${i + 1}`)),
            nameInput: page.getByTestId("poll-name-input"),
            dateInput: page.getByTestId("poll-date-input"),
            majorityCheckbox: page.getByTestId("majority-checkbox"),
            submitButton: page.getByTestId("submit-create-poll-button"),
            addButton: page.getByTestId("add-poll-option-button"),
            optionsInputs: [...Array(20).keys()].map(i => page.getByTestId(`poll-option-${i + 1}`)),
        };
    }
    async goto() {
        await this.page.goto("/create");
    }
    async selectMethod(votingMethod: VotingMethod) {
        await this.locators.methodSelect.click();
        await this.locators.methodOptions[votingMethod].click();
    }
}
