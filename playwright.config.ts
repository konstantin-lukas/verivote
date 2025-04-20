import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: "./tests/e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: "html",
    use: {
        baseURL: "http://localhost:3000",
        testIdAttribute: "data-test-id",
        trace: "on-first-retry",
    },

    projects: [
        { name: "setup", testMatch: /.*\.setup\.ts/ },
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"], storageState: "playwright/.auth/user.json" },
            dependencies: ["setup"],
        },

        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"], storageState: "playwright/.auth/user.json" },
            dependencies: ["setup"],
        },

        {
            name: "webkit",
            use: { ...devices["Desktop Safari"], storageState: "playwright/.auth/user.json" },
            dependencies: ["setup"],
        },

        {
            name: "Mobile Chrome",
            use: { ...devices["Pixel 5"], storageState: "playwright/.auth/user.json" },
            dependencies: ["setup"],
        },

        {
            name: "Mobile Safari",
            use: { ...devices["iPhone 12"], storageState: "playwright/.auth/user.json" },
            dependencies: ["setup"],
        },
    ],
});
