const request = require("request");
const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
var title = [], link =[], src = []

router.post('/', function(req, res) {

    request('https://news.google.com/rss?pz=1&cf=all&hl=ko&topic=po&gl=KR&ceid=KR:ko', function(error, response, html) {
        if (!error && response.statusCode == 200) {
    
            var $ = cheerio.load(html, {
              xmlMode: true
            });
    
            $('item').each(function () {
                title.push($(this).children('title').text());       //이름
                link.push($(this).children('link').text());       //나이
                src.push($(this).children('source').text());       //기타
              });
            
    
        }
    
        const responseBody = {
            version: "2.0",
            template: {
              outputs: [
                  {
                      simpleText: {text : `$`}
                  }
              ]
            }
      };
      
      res.status(200).send(responseBody);	
    
    })

	
});






module.exports = router;

