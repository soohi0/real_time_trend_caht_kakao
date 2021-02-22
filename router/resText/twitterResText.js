const twitterInfo = ((localData) => {


  var newArr = [] 
  var index = 1;

  for (data of localData){
    if(data["tweet_volume"] > 1000){
      data["num"] = index
      newArr.push(data)
      index = index + 1;
    }
  }

  for (data of localData){
    if(data["tweet_volume"] <= 1000){
      data["num"] = index
      newArr.push(data)
      index = index + 1;
    }
  }

  var titleBox = ""

  newArr.map(info => {
    titleBox = titleBox + info["num"] +"위  "+ info["name"] + "\n"
  })

  var itemInfo = [{
    title: "요약",
    description: titleBox
  }]

  var index = 0

  newArr.forEach(info => {
    var textData = {
      title: `트위터 트렌드 ${info["num"]}`,
      description: `${info["name"]} \n볼륨 :: ${info["tweet_volume"]}`,
      // thumbnail: {
      //   imageUrl: "http://k.kakaocdn.net/dn/83BvP/bl20duRC1Q1/lj3JUcmrzC53YIjNDkqbWK/i_6piz1p.jpg"
      // },
      buttons: [
        {
          action:  "webLink",
          label: "본문읽기",
          webLinkUrl : `${info["url"]}`
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
  