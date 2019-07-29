const scraper = require("./jwplayer-scraper");
const puppeteer = require("puppeteer");
const fs = require('fs');
const URLs = [
  {
    label: 'kbs1-1',
    url: 'http://live.enc0867live.com/live/%EC%A7%80%EC%83%81%ED%8C%8C%C2%B7%EC%A2%85%ED%8E%B8/KBS1',
    type: 'A',
    fenlei: '1'
  },
  {
    label: 'kbs2-1',
    url: 'http://live.enc0867live.com/live/%EC%A7%80%EC%83%81%ED%8C%8C%C2%B7%EC%A2%85%ED%8E%B8/KBS2%20-%20%EC%84%9C%EB%B2%841',
    type: 'A',
    fenlei: '1'
  },
  {
    label: 'mbc-3',
    url: 'http://live.enc0867live.com/live/%EC%A7%80%EC%83%81%ED%8C%8C%C2%B7%EC%A2%85%ED%8E%B8/MBC%20-%20%EC%84%9C%EB%B2%843',
    type: 'A',
    fenlei: '1'
  },
  {
    label: 'sbs-1',
    url: 'http://live.enc0867live.com/live/%EC%A7%80%EC%83%81%ED%8C%8C%C2%B7%EC%A2%85%ED%8E%B8/SBS%20-%20%EC%84%9C%EB%B2%841',
    type: 'A',
    fenlei: '1'
  },
  {
    label: 'tvchosun-1',
    url: 'http://live.enc0867live.com/live/%EC%A7%80%EC%83%81%ED%8C%8C%C2%B7%EC%A2%85%ED%8E%B8/TV%EC%A1%B0%EC%84%A0%20-%20%EC%84%9C%EB%B2%841',
    type: 'B',
    fenlei: '1'
  },
  {
    label: 'channela-1',
    url: 'http://live.enc0867live.com/live/%EC%A7%80%EC%83%81%ED%8C%8C%C2%B7%EC%A2%85%ED%8E%B8/%EC%B1%84%EB%84%90A%20-%20%EC%84%9C%EB%B2%841',
    type: 'B',
    fenlei: '1'
  },
  {
    label: 'ebs1-1',
    url: 'http://live.enc0867live.com/live/%EC%A7%80%EC%83%81%ED%8C%8C%C2%B7%EC%A2%85%ED%8E%B8/EBS1',
    type: 'A',
    fenlei: '1'
  },
  {
    label: 'ebs2-1',
    url: 'http://live.enc0867live.com/live/%EC%A7%80%EC%83%81%ED%8C%8C%C2%B7%EC%A2%85%ED%8E%B8/EBS2',
    type: 'A',
    fenlei: '1'
  },
  {
    label: 'mbc-1',
    url: 'http://live.enc0867live.com/live/%EC%A7%80%EC%83%81%ED%8C%8C%C2%B7%EC%A2%85%ED%8E%B8/MBC%20-%20%EC%84%9C%EB%B2%841',
    type: 'A',
    fenlei: '1'
  },
  {
    label: 'sbs-2',
    url: 'http://live.enc0867live.com/live/%EC%A7%80%EC%83%81%ED%8C%8C%C2%B7%EC%A2%85%ED%8E%B8/SBS%20-%20%EC%84%9C%EB%B2%842',
    type: 'A',
    fenlei: '1'
  },
  {
    label: 'jtbc-1',
    url: 'http://live.enc0867live.com/live/%EC%A7%80%EC%83%81%ED%8C%8C%C2%B7%EC%A2%85%ED%8E%B8/JTBC%20-%20%EC%84%9C%EB%B2%841',
    type: 'B'
  },
  {
    label: 'kbs2-2',
    url: 'http://live.enc0867live.com/live/%EC%A7%80%EC%83%81%ED%8C%8C%C2%B7%EC%A2%85%ED%8E%B8/KBS2%20-%20%EC%84%9C%EB%B2%842',
    type: 'A',
    fenlei: '1'
  },
  {
    label: 'mbc-2',
    url: 'http://live.enc0867live.com/live/%EC%A7%80%EC%83%81%ED%8C%8C%C2%B7%EC%A2%85%ED%8E%B8/MBC%20-%20%EC%84%9C%EB%B2%842',
    type: 'A',
    fenlei: '1'
  },
  {
    label: 'sbs-3',
    url: 'http://live.enc0867live.com/live/%EC%A7%80%EC%83%81%ED%8C%8C%C2%B7%EC%A2%85%ED%8E%B8/SBS%20-%20%EC%84%9C%EB%B2%843',
    type: 'A',
    fenlei: '1'
  },
  {
    label: 'sbs-fune-1',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/SBS%20FunE',
    type: 'C',
    fenlei: '2'
  },
  {
    label: 'cgv-1',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/%EC%B1%84%EB%84%90CGV%20-%20%EC%84%9C%EB%B2%842',
    type: 'C',
    fenlei: '1'
  },
  {
    label: 'kbs-joy-1',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/KBS%20Joy',
    type: 'C',
    fenlei: '1'
  },
  {
    label: 'ocn-1',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/OCN%20-%20%EC%84%9C%EB%B2%841',
    type: 'C',
    fenlei: '1'
  },
  {
    label: 'mbc-drama-1',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/MBC%20DRAMA',
    type: 'C',
    fenlei: '1'
  },
  {
    label: 'mbc-music-1',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/MBC%20MUSIC',
    type: 'C',
    fenlei: '1'
  },
  {
    label: 'catchon-1',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/CATCH%20ON1%20-%20%EC%84%9C%EB%B2%842',
    type: 'C',
    fenlei: '1'
  },
  {
    label: 'mbc-every1-1',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/MBC%20every1',
    type: 'C',
    fenlei: '1'
  },
  {
    label: 'sbs-mtv-1',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/SBS%20Mtv',
    type: 'C',
    fenlei: '1'
  },
  {
    label: 'kbsw-1',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/KBS%20W',
    type: 'C',
    fenlei: '1'
  },
  {
    label: 'sbs-plus-1',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/SBS%20Plus',
    type: 'C',
    fenlei: '1'
  },
  {
    label: 'super-action-1',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/SUPER%20ACTION%20-%20%EC%84%9C%EB%B2%842',
    type: 'C',
    fenlei: '1'
  },
  {
    label: 'economy-1',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/%EB%A7%A4%EC%9D%BC%EA%B2%BD%EC%A0%9CTV',
    type: 'C',
    fenlei: '5'
  },
  {
    label: 'kbc-drama-1',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/KBS%20Drama',
    type: 'C',
    fenlei: '1'
  },
  {
    label: 'kbsn-life-1',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/KBS%20NLIFE',
    type: 'C',
    fenlei: '5'
  },
  {
    label: 'kbs24-1',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/KBS24',
    type: 'C',
    fenlei: '5'
  },
  {
    label: 'mbc-net-1',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/MBC%20NET',
    type: 'C',
    fenlei: '5'
  },
  {
    label: 'osb-1',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/OBS',
    type: 'C',
    fenlei: '5'
  },
  {
    label: 'onstyle-1',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/On%20style',
    type: 'C',
    fenlei: '5'
  },
  {
    label: 'sbs-cnbc-1',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/SBS%20CNBC',
    type: 'C',
    fenlei: '5'
  },
  {
    label: 'tbstv-1',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/TBSTV',
    type: 'C',
    fenlei: '5'
  },
  {
    label: 'tvn-4',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/TVN%20-%20%EC%84%9C%EB%B2%844',
    type: 'C',
    fenlei: '2'
  },
  {
    label: 'artravel-1',
    url: 'http://live.enc0867live.com/live/%EC%BC%80%EC%9D%B4%EB%B8%94%C2%B7%EC%98%81%ED%99%94/%EC%95%84%EB%A6%AC%EB%9E%91TV',
    type: 'C',
    fenlei: '2'
  },
  {
    label: 'mbc-sports-plus2-1',
    url: 'http://live.enc0867live.com/live/%EC%8A%A4%ED%8F%AC%EC%B8%A0%C2%B7%EA%B2%8C%EC%9E%84/MBC%20SPORTS%20-%20%EC%84%9C%EB%B2%841',
    type: 'C',
    fenlei: '3'
  },
  {
    label: 'kbaduk-1',
    url: 'http://live.enc0867live.com/live/%EC%8A%A4%ED%8F%AC%EC%B8%A0%C2%B7%EA%B2%8C%EC%9E%84/K-%EB%B0%94%EB%91%91',
    type: 'C',
    fenlei: '3'
  },
  {
    label: 'kbsn-sports-1',
    url: 'http://live.enc0867live.com/live/%EC%8A%A4%ED%8F%AC%EC%B8%A0%C2%B7%EA%B2%8C%EC%9E%84/KBSN%20SPORTS',
    type: 'C',
    fenlei: '3'
  },
  {
    label: 'ogn-1',
    url: 'http://live.enc0867live.com/live/%EC%8A%A4%ED%8F%AC%EC%B8%A0%C2%B7%EA%B2%8C%EC%9E%84/SBS%20Sport%20-%20%EC%84%9C%EB%B2%841',
    type: 'C',
    fenlei: '3'
  },
  {
    label: 'sbs-sports-1',
    url: 'http://live.enc0867live.com/live/%EC%8A%A4%ED%8F%AC%EC%B8%A0%C2%B7%EA%B2%8C%EC%9E%84/SBS%20Sport%20-%20%EC%84%9C%EB%B2%841',
    type: 'C',
    fenlei: '3'
  },
  {
    label: 'sky-sports-1',
    url: 'http://live.enc0867live.com/live/%EC%8A%A4%ED%8F%AC%EC%B8%A0%C2%B7%EA%B2%8C%EC%9E%84/SKY%20SPORTS%20-%20%EC%84%9C%EB%B2%841',
    type: 'C',
    fenlei: '3'
  },
  {
    label: 'sky-sports-2',
    url: 'http://live.enc0867live.com/live/%EC%8A%A4%ED%8F%AC%EC%B8%A0%C2%B7%EA%B2%8C%EC%9E%84/SKY%20SPORTS%20-%20%EC%84%9C%EB%B2%842',
    type: 'C',
    fenlei: '3'
  },
  {
    label: 'spotv-games-1',
    url: 'http://live.enc0867live.com/live/%EC%8A%A4%ED%8F%AC%EC%B8%A0%C2%B7%EA%B2%8C%EC%9E%84/SPOTV%20GAME',
    type: 'C',
    fenlei: '3'
  },
]
const results = [];

async function run () {
  const browser = await launchBrowser();
  for (let i = 0; i < URLs.length; i++) {
    console.log(`Scraping URL # ${i + 1}`);
    let rawRes = ['Error'];
    const page = await launchPage(browser);
    try {
      rawRes = await scraper.getMediaSources(URLs[i].url, page);
    } catch (error) {
      console.error(error);
    }
    const res = {
      label: URLs[i].label,
      videoURL: rawRes[0]
    }
    results.push(res);
    fs.writeFileSync('results.json', JSON.stringify(results));
    await page.close();
  }
  await browser.close();
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
        '--proxy-server=zproxy.lum-superproxy.io:22225',
        // '--proxy-server=143.255.52.90:8080',
      ],
      ignoreHTTPSErrors: true,
    });
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
    await page.authenticate({
      username: 'lum-customer-hl_4ebb9317-zone-zona',
      password: 'uo531xw2klrk',
    });
    resolve(page);
  } catch (error) {
    console.log('Launch Page Error: ', error)
    reject(error);
  }
});

run();
