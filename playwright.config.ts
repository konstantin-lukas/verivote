import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./tests/e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: "html",
    use: {
        baseURL: process.env.APP_ENV === "test" ? "http://webserver:3000" : "http://localhost:3000",
        testIdAttribute: "data-test-id",
        trace: "on-first-retry",
    },
    projects: [
        { name: "setup", testMatch: "auth.setup.ts" },
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
                storageState: "tests/playwright/.auth/user.json",
                permissions: ["clipboard-read", "clipboard-write"],
            },
            dependencies: ["setup"],
        },

        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"], storageState: "tests/playwright/.auth/user.json" },
            dependencies: ["setup"],
        },

        {
            name: "webkit",
            use: { ...devices["Desktop Safari"], storageState: "tests/playwright/.auth/user.json" },
            dependencies: ["setup"],
        },

        {
            name: "Mobile Chrome",
            use: {
                ...devices["Pixel 5"],
                storageState: "tests/playwright/.auth/user.json",
                permissions: ["clipboard-read", "clipboard-write"],
            },
            dependencies: ["setup"],
        },

        {
            name: "Mobile Safari",
            use: { ...devices["iPhone 12"], storageState: "tests/playwright/.auth/user.json" },
            dependencies: ["setup"],
        },
    ],
});
