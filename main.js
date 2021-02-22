const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');


app.use(logger('dev', {}));
app.use(bodyParser.json());

app.use('/api/getNews', require('./router/getNews.js'));
app.use('/api/getTrend', require('./router/getTrend.js'));
app.use('/api/getMelon', require('./router/getMelon.js'));
app.use('/api/resSearch', require('./router/resSearch.js'));
app.use('/api/resTwitter', require('./router/getTwitter'));


app.listen(8602, function() {
    console.log('Example skill server listening on port 8602!');
});