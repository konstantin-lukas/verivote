import { defineConfig } from "cypress";

export default defineConfig({
    viewportWidth: 1920,
    viewportHeight: 960,

    e2e: {
        baseUrl: "http://localhost:3001",
    },
});
