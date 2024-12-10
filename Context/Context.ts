import { Browser, BrowserContext, Page, chromium } from 'playwright'

export class Context {
    private browser: Browser | null = null;
    private browserContext: BrowserContext | null = null;
    public page: Page | null = null;

    async initialize(): Promise<Page> {
        this.browser = await chromium.launch({ headless: true });
        this.browserContext = await this.browser.newContext({
            viewport: { width: 1280, height: 720 }
        });
        this.page = await this.browserContext.newPage();

        return this.page
    }

    async navigateTo(url: string) {
        if (!this.page) throw new Error('Page is not initialized. You have to call initialize() first.');
        await this.page.goto(url);
    }

    async close() {
        await this.browserContext?.close();
        await this.browser?.close();
    }
}