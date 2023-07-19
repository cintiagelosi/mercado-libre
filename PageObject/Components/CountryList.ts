import {type Locator, type Page } from "@playwright/test";

export class CountryList {
   
    readonly page:Page;
    readonly countryList:Locator;    
    
    constructor(page: Page){
        this.page = page;
        this.countryList = page.locator('.ml-site-link');
    }

    async selectCountry(country:String){
        const COUNT = await this.countryList.count();
        for(let i=0; i< COUNT; i++){
            const TEXT =  await this.countryList.nth(i).textContent();
            if(TEXT === country){
                await this.countryList.nth(i).click();
                break; 
            }
        }             
    } 
}
export default CountryList;