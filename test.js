var request = require('request');
var client_id = 'Y9UdZZJQkdTMSmP9gLko';
var client_secret = 'MEb_eUqalq';
var api_url = 'https://openapi.naver.com/v1/datalab/search';
var request_body = {
    "startDate": "2021-02-22",
    "endDate": "2021-02-22",
    "timeUnit": "date",
    "keywordGroups": [
        {
            "groupName": "한글",
            "keywords": [
                "한글",
                "korean"
            ]
        },
        {
            "groupName": "영어",
            "keywords": [
                "영어",
                "english"
            ]
        }
    ]
};

request.post({
        url: api_url,
        body: JSON.stringify(request_body),
        headers: {
            'X-Naver-Client-Id': client_id,
            'X-Naver-Client-Secret': client_secret,
            'Content-Type': 'application/json'
        }
    },
    function (error, response, body) {
        console.log(response.statusCode);
        console.log(response.body.startDate);
    });