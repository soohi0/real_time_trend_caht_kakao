var fs = require('fs');
const express = require('express');
// var { twitterInfo } = require("./resText/twitterResText")
var { twitterInfo } = require("./resText/twitterResText_onlyText")
// var funcTwtter = require("./resText/twitterResText");

const router = express.Router();


router.get('/', function(req, res) {

    var local = "korea"
    // var local = "korea"

    var worldData = fs.readFileSync('/Users/bonghayun/Desktop/project/js/real_time_kakao/python/data/twitter_Worldwide_trend.json', 'utf8')
    var koreaData = fs.readFileSync('/Users/bonghayun/Desktop/project/js/real_time_kakao/python/data/twitter_Korea_trend.json', 'utf8')
    
    function removeByteOrderMark(str){
        return str.replace(/^\ufeff/g,"")
    }
    worldData = removeByteOrderMark(worldData)
    koreaData = removeByteOrderMark(koreaData)

	var korea = JSON.parse(koreaData);
    korea = korea[0]["trends"];
	var world = JSON.parse(worldData);
    world = world[0]["trends"];

    var resData;

    console.log(local)

    switch (local){
        case "korea" :
            resData = twitterInfo(korea)
            break;
        case "worldwide":
            resData = twitterInfo(world)
            break;
        default:
            console.log("err")
    }
    console.log(resData)
    res.json(resData)

});

module.exports = router;
