import {type Page } from "@playwright/test";
import {Filters}from "../Components/Filters";

export class SearchResults {
   
    readonly filters: Filters;
    
    constructor(page: Page){
        this.filters = new Filters(page);
      
    };
    
    async addFilters(){
        await this.filters.filters();
    };
    
};
export default SearchResults;