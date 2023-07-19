import { test, expect, Page } from '@playwright/test';
import POManager from '../PageObject/POManager';
import MLPage from '../PageObject/Pages/MLPage';
const DATASET = JSON.parse(JSON.stringify(require('../utils/placeholder.json')));

let poManager: POManager;
let mlPage: MLPage;

const URL = 'https://www.mercadolibre.com/';

test.describe.configure({mode:'serial'});

test.beforeEach(async ({page}) => {
  poManager = new POManager(page);   
  await page.goto(URL);
  await expect(page.locator('.ml-logo')).toContainText('MercadoLibre');   
  const LANDINGPAGE = poManager.getLandingPage();   
  await LANDINGPAGE.searchCountry(DATASET.country);
  await expect(page.locator('.nav-logo')).toBeVisible();
  mlPage = poManager.getMLPage();
  await mlPage.search(DATASET.product);
});

test(`Verify the title matches the product: ${DATASET.product}`, async({page})=>{ 
  const TITLE = await page.locator('.ui-search-breadcrumb__title').textContent();
  if (TITLE !== null){
    expect(TITLE.toLocaleLowerCase()).toContain(DATASET.product.toLocaleLowerCase());
  };
});

test('Verify the selected order is the right one', async({page})=>{
  let optionFilter = DATASET.optionFilterPrice;
  await mlPage.clickCookies(page);
  await mlPage.sortBy(optionFilter);
  let price1 = await page.locator('.ui-search-price .andes-money-amount__fraction').first().textContent();
  let price2 = await page.locator('.ui-search-price .andes-money-amount__fraction').last().textContent(); 
  if(optionFilter === 'highest' && price1 !== null && price2 !== null){
      expect(parseFloat(price2.replace('.', ''))).toBeLessThan(parseFloat(price1.replace('.', '')));
  }else if(optionFilter === 'lowest' && price1 !== null && price2 !== null){
      expect(parseFloat(price1.replace('.', ''))).toBeLessThan(parseFloat(price2.replace('.', '')));
  };
});

test('Verify a user cannot continue with the purchase if the user is not logged in', async({page})=>{
  await mlPage.clickCookies(page);
  await mlPage.sortBy(DATASET.optionFilterPrice);
  const SEARCHRESULTS = poManager.getSearchResults();
  await SEARCHRESULTS.addFilters();
  await expect(page.getByRole('link', { name: 'Nuevo Quitar el filtro de Condición Nuevo' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Xiaomi Quitar el filtro de Marca Xiaomi' })).toBeVisible();
  await expect(page.locator('#shipping_cost_highlighted')).toHaveAttribute('checked','');
  const TEXTPRODUCT = await page.locator('.ui-search-item__title').first().textContent();
  await page.locator('.ui-search-layout__item').first().click();
  expect(TEXTPRODUCT).toContain(await page.locator('.ui-pdp-title').textContent())
  await page.getByRole('button', { name: 'Comprar ahora' }).click();
  await expect(page.locator('.center-card__header')).toBeVisible();
  expect(await page.locator('[data-testid="login-link"]').textContent()).toContain('Crear cuenta')
  expect(await page.locator('.login-link').textContent()).toContain('Ingresar')
});







