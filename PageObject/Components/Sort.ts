import {type Locator, type Page } from "@playwright/test";
import { expect } from '@playwright/test';

export class Sort {
   
    readonly page:Page;  
    readonly arrow: Locator; 
    readonly options: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.arrow = page.getByRole('button', { name: 'Más relevantes Más relevantes' });
        this.options = page.getByRole('listbox', { name: 'Más relevantes' });
    };
    
    async sortBy(optionFilter:"lowest"|"highest"){
        let nameLocator = ''
        switch(optionFilter){
            case 'lowest':
                nameLocator = 'Menor precio';
                break;
            case 'highest':
                nameLocator = 'Mayor precio';
                break;
        }
        await this.arrow.click();
        await expect(this.options).toBeVisible();
        await this.options.getByRole('option', { name: nameLocator }).click();  
    };
};
export default Sort;



