const express = require('express');
const router = express.Router();
const googleTrends = require('google-trends-api');

var todaysDate = new Date();

function convertDate(date) {
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth()+1).toString();
  var dd  = date.getDate().toString();

  var mmChars = mm.split('');
  var ddChars = dd.split('');

  return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
}

console.log(convertDate(todaysDate)); // Returns: 2015-08-25


router.get('/', function(req, res) {
	// var web = req.body.action.params.web
	var title_data = []
	var text = ""

    googleTrends.dailyTrends({
        trendDate: new Date(convertDate(todaysDate)),
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

    }})

    setTimeout(function(){ res.json(text); }, 1000);
})

module.exports = router;

