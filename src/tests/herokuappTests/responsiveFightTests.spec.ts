import { test, expect } from "@playwright/test";
import { HomePage } from "../../pageMethods/homePage";
import { BattleField } from "../../pageMethods/battleField";
import { LeaderBoard } from "../../pageMethods/leaderBoard";

const baseURL = "http://responsivefight.herokuapp.com/";

test.describe("CBA_TestSuite", () => {
	let homePage: HomePage;
	let battleField: BattleField;
	let leaderBoard: LeaderBoard;

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		battleField = new BattleField(page);
		leaderBoard = new LeaderBoard(page);
		await homePage.loadHomePage(baseURL); // Go to the starting url before each test.
	});

	test("Login page is sucessfully loaded", async ({ page }) => {
		await homePage.validateHomePage();
	});

	test("Create user and navigate to battle field page", async ({page,}) => {
		const warriorName = "Warrior123";
		await homePage.createUser(warriorName);
		await expect(page).toHaveURL(baseURL + "covid"); //validate navigation to battlefield page
	});

	test("E2ETestA: Validate leaderboard score after creating user and completing news & bus challenge simultaneously @regression", async () => {
		const warriorName = "H_Warrior";

		await homePage.createUser(warriorName);
		
		await battleField.validateBattleFieldPageLoads(baseURL); 
		await battleField.chooseBattleFieldAndCompleteTask('news');
		await leaderBoard.validateLeaderBoardLoadsSuccesfully(baseURL);
		await leaderBoard.validateUserExistsAtLeaderBoard(warriorName);
		
		await battleField.navigateFromLeaderBoardToBattleField(baseURL);
		await battleField.chooseBattleFieldAndCompleteTask('bus');
		await leaderBoard.validateUserExistsAtLeaderBoard(warriorName);

		await battleField.navigateFromLeaderBoardToBattleField(baseURL);
	});

	test("E2ETestB: Validate leaderboard score after creating user and completing restaurant & office challenge simultaneously @regression", async () => {
		const warriorName = "J_Warrior";
		await homePage.createUser(warriorName);
		
		await battleField.validateBattleFieldPageLoads(baseURL); 
		await battleField.chooseBattleFieldAndCompleteTask('restaurant');
		await leaderBoard.validateUserExistsAtLeaderBoard(warriorName);

		await battleField.navigateFromLeaderBoardToBattleField(baseURL);
		await battleField.chooseBattleFieldAndCompleteTask('office');
		await leaderBoard.validateUserExistsAtLeaderBoard(warriorName);

		await battleField.navigateFromLeaderBoardToBattleField(baseURL);
	});

	test.afterAll(async ({ browser }) => {
		console.log("Test run completed");
		await browser.close();
	});
});
