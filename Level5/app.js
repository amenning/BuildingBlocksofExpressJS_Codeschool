var express = require('express');
var app = express();

app.use(express.static('public'));

var blocks = require('./routes/blocks');
var locations = require('./routes/locations');

app.use('/blocks', blocks);
app.use('/locations', locations);

app.listen(3000, function(){
	console. log('Listening on port 3000');	
});