import { Page, Locator } from "@playwright/test";
import NavBarMenu from "../Components/NavBarMenu";
import MyAccountDialog from "../Components/MyAccountDialog";
import EditUserDialog from "../Components/EditUserDialog";
import MyProfileDialog from "../Components/MyProfileDialog";
import { delay } from "../helpers/delayHelper";

export default class HomePage {
    private MENU_BUTTEN_TESTID = 'menuButton';
    private COIN_SWITCHER_TESTID = 'coin-switcher';
    private BALANCE_PANNEL_SELECTOR = 'div#gc_balance';
    private COINS_CURRENCY_SELECTOR = 'div.balance-panel-left';
    private COINS_AMOUNT_TESTID = 'lobby-balance-bar'

    private page: Page;
    public navBarMenu: NavBarMenu;
    public myAccountDialog: MyAccountDialog;
    public editUserDialog: EditUserDialog;
    public myProfileDialog: MyProfileDialog;

    constructor(newPage: Page) {
        this.page = newPage;
        this.navBarMenu = new NavBarMenu(this.page);
        this.myAccountDialog = new MyAccountDialog(this.page);
        this.editUserDialog = new EditUserDialog(this.page);
        this.myProfileDialog = new MyProfileDialog(this.page);
    }

    public async coins_switch_butten(): Promise<Locator> {
        if (!this.page) throw new Error('Page is not initialized. You have to call initialize() first.');
        
        const locator = await this.page.getByTestId(this.COIN_SWITCHER_TESTID);
        return locator;
    }

    public async get_coins_amount(): Promise<string> {
        if (!this.page) throw new Error('Page is not initialized. You have to call initialize() first.');

        await delay(4000)
        const balancePannelLocator = await this.page.locator(this.BALANCE_PANNEL_SELECTOR);
        const coinsCurrency = await balancePannelLocator.locator(this.COINS_CURRENCY_SELECTOR).innerText();
        const coinsAmount = await balancePannelLocator.getByTestId(this.COINS_AMOUNT_TESTID).innerText();
        let result = `${coinsCurrency} - ${coinsAmount}`;

        return result;
    }

    public async nav_bar_button(): Promise<Locator> {
        if (!this.page) throw new Error('Page is not initialized. You have to call initialize() first.');

        const locator = await this.page.getByTestId(this.MENU_BUTTEN_TESTID);

        return locator;
    }

}