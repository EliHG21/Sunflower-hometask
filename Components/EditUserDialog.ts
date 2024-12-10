import { Locator, Page } from '@playwright/test';

export default class EditUserDialog {
    private NICKNAME_TEXTBOX_TESTID = 'nicknameInput';
    private CURRENT_AVATAR_SELECTOR = 'img[alt="avatar"]';

    private page: Page;

    constructor(newPage: Page) {
        this.page = newPage
    }

    public async current_nickname(): Promise<string> {
        if (!this.page) throw new Error('Page is not initialized. You have to call initialize() first.');

        const currentNickname = await this.page.getByTestId(this.NICKNAME_TEXTBOX_TESTID).getAttribute('value');
        if(!currentNickname) throw new Error('The nickname textbox is no visible, you probeblly need to open the edit user dialog');

        return currentNickname;
    }
    
    public async current_avatar(): Promise<Locator> {
        if (!this.page) throw new Error('Page is not initialized. You have to call initialize() first.');

        const avatarNumber = await this.extract_current_avatar_number();
        const locator = await this.page.getByTestId(`avatar-image-${avatarNumber}`);

        return locator;
    }

    public async nickname_textbox(): Promise<Locator> {
        if (!this.page) throw new Error('Page is not initialized. You have to call initialize() first.');

        const locator = await this.page.getByTestId(this.NICKNAME_TEXTBOX_TESTID);
        return locator;
    }

    public async random_avatar(): Promise<Locator> {
        if (!this.page) throw new Error('Page is not initialized. You have to call initialize() first.');

        const currentAvatarNumber = await this.extract_current_avatar_number();
        const randomAvatarNumber = await this.get_random_avatar_number(currentAvatarNumber);
        const locator = this.page.getByTestId(`avatar-image-${randomAvatarNumber}`);

        return locator;
    }

    public async apply_button(): Promise<Locator> {
        if (!this.page) throw new Error('Page is not initialized. You have to call initialize() first.');

        const locator = this.page.getByText('apply');
        
        return locator;
    }

    private async extract_current_avatar_number(): Promise<Number> {
        if (!this.page) throw new Error('Page is not initialized. You have to call initialize() first.');

        const avatarImagePath = await this.page.locator(this.CURRENT_AVATAR_SELECTOR).first().getAttribute('src');
        if(!avatarImagePath) throw new Error('The path is null, there is a good chance you didnt open the edit user dialog');

        const numStr = avatarImagePath.substring(avatarImagePath.length - 6, avatarImagePath.length - 4);        
        const num = Number(numStr) - 1;

        return num;
    }

    private async get_random_avatar_number(exeption: Number): Promise<Number> {
        let num: Number;

        do {
            num = Math.floor(Math.random() * 20)
        } while(num === exeption);

        return num;
    }
}
