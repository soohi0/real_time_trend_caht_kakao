const twitterInfo = ((titles,links,descriptions) => {

  var titleBox = ""
  titles.forEach((title,index) => {
    titleBox = titleBox + (index + 1) + " > " + title +"\n" 
  })

  var itemInfo = [{
    title: "요약",
    description: titleBox
  }]

  var index = 0

  titles.forEach(title => {
    var textData = {
      title: `주요뉴스 #${index+1}`,
      description: `${title}`,
      // thumbnail: {
      //   imageUrl: "http://k.kakaocdn.net/dn/83BvP/bl20duRC1Q1/lj3JUcmrzC53YIjNDkqbWK/i_6piz1p.jpg"
      // },
      buttons: [
        {
          action:  "webLink",
          label: "본문읽기",
          webLinkUrl : `${links[index]}`
        }
      ]
    }

    index = index +1

    itemInfo.push(textData)

  })

  var data =
  {
      version: `2.0`,
      template : {
        outputs: [
          {
            carousel: {
              type: "basicCard",
              items: itemInfo
            }
          }
        ]
      }
    }

    return data
})

module.exports={twitterInfo}
  