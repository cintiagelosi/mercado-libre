import {type Locator, type Page } from "@playwright/test";

export class Filters {
    readonly page:Page;  
    readonly marca: Locator;
    readonly condicion: Locator;
    readonly envio: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.marca = page.getByRole('link', { name: 'Xiaomi', exact: true });
        this.condicion = page.getByRole('link', { name: 'Nuevo', exact: true });
        this.envio = page.getByRole('link', { name: 'Gratis' });
    };
    async filters(){
        await this.marca.click();
        await this.condicion.click();
        await this.envio.click();
    };
   
   

};
export default Filters;
