const express = require('express');
const router = express.Router();
const googleTrends = require('google-trends-api');

const reqDataToKakao = (responseBody, res) => {
    res.status(200).send(responseBody)
}

router.post('/', function(req, res) {
	var web = req.body.action.params.web
	var title_data = []
	var text = ""
	
	
	switch (web){
		case 'google' :
			resData = "구글은 "
			 
			googleTrends.dailyTrends({
				trendDate: new Date('2021-02-13'),
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
				var responseBody = {
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

                reqDataToKakao(responseBody, res)

			}
			});
			
			break
		case 'naver' :
            var responseBody = {
                version: "2.0",
                 template: {
                   outputs: [
                     {
                       simpleText: { text: "네이버는.." }
                     },
                     {
                       simpleText: { text: "감사합니다." }
                     }
                   ]
               }
           }
           reqDataToKakao(responseBody, res)
			break
		case 'kakao' :
            var responseBody = {
                version: "2.0",
                 template: {
                   outputs: [
                     {
                       simpleText: { text: "카카오는.." }
                     },
                     {
                       simpleText: { text: "감사합니다." }
                     }
                   ]
               }
           }
           reqDataToKakao(responseBody, res)
			break
		default :
            var responseBody = {
                version: "2.0",
                template: {
                outputs: [
                    {
                    simpleText: { text: "데이터 값을 찾을 수 없습니다..." }
                    },
                    {
                    simpleText: { text: "감사합니다." }
                    }
                ]
            }
        }
        reqDataToKakao(responseBody, res)
	}	
});

module.exports = router;

