import { expect, test as setup } from "@playwright/test";
import path from "path";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("authenticate", async ({ page }) => {
    await page.goto("/auth/signin");
    await page.getByTestId("keycloak-provider").click();
    await page.locator("#username").fill("user");
    await page.locator("#password").fill("password");
    await page.locator("#kc-login").click();
    await expect(page.getByTestId("sign-in-out-button-text")).toHaveText("Sign Out");
    await page.context().storageState({ path: authFile });
});
