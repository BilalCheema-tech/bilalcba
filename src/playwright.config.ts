// playwright.config.ts
import { PlaywrightTestConfig } from "@playwright/test";

export const config: PlaywrightTestConfig = {
	use: {
		browserName: "chromium",
		headless: false,
		viewport: { width: 1920, height: 1080 },
		launchOptions: {
			slowMo: 50,
		},
		screenshot: "only-on-failure",
		video: "on",
		trace: "on",
	},
	testDir: "tests",
	retries: 2,
	timeout: 60000,
	workers: 4, //parallel running tests
};
