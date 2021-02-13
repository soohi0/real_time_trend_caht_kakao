const express = require('express');
const router = express.Router();

const linkWeb = (web, searchUrl, search) =>{
	const responseBody = {
		version: "2.0",
		template: {
			"outputs": [
			{
			"basicCard": {
				"title": web,
				"description": `${web}에서 ${search}에 대한 결과를 보여드립니다.\n기본 엔진은 "네이버"입니다.`,
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
			}}],
            "quickReplies": [
                {
                  "blockId": "손흥민",
                  "action": "block",
                  "label": "구글"
                },
                {
                  "blockId": "헤리케인",
                  "action": "block",
                  "label": "네이버"
                }
              ]
		}
	};
	return responseBody
}


router.post('/', function(req, res) {
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
            console.log(req.body)
            responseBody = linkWeb(webName, searchUrl, search)
			
			break;
		case 'daum':
            var searchUrl = "https://m.search.daum.net/search?w=tot&q=" + search
            var webName = "다음"
            console.log(req.body)
            responseBody = linkWeb(webName, searchUrl, search)
			
            break;
            
		default:
    		res.status(200).send(responseBody);
			
	}

    res.status(200).send(responseBody);
});


module.exports = router;
