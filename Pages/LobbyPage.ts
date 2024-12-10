import { Page, Locator } from '@playwright/test';
import LogInDialog from '../Components/LogInDialog';

export default class LobbyPage {
    private LOGIN_BUTTEN_TESTID = 'lobby-login-btn';

    private page: Page;
    public logInDialog: LogInDialog;
    
    constructor(newPage: Page) {
        this.page = newPage;
        this.logInDialog = new LogInDialog(this.page);
    }

    public async sign_in_button(): Promise<Locator> {
        if (!this.page) throw new Error('Page is not initialized. You have to call initialize() first.');

        const locator = await this.page.getByTestId(this.LOGIN_BUTTEN_TESTID);

        return locator;
    }
}
