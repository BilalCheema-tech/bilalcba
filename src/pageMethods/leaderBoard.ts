import { expect, Page } from "@playwright/test";

export class LeaderBoard {
	page: Page;
	constructor(page: Page) {
		this.page = page;
	}

    idLeaderBoardHeader = "body > div:nth-of-type(index)  .option-label"; //index 1
    idUserName = "//td[contains(text(),'value')]"
    idTableCell = "tr:nth-of-type(row) > td:nth-of-type(col)";
    idTableRow = "tbody > tr";
    idTableColumn = "tbody > tr > th";

    validateLeaderBoardLoadsSuccesfully = async (baseURL: string): Promise<any> => {
        await expect(this.page).toHaveURL(baseURL + "leaderboard"); //validate navigation to leaderboard page
		const leaderBoardPageHeaderLocator = this.page.locator(
			await this.idLeaderBoardHeader.replace('index','1')
		);
		await expect(leaderBoardPageHeaderLocator).toHaveText("COVID-19 THE GAME - LEADERBOARD");
    };

    validateUserExistsAtLeaderBoard = async (userName: string): Promise<any> => {
        const leaderBoardUserLocator = this.page.locator(
			await this.idUserName.replace('value',userName)
		);
        await expect(leaderBoardUserLocator).toContainText(userName);
	};

}
