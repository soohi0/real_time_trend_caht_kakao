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

  var sendText = ""

  newArr.map(info => {
    sendText = sendText + info["num"] +"위  "+ info["name"] + "\n\n"
  })


  var data =
  {
      version: "2.0",
      template: {
        outputs: [
        {
          simpleText: {text : sendText}
        }
        ]
      }
    };


    return data
})

module.exports={twitterInfo}
  