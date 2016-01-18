var express = require('express');
var app = express();

var logger = require('./logger');
app.use(logger);

//Example 1 not using middleware
/*
app.get('/', function(request, response){
	response.sendFile(__dirname + '/public/index.html');
});
*/

//Example 2 - same result as example 1 but using static middleware
app.use(express.static('public'));

//Example 3
app.get('/blocks', function(request, response){
	var blocks = ['Fixed','Movable','Rotating'];
	response.json(blocks);
});


app.listen(3000, function(){
	console. log('Listening on port 3000');	
});