import { Locator, type Page } from "@playwright/test";
import { TopBar } from '../Components/TopBar';
import { Sort } from '../Components/Sort';

export class MLPage {
    readonly topBar: TopBar; 
    readonly sort: Sort; 
    readonly cookies: Locator;
    
    constructor(page: Page){
        this.topBar = new TopBar(page);
        this.sort = new Sort(page);
        this.cookies = page.getByTestId('action:understood-button');
    };

    async search(product:string){        
        await this.topBar.searchProduct(product);
    };   

    async sortBy(option:"lowest"|"highest"){
       await this.sort.sortBy(option);
    };

    async clickCookies(page:Page) {
        await this.cookies.click();
    }

   
};
export default MLPage;