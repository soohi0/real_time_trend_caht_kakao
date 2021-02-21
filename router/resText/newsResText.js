
const newsInfo = (props) => {
  var number = props;
  
  var data =
  {
      version: `${number}`,
      template : {
        outputs: [
          {
            carousel: {
              type: "basicCard",
              items: [
                {
                  title: "보물상자",
                  description: "보물상자 안에는 뭐가 있을까",
                  thumbnail: {
                    imageUrl: "http://k.kakaocdn.net/dn/83BvP/bl20duRC1Q1/lj3JUcmrzC53YIjNDkqbWK/i_6piz1p.jpg"
                  },
                  buttons: [
                    {
                      action:  "webLink",
                      label: "구경하기",
                      webLinkUrl : "https://e.kakao.com/t/hello-ryan"
                    }
                  ]
                },
                {
                  title: "보물상자2",
                  description: "보물상자2 안에는 뭐가 있을까",
                  thumbnail: {
                    imageUrl: "http://k.kakaocdn.net/dn/83BvP/bl20duRC1Q1/lj3JUcmrzC53YIjNDkqbWK/i_6piz1p.jpg"
                  },
                  buttons: [
                    {
                      action: "message",
                      label: "열어보기",
                      messageText: "짜잔! 우리가 찾던 보물입니다"
                    },
                    {
                      action:  "webLink",
                      label: "구경하기",
                      webLinkUrl: "https://e.kakao.com/t/hello-ryan"
                    }
                  ]
                },
                {
                  title: "보물상자3",
                  description: "보물상자3 안에는 뭐가 있을까",
                  thumbnail: {
                    imageUrl: "http://k.kakaocdn.net/dn/83BvP/bl20duRC1Q1/lj3JUcmrzC53YIjNDkqbWK/i_6piz1p.jpg"
                  },
                  buttons: [
                    {
                      action: "message",
                      label: "열어보기",
                      messageText: "짜잔! 우리가 찾던 보물입니다"
                    },
                    {
                      action:  "webLink",
                      label: "구경하기",
                      webLinkUrl: "https://e.kakao.com/t/hello-ryan"
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    }

    return data
}

module.exports={newsInfo}
  