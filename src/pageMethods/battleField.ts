import { expect, Page } from "@playwright/test";


export class BattleField {
	page: Page;
	constructor(page: Page) {
		this.page = page;
	}

	idStartNewsTaskButton = "#news";
	idStartBusTaskButton = "#bus";
	idStartRestaurantTaskButton = "#restaurant";
	idStartOfficeTaskButton = "#office";
	idBattleFieldHeader = ".alpha-heading";
	idNewsBattleFieldPopUpText =
		"div#introModal > div[role='document'] h5#staticBackdropLabel";
	idStartButton = "#start";
	idCorrectOptionNews = "div:nth-of-type(index) > .caption > .btn.text-wrap";
	idCorrectMessage =
		"[data-backdrop='static']:nth-child(index) #staticBackdropLabel";
	idContinueButton = "button#continue";
	idContinueFightinButton = "#leaderboard_link";
	idBusTimerStartButton = "#bus_timer_start";
	idBattleFieldPopUpText = "body [data-backdrop='static']:nth-child(6) #staticBackdropLabel";
	idCorrectOption = "div:nth-of-type(index) > .btn.text-wrap";
	idChooseNextBattle = "#close_correct_modal_btn";
	idCheckFinalScore = "#leaderboard_link";
    idRestaurantTimerStartButton = "#restaurant_timer_start";

	loadHomePage = async (baseURL: string): Promise<any> => {
		await this.page.goto(baseURL, {
			timeout: 60000,
		});
	};

	validateBattleFieldPageLoads = async (baseURL: string): Promise<any> => {
		await expect(this.page).toHaveURL(baseURL + "covid"); //validate navigation to battlefield page
		const battleFieldPageHeaderLocator = this.page.locator(
			await this.idBattleFieldHeader
		);
		await expect(battleFieldPageHeaderLocator).toHaveText("COVID-19 THE GAME");
	};

	chooseBattleFieldAndCompleteTask = async (
		battleField: string,
	): Promise<any> => {
		switch (battleField) {
			case "news":
				await this.completeNewsChallenge();
				break;
			case "bus":
				await this.completeBusChallenge();
				break;
			case "restaurant":
                await this.completeRestaurantChallenge()
				break;
			case "office":
                await this.completeOfficeChallenge();
				break;
			default:
				throw Error(`Invalid battlefield`);
		}
	};

	private completeNewsChallenge = async (): Promise<any> => {
		const startNewsChallengeLocator = this.page.locator(
			await this.idStartNewsTaskButton
		);
		const battleFieldPopUpTextLocator = this.page.locator(
			await this.idNewsBattleFieldPopUpText
		);
		const correctOptionNews = await this.idCorrectOptionNews.replace("index", "2");
		const correctMessage = await this.idCorrectMessage.replace("index", "4");
		const correctMessageLocator = await this.page.locator(correctMessage);
		//const userNameLeaderBoard = this.idUserLeaderBoard.replace("value", userName);

		await expect(startNewsChallengeLocator).toHaveText("Are you game?");
		await this.page.click(this.idStartNewsTaskButton);
		await expect(battleFieldPopUpTextLocator).toHaveText(
			"You are in a battlefield..."
		);

		await this.page.click(this.idStartButton);
		await this.page.click(correctOptionNews);
		await expect(correctMessageLocator).toHaveText("That is correct!");
		await this.page.click(this.idContinueButton);
		await this.page.click(correctOptionNews);
		await expect(correctMessageLocator).toHaveText("That is correct!");
		await this.page.click(this.idContinueButton);
		await this.page.click(correctOptionNews);
		await expect(correctMessageLocator).toHaveText("That is correct!");
		await this.page.click(this.idContinueButton);
		//await expect(expectedUserName).toEqual("cbaKingUse"); // toBe("cbaKingUse");
	};

	private completeBusChallenge = async (): Promise<any> => {
		const startBusChallengeLocator = this.page.locator(
			await this.idStartBusTaskButton
		);
		const battleFieldPopUpTextLocator = this.page.locator(
			await this.idBattleFieldPopUpText
		);
		const correctOptionBus = await this.idCorrectOption.replace("index", "2");
		//const userNameLeaderBoard = this.idUserLeaderBoard.replace("value", userName);

		await expect(startBusChallengeLocator).toHaveText("Take the bus");
		await this.page.click(this.idStartBusTaskButton);
		await expect(battleFieldPopUpTextLocator).toHaveText(
			"You have taken the public bus.."
		);

		await this.page.click(this.idBusTimerStartButton);
		await this.page.click(correctOptionBus);
		await this.page.click(this.idCheckFinalScore);
	};

    private completeRestaurantChallenge = async (): Promise<any> => {
		const startRestaurantChallengeLocator = this.page.locator(
			await this.idStartRestaurantTaskButton
		);
		const battleFieldPopUpTextLocator = this.page.locator(
			await this.idBattleFieldPopUpText
		);
		const correctOptionRestaurant = await this.idCorrectOption.replace("index", "2");
		//const userNameLeaderBoard = this.idUserLeaderBoard.replace("value", userName);

		await expect(startRestaurantChallengeLocator).toHaveText("Go to a public place");
		await this.page.click(this.idStartRestaurantTaskButton);
		await expect(battleFieldPopUpTextLocator).toHaveText(
			"You are seated at a restaurant.."
		);

		await this.page.click(this.idRestaurantTimerStartButton);
		await this.page.click(correctOptionRestaurant);
		await this.page.click(this.idCheckFinalScore);
	};

    private completeOfficeChallenge = async (): Promise<any> => {
		const startOfficeChallengeLocator = this.page.locator(
			await this.idStartOfficeTaskButton
		);
		const battleFieldPopUpTextLocator = this.page.locator(
			await this.idBattleFieldPopUpText
		);
		const correctOptionRestaurant = await this.idCorrectOption.replace("index", "2");
		//const userNameLeaderBoard = this.idUserLeaderBoard.replace("value", userName);

		await expect(startOfficeChallengeLocator).toHaveText("Go to the office");
		await this.page.click(this.idStartOfficeTaskButton);
		await expect(battleFieldPopUpTextLocator).toHaveText(
			"You have entered the office.."
		);

		await this.page.click(this.idStartButton);
		await this.page.click(correctOptionRestaurant);
		await this.page.click(this.idCheckFinalScore);
	};

	navigateFromLeaderBoardToBattleField = async (
		baseUrl: string
	): Promise<any> => {
        await this.page.click(this.idContinueFightinButton);
		await this.validateBattleFieldPageLoads(baseUrl);
	};
}
