import {Page} from "@playwright/test";
import LandingPage from "./Pages/LandingPage";
import MLpage from "./Pages/MLPage";
import {SearchResults} from "./Pages/SearchResults";

class POManager{
    readonly page: Page;
    readonly landingPage: LandingPage;
    readonly mlPage: MLpage;
    readonly searchResults: SearchResults;

    constructor(page: Page){
        this.page=page;
        this.landingPage = new LandingPage(page);
        this.mlPage= new MLpage(page);
        this.searchResults = new SearchResults(page);

    };

    getLandingPage(){
        return this.landingPage;
    };

    getMLPage(){
        return this.mlPage;
    };

    getSearchResults(){
        return this.searchResults;
    };

};
export default POManager;