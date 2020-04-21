// import puppetteer from 'puppeteer';

const puppetteer = require('puppeteer');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../../../webpack.config');

    jest.setTimeout(30000); 
    describe('Validation form', () => {
    let browser = null;
    let page = null;
    let server = null;
    const baseUrl = 'http://localhost:9000';
    beforeAll(async () => {
        server = new WebpackDevServer(webpack(config), {});
        server.listen(9000, 'localhost', (err) => {
        if (err) {
            return;
        }
        if (process.send) {
            process.send('ok');
        }
        });
        browser = await puppetteer.launch({
        headless: false,
        slowMo: 100,
        devtools: true,
        });
        page = await browser.newPage();
    });
    afterAll(async () => {
        await browser.close();
        server.kill();
    });
    describe('Validate card', () => {
        test('Should add .if_lex to tooltip', async () => {
          await page.goto(baseUrl);
          const addBtn = await page.$('.add_button');
          addBtn.click();
          const inputForm = await page.$('.input_form');
          const inputSaveBtn = await page.$('#save');
          inputSaveBtn.click();
          await page.waitFor(() => document.querySelector('.name_input_tooltip').classList.contains('if_flex'));
        });

    });

});
