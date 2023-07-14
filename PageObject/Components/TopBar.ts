import {type Locator, type Page } from "@playwright/test";

export class TopBar {
   
    readonly page:Page;  
    readonly searchBar: Locator; 
    readonly suggestionsList: Locator; 
    
    constructor(page: Page){
        this.page = page;
        this.searchBar = page.locator('#cb1-edit');
        this.suggestionsList = page.locator('#cb1-list');
    };

    async searchProduct(product:string){
        await this.searchBar.type(product,{delay:100});        
        await this.page.getByRole('button', { name: 'Buscar' }).click();
    };  
};
export default TopBar;