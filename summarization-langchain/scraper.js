import puppeteer from 'puppeteer';

async function scrape(url) {
  // Create a new browser object.
  const browser = await puppeteer.launch({
    ignoreDefaultArgs: ['--disable-extensions'],
  });

  // Navigate to the website that you want to scrape.
  const page = await browser.newPage();
  await page.goto(url);
//   await page.setRequestCrawlRate(100);

  // Find the element that contains the URL that you want to scrape.
  const text = await page.evaluate(() => {
    const anchor = document.querySelector("body");
    return anchor.textContent.trim();
  });
  //const element = await page.findElement("body");

  // Get the text of the element.
  //const urlText = await element.getText();

  // Close the browser.
  await browser.close();

  return text;
}

// // Scrape the website for the URL with the id "url1".
// const urlText = await scrape('https://example.com', '#url1');

// console.log(urlText);

export default scrape;