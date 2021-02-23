const request = require("request");
const express = require('express');
const router = express.Router();
var fs = require('fs');

router.post('/', function(req, res) {

  var pann = fs.readFileSync('/Users/bonghayun/Desktop/project/js/real_time_kakao/python/data/natePann.json', 'utf8')

  function removeByteOrderMark(str){
    return str.replace(/^\ufeff/g,"")
  }

  pann = removeByteOrderMark(pann)

  var pannList = JSON.parse(pann);
  console.log(pannList[0])

  var sendText ="[네이트 판 인기 게시글]\n"

  pannList.map(data => {
    sendText = sendText + +data[0] +"위 :: " + data[1] + "\n\n"
  })

	var responseBody = {
    version: "2.0",
    template: {
      outputs: [
      {
        simpleText: {text : sendText}
      }
      ]
    }
  };
	
	res.status(200).send(responseBody);	

	
});

module.exports = router;

