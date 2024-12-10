import { Locator, Page } from '@playwright/test';

export default class LogInDialog {
    private EMAIL_INPUT_TESTID = 'email-input';
    private PASSWORD_INPUT_TESTID = 'password-input';
    private LOGIN_BUTTON_TESTID = 'login-submit-btn';

    private page: Page;

    constructor(newPage: Page) {
        this.page = newPage;
    }

    public async email_textbox(): Promise<Locator> {
        if (!this.page) throw new Error('Page is not initialized. You have to call initialize() first.');
        
        const locator = await this.page.getByTestId(this.EMAIL_INPUT_TESTID);
        return locator;
    }

    public async password_textbox(): Promise<Locator> {
        if (!this.page) throw new Error('Page is not initialized. You have to call initialize() first.');

        const locator = await this.page.getByTestId(this.PASSWORD_INPUT_TESTID);
        return locator
    }

    public async login_button(): Promise<Locator> {
        if (!this.page) throw new Error('Page is not initialized. You have to call initialize() first.');

        const locator = await this.page.getByTestId(this.LOGIN_BUTTON_TESTID);
        return locator;
    }
}