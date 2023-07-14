import { type Page } from "@playwright/test";
import { TopBar } from '../Components/TopBar';
import { Sort } from '../Components/Sort';

export class MLPage {
    readonly topBar: TopBar; 
    readonly sort: Sort; 
    
    constructor(page: Page){
        this.topBar = new TopBar(page);
        this.sort = new Sort(page);
    };

    async search(product:string){        
        await this.topBar.searchProduct(product);
    };   

    async sortBy(option:"lowest"|"highest"){
       await this.sort.sortBy(option);
    };

   
};
export default MLPage;