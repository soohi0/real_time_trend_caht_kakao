const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const https = require('https');
const googleTrends = require('google-trends-api');
const request = require("request");
const cheerio = require('cheerio');

const apiRouter = express.Router();

app.use(logger('dev', {}));
app.use(bodyParser.json());
app.use('/api', apiRouter);

var arr_req = []
var data = []
var title_data = []
var melonData = []


const getGoogleData = () => {
	
	googleTrends.dailyTrends({
		  trendDate: new Date('2021-02-12'),
		  geo: 'KR',
		}, function(err, results) {
		  if (err) {
			console.log(err);
		  }else{
			var data = JSON.parse((results))
			data = data.default.trendingSearchesDays[0].trendingSearches

			data.map((title) => {
				// console.log("1 " + title.title.query)
				title_data.push(title.title.query)
				// console.log("1",title_data)
				
			})
			  
			return title_data
			
	  	}
	});
}

apiRouter.post('/getTrend', function(req, res) {
	var web = req.body.action.params.web
	var resData = ""
	var title_data = []
	var text = ""
	
	
	switch (web){
		case 'google' :
			resData = "구글은 "
			 
			googleTrends.dailyTrends({
				trendDate: new Date('2021-02-12'),
				geo: 'KR',
			}, (err, results) => {
			if (err) {
				console.log(err);
			}else{
				var data = JSON.parse((results))
				data = data.default.trendingSearchesDays[0].trendingSearches

				title_data = data.map((title) => title.title.query)
				
				
				for (const i in title_data ){
					console.log(title_data[i])
					num = Number(i) + 1
					text = text + num + "위 :: "+ title_data[i] + "\n"
				}

				// console.log(title_data)
				const responseBody = {
				 	version: "2.0",
				  	template: {
						outputs: [
						  {
							simpleText: { text: text }
						  },
						  {
							simpleText: { text: "감사합니다." }
						  }
						]
					  }
					}

					res.status(200).send(responseBody)

			}
			});
			
			
			break
		case 'naver' :
			resData = "네이버는 ~"
			break
		case 'kakao' :
			resData = "카카오는 ~"
			break
		default :
			resData = "찾을 수 없습니다."
			
 	
	}
	


  });

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


apiRouter.post('/getMelon', function(req, res) {
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

apiRouter.post('/getNews', function(req, res) {
	const responseBody = {
		  version: "2.0",
		  template: {
			outputs: [
				{
					simpleText: {text : "뉴스를 선택했습니다."}
				}
			]
	  	}
	};
	
	res.status(200).send(responseBody);	
	
});

const linkWeb = (web, searchUrl, search) =>{
	const responseBody = {
		version: "2.0",
		template: {
			"outputs": [
			{
			"basicCard": {
				"title": web,
				"description": `${web}에서 ${search}에 대한 결과를 보여드립니다.`,
				"thumbnail": {
				"imageUrl": "https://images.unsplash.com/photo-1596303543588-0ed24c575288?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
				},
				"buttons": [
				{
					"action":  "webLink",
					"label": "웹 열기",
					"webLinkUrl": searchUrl
				}
				]
			}
			}
			]
		}
	};
	return responseBody
}



  
  apiRouter.post('/resSearch', function(req, res) {
	var web = req.body.action.params.web
    var search = req.body.action.params.search
	var responseBody = {
      version: "2.0",
      template: {
        outputs: [
			{
				simpleText: {text : "에러가 발생했습니다."}
			}
        ]
      }
    };
	  
	switch(web){
		case 'google':
            var searchUrl = "https://www.google.com/search?q="+search+"&ie=UTF-8"
			var webName = "구글"
            responseBody = linkWeb(webName, searchUrl, search)
			
			break;
		case 'naver':
            var searchUrl = "https://m.search.naver.com/search.naver?query=" + search
			var webName = "네이버"
            responseBody = linkWeb(webName, searchUrl, search)
			
			break;
		case 'daum':
            var searchUrl = "https://m.search.daum.net/search?w=tot&q=" + search
			var webName = "다음"
            responseBody = linkWeb(webName, searchUrl, search)
			
			break;
		default:
    		res.status(200).send(responseBody);
			
	}


        
    
    res.status(200).send(responseBody);
});

app.listen(3000, function() {
    console.log('Example skill server listening on port 3000!');
});