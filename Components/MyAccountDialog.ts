import { Locator, Page } from 'playwright';

export default class MyAccountDialog {
    private EDIT_USER_BUTTEN_TESTID = 'editAvatar';

    private myAccountModalLocator: Locator;
    private page: Page

    constructor(newPage: Page) {
        this.page = newPage;
        this.myAccountModalLocator = this.page.getByTestId('accountDialog')
    }

    public async edit_user_button() {
        if (!this.page) throw new Error('Page is not initialized. You have to call initialize() first.');
        if(!this.myAccountModalLocator?.isVisible()) throw new Error('The my account modal is closed, you have to open it first');
        
        const locator = await this.page.getByTestId(this.EDIT_USER_BUTTEN_TESTID);
        return locator;
    }

    public async my_profile_button() {
        if (!this.page) throw new Error('Page is not initialized. You have to call initialize() first.');
        if(!this.myAccountModalLocator?.isVisible()) throw new Error('The my account modal is closed, you have to open it first');

        const locator = await this.myAccountModalLocator.getByText('my profile');
        return locator;
    }
}