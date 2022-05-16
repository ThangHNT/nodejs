const puppeteer = require('puppeteer');

(async () => {
    const cookie = {
        name: 'c_user',
        value: '100012675420650', // replace this!
        domain: 'facebook.com',
        url: 'https://facebook.com',
        path: '/',
        httpOnly: true,
        secure: true,
      };
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setCookie(cookie);
  
  await page.goto('https://facebook.com');
  await page.screenshot({ path: 'example.png'})

  await browser.close();
})()