import { expect, Page } from "@playwright/test";


export class HomePage {
	page: Page;
	constructor(page: Page) {
		this.page = page;
	}

	idHeaderText = ".option-label";
	idInputUsertNameField = "input#worrior_username";
	idCreateWarriorButton = "#warrior";
	idStartButton = "#start";

	loadHomePage = async (baseURL: string): Promise<any> => {
		await this.page.goto(baseURL, {
			timeout: 60000,
		});
	};

	validateHomePage = async (): Promise<any> => {
		const title = this.page.locator(this.idHeaderText);
		await expect(this.page).toHaveURL("http://responsivefight.herokuapp.com/");
		await expect(title).toHaveText(" COVID-19 THE GAME ");
	};

	createUser = async (UserName: string): Promise<any> => {
		const warriorUserNameLocator = this.page.locator(
			this.idInputUsertNameField
		);
		const createWarriorLocator = this.page.locator(this.idCreateWarriorButton);
		const startUserNameLocator = this.page.locator(this.idStartButton);
		await expect(warriorUserNameLocator).toBeVisible();
		await this.page.type(this.idInputUsertNameField, UserName);
		await expect(createWarriorLocator).toBeVisible();
		await this.page.click(this.idCreateWarriorButton);
		await expect(startUserNameLocator).toBeVisible();
		await this.page.click(this.idStartButton);
	};
}
