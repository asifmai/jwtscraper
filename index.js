const scraper = require("./jwplayer-scraper");
const puppeteer = require("puppeteer");
const fs = require('fs');
const URLs = [
  {
    label: 'Moohan',
    url: 'http://live.enc0867live.com/live/%EC%9D%B8%EA%B8%B0/%EB%AC%B4%ED%95%9C%EB%8F%84%EC%A0%84%2024'
  },
  {
    label: 'SBS Server 1',
    url: 'http://live.enc0867live.com/live/%EC%9D%B8%EA%B8%B0/SBS%20-%20%EC%84%9C%EB%B2%841'
  },
  {
    label: 'SBS Server 2',
    url: 'http://live.enc0867live.com/live/%EC%9D%B8%EA%B8%B0/SBS%20-%20%EC%84%9C%EB%B2%842'
  },
  {
    label: 'MBC Server 1',
    url: 'http://live.enc0867live.com/live/%EC%A7%80%EC%83%81%ED%8C%8C%C2%B7%EC%A2%85%ED%8E%B8/MBC%20-%20%EC%84%9C%EB%B2%841'
  },
  {
    label: 'OCN Server 1',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/OCN%20-%20%EC%84%9C%EB%B2%841'
  },
  {
    label: 'KBSW',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/KBS%20W'
  }
]
const results = [];

async function run () {
  const browser = await launchBrowser();
  for (let i = 0; i < URLs.length; i++) {
    console.log(`Scraping URL # ${i + 1}`)
    const page = await launchPage(browser);
    const rawRes = await scraper.getMediaSources(URLs[i].url, page);
    const res = {
      label: URLs[i].label,
      videoURL: rawRes[0]
    }
    results.push(res);
    fs.writeFileSync('results.json', JSON.stringify(results));
    await page.close();
    console.log('Closed Page')
  }
  await browser.close();
  console.log('Closed Browser')
}

const launchBrowser = () => new Promise(async (resolve, reject) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,                        
      args: [
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--window-position=0,0',
        '--ignore-certifcate-errors',
        '--ignore-certifcate-errors-spki-list',
        '--window-size=1366,768',      
        '--no-sandbox',                  
        // '--proxy-server=143.255.52.90:8080',    //To use a sock5 proxy
      ],
      ignoreHTTPSErrors: true,
    });
    console.log('Launched Browser');
    resolve(browser);
  } catch (error) {
    console.log('Browser Launch Error: ', error);
    reject(error);
  }
});

const launchPage = (browser) => new Promise(async (resolve, reject) => {
  try {
    const page = await browser.newPage();
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36';
    await page.setUserAgent(userAgent);
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => false,
      });

      Object.defineProperty(navigator, "languages", {
        get: () => ["en-US", "en"],
      });

      Object.defineProperty(navigator, 'plugins', {
        get: () => [1, 2, 3, 4, 5],
      });
    });
    await page.setViewport({
      width: 1366,
      height: 768
    });
    console.log('Launched Page');
    resolve(page);
  } catch (error) {
    console.log('Launch Page Error: ', error)
    reject(error);
  }
});

run();