const request = require("request");
const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');

const reqMelon = (callback) => {
    var url = 'http://www.melon.com/chart/';
    request(url, function(error, response, html){
        var $ = cheerio.load(html);
        var title = []
        var artist = []
        var melonTop = []
    
    
        for (var i = 0; i < 10; i++) {
            $('.ellipsis.rank01 > span > a').each(function(){
              var title_info = $(this);
              var title_info_text = title_info.text();
              title[i] = title_info_text;
              i++;
            })
          }
          
          // 아티스트명 파싱
          for (var i = 0; i < 10; i++) {
            $('.checkEllipsis > a').each(function(){
              var artist_info = $(this);
              var artist_info_text = artist_info.text();
              artist[i] = artist_info_text;
              i++;
            })
          }
          
          // 순위 제목 - 아티스트명
          for (var i = 0; i < 10; i++) {
            melonTop[i] = title[i] + " - " + artist[i]
          }
    
          return melonTop
    })
}

reqMelon((data) => melonData = data)


router.post('/', function(req, res) {
	const responseBody = {
		  version: "2.0",
		  template: {
			outputs: [
				{
					simpleTexts: {text : melonData[0]}
				}
			]
	  	}
	};
	

	console.log(melonData[0])
	res.status(200).send(responseBody);	

	
});

module.exports = router;

