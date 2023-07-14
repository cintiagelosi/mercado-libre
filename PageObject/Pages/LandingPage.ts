import { type Page } from "@playwright/test";
import{CountryList} from '../Components/CountryList'

export class LandingPage {
   
    readonly countryList: CountryList; 
    
    constructor(page: Page){
        this.countryList = new CountryList(page);
    }

    async searchCountry(country:string){
        await this.countryList.selectCountry(country);
    } 
}
export default LandingPage;