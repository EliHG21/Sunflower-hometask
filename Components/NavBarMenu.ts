import { Locator, Page } from '@playwright/test';

export default class NavBarMenu {
    private navBarLocator: Locator;
    private page: Page;

    constructor(newPage: Page) {
        this.page = newPage
        this.navBarLocator = this.page.locator('div.side-menu');
    }

    public async my_account_button(): Promise<Locator> {
        if (!this.page) throw new Error('Page is not initialized. You have to call initialize() first.');
        if(!this.navBarLocator?.isVisible()) throw new Error('The nav bar is closed, you have to open it first.');
        
        const locator = await this.navBarLocator.getByText('My Account');

        return locator;
    }
}