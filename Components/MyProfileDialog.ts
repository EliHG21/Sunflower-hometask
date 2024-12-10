import { Locator, Page } from "playwright";

export default class MyProfileDialog {
    private PROFILE_NICKNAME_TESTID = 'my-profile-nickname';
    private CLOSE_DIALOG_BUTTON_TESTID = 'closeButton'

    private page: Page;

    constructor(newPage: Page) {
        this.page = newPage
    }

    public async profile_nickname(): Promise<string> {
        if (!this.page) throw new Error('Page is not initialized. You have to call initialize() first.');

        const profileNickname = this.page.getByTestId(this.PROFILE_NICKNAME_TESTID).innerText();

        return profileNickname;
    }

    public async close_dialog_button(): Promise<Locator> {
        if (!this.page) throw new Error('Page is not initialized. You have to call initialize() first.');

        const locator = await this.page.getByTestId(this.CLOSE_DIALOG_BUTTON_TESTID).first();

        return locator;
    }
}