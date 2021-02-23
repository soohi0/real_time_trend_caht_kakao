const newsInfo = ((titles,links,descriptions) => {

    var sendText = ""
    titles.forEach((title,index) => {
        sendText = sendText + (index + 1) + " > " + title +"\n\n" 
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
  
  module.exports={newsInfo}
    