import test, { expect } from '@playwright/test';
import HomePage from '../Pages/HomePage';
import LobbyPage from '../Pages/LobbyPage';
import { generate_5_character_string } from '../helpers/stringHelper';
import { Context } from '../Context/Context';

test.describe('tests for Crown Coins Casino website', () => {
    let context: Context;
    let homePage: HomePage;
    let lobbyPage: LobbyPage;

    test.beforeEach(async () => {
        test.setTimeout(30000);

        context = new Context();
        const page = await context.initialize();
        homePage = new HomePage(page);
        lobbyPage = new LobbyPage(page);

        await context.navigateTo('https://app.dev.crowncoinscasino.com/');
        await (await lobbyPage.sign_in_button()).click();
        await (await lobbyPage.logInDialog.email_textbox()).fill('watchdogstest02+11@sunfltd.com');
        await (await lobbyPage.logInDialog.password_textbox()).fill('123456');
        await (await lobbyPage.logInDialog.login_button()).click();
    })

    test('update the user avatar and make sure the changes made successfuly', async () => {
        await (await homePage.nav_bar_button()).click();
        await (await homePage.navBarMenu.my_account_button()).click();
        await (await homePage.myAccountDialog.edit_user_button()).click();

        const currentAvatarLocator = await homePage.editUserDialog.current_avatar();
        const currentNickname = await homePage.editUserDialog.current_nickname();
        const newNickname = await generate_5_character_string();

        await (await homePage.editUserDialog.random_avatar()).click();
        await (await homePage.editUserDialog.nickname_textbox()).fill(newNickname);
        await (await homePage.editUserDialog.apply_button()).click();
        await (await homePage.myAccountDialog.my_profile_button()).click();

        const profileNickname = await homePage.myProfileDialog.profile_nickname();
        await expect(profileNickname).toBe(newNickname);

        await (await homePage.myProfileDialog.close_dialog_button()).click();
        await (await homePage.myAccountDialog.edit_user_button()).click();
        await currentAvatarLocator.click();
        await (await homePage.editUserDialog.nickname_textbox()).fill(currentNickname);
        await (await homePage.editUserDialog.apply_button()).click()
    });

    test('log to the console the amount of the coins that user have from each currency', async () => {
        let firstCurrencyAmount: string;
        let secondCurrencyAmount: string;

        firstCurrencyAmount = await homePage.get_coins_amount();
        await (await homePage.coins_switch_butten()).click();
        secondCurrencyAmount = await homePage.get_coins_amount();

        console.log(firstCurrencyAmount);
        console.log(secondCurrencyAmount);
    })

    test.afterEach(async () => {
        await context.close();
    })
})