let request = require("request-promise");

module.exports.getMediaSources = function (pageUrl, page) {
  return new Promise(async (resolve, reject) => {
    try {
      let sources = [];
      await page.setRequestInterception(true);
      page.on("console", message => {
        try {
          sources = JSON.parse(message.text()).scrapeList;
        } catch (error) {}
      });
      page.on("request", async _request => {
        if (_request.resourceType() === 'script') {
          let scriptContent = await request(_request._url);
          if (scriptContent.toString().indexOf("jwplayer=function") !== -1) {
            console.log('Found JWT');
            _request.respond({
              contentType: "application/javascript",
              body: "function jwplayer(){return{setup:function(i){i.file?console.log(JSON.stringify({scrapeList:[i.file]})):i.sources?console.log(JSON.stringify({scrapeList:i.sources})):i.playlist&&$.get(i.playlist,function(i){var s=[];i.playlist.forEach(function(i){i.sources.forEach(function(i){s.push(i)})}),console.log(JSON.stringify({scrapeList:s}))})}}}"
            });
          } else {
            _request.continue();
          }
        } else {
          _request.continue();
        }
      });
      await page.goto(pageUrl, {
        waitUntil: "networkidle2"
      });
      await page.waitFor(10000);
      console.log(sources)
      resolve(sources);
    } catch (error) {
      reject(error);
    }
  });
};