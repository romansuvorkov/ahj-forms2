const puppeteer = require('puppeteer');
const { fork } = require('child_process');

jest.setTimeout(30000);
describe('E2E', () => {
  let browser = null;
  let page = null;
  let server = null;
  const url = 'http://localhost:9000';
  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', () => {
        reject();
      });
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });
    browser = await puppeteer.launch(
      {
        // headless: false,
        // slowMo: 100,
        // devtools: true,
      },
    );
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  describe('Tests', () => {
    test('Creating item', async () => {
      await page.goto(url);
      const addProductButton = await page.$('.add_button');
      addProductButton.click();
      await page.waitForSelector('.input_form', { visible: true });
      const inputName = await page.$('.name_input');
      await inputName.type('Test');
      const inputPrice = await page.$('.price_input');
      await inputPrice.type('123');
      const saveBtn = await page.$('#save');
      saveBtn.click();
      await page.waitForSelector('.list_item');
    });

    test('Change items', async () => {
      await page.goto(url);
      const addProductButton = await page.$('.add_button');
      addProductButton.click();
      await page.waitForSelector('.input_form', { visible: true });
      const inputName = await page.$('.name_input');
      inputName.type('Test');
      const inputPrice = await page.$('.price_input');
      inputPrice.type('123');
      const saveBtn = await page.$('#save');
      saveBtn.click();
      await page.waitForSelector('.list_item');
      const redactItem = await page.$('.redact');
      redactItem.click();
      await page.waitForSelector('.redact_form', { visible: true });
      const redactName = await page.$('.name_redact');
      expect(await redactName.evaluate((node) => node.value)).not.toBe('');
    });

    test('Popover input form show', async () => {
      await page.goto(url);
      const addProductButton = await page.$('.add_button');
      addProductButton.click();
      await page.waitForSelector('.input_form', { visible: true });
      const inputPrice = await page.$('.price_input');
      inputPrice.type('123');
      const saveBtn = await page.$('#save');
      saveBtn.click();
      await page.waitForSelector('.name_input_tooltip', { visible: true });
    });
  });
});
