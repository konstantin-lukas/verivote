import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";

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
            majorityCheckboxLabel: page.getByTestId("majority-checkbox-label"),
            submitButton: page.getByTestId("submit-create-poll-button"),
            addButton: page.getByTestId("add-poll-option-button"),
            optionInputs: [...Array(20).keys()].map(i => page.getByTestId(`poll-option-${i + 1}`)),
            optionDeleteButtons: [...Array(18).keys()].map(i => page.getByTestId(`delete-poll-option-${i + 3}`)),
        };
    }
    async goto() {
        await this.page.goto("/create");
    }
    async selectMethod(votingMethod: VotingMethod) {
        await this.locators.methodSelect.click();
        await this.locators.methodOptions[votingMethod].click();
    }
    async selectDate(when: "now" | "future") {
        await this.locators.dateInput.click();
        await expect(this.page.locator(".MuiPickersLayout-root")).toBeVisible();
        if (when === "future") {
            await this.page.locator(".MuiPickersArrowSwitcher-nextIconButton").click();
            await this.page.locator(".MuiPickersArrowSwitcher-nextIconButton").click();
            await this.page
                .locator(
                    ".MuiDayCalendar-monthContainer:last-of-type .MuiDayCalendar-weekContainer:first-of-type button:first-of-type",
                )
                .click();

            await this.page.locator("[aria-label='pick time']").click();
            await this.page.locator("[aria-label='11 hours']").click({ force: true });
            await this.page.locator("[aria-label='55 minutes']").click({ force: true });
            await this.page.locator("[title='PM']").click();
        } else {
            await this.page.locator(".MuiPickersDay-today").click();
        }
        await this.page.locator(".MuiDialogActions-root").getByText("OK").click();
    }
    async createPoll(
        title: string,
        date: "now" | "future",
        needsMajority: boolean,
        options: string[],
        type?: VotingMethod,
    ) {
        if (type) await this.selectMethod(type);
        await this.locators.nameInput.fill(title);
        await this.selectDate(date);
        const isChecked = await this.locators.majorityCheckbox.isChecked();
        if ((!needsMajority && isChecked) || (needsMajority && !isChecked)) {
            await this.locators.majorityCheckbox.click();
        }
        for (let i = 0; i < options.length - 2; i++) {
            await this.locators.addButton.click();
        }
        for (let i = 0; i < options.length; i++) {
            await this.locators.optionInputs[i].fill(options[i]);
        }
        await this.locators.submitButton.click();
    }
}
