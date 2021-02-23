const request = require("request");
const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
// var { newsInfo } = require("./resText/newsResText")
var { newsInfo } = require("./resText/newsResText_onlyText")

var title = [], link =[], description =[]

router.post('/', function(req, res) {
  var type = req.body.action.params.type

	switch (type){
    case 'main': 
      request('https://news.google.com/rss?pz=1&cf=all&hl=ko&topic=po&gl=KR&ceid=KR:ko', function(error, response, html) {
        if (!error && response.statusCode == 200) {

            var $ = cheerio.load(html, {
              xmlMode: true
            });

            $('item').each(function () {
                title.push($(this).children('title').text());       //이름
                link.push($(this).children('link').text());       //나이
                description.push($(this).children('description').text());       //기타
              });
        }
        var resBody = newsInfo(title,link,description)
      
      res.status(200).send(resBody);	

    })
    break;

    case 'sbs':
      request('https://news.sbs.co.kr/news/ReplayRssFeed.do?prog_cd=R2&plink=RSSREADER', function(error, response, html) {
        if (!error && response.statusCode == 200) {

            var $ = cheerio.load(html, {
              xmlMode: true
            });

            $('item').each(function () {
                title.push($(this).children('title').text());       //이름
                link.push($(this).children('link').text());       //나이
                // src.push($(this).children('source').text());       //기타
                description.push($(this).children('description').text());       //기타
              });
        }
        var resBody = newsInfo(title,link,description)
      
      res.status(200).send(resBody);	

    })
    break;
    
  }
	
});






module.exports = router;

