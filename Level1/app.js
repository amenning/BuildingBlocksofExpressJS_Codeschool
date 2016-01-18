var express = require('express');
var app = express();

app.get('/', function(request, response){
	//The following write 'Hello World' using node api
	response.write('Hello world');
	response.end();
	//This could also be done using express api as below
	//response.send('Hello world');
});

app.get('/blocks', function(request, response){
	
	response.redirect(301, '/parts');
	
	// Example 1 with array
	/*
	var blocks = ['Fixed','Movable','Rotating'];
	// The following code will convert the blocks array to JSON and create the correct headers
	// In order to see headers type 'curl -i http://localhost:3000/blocks'
	//response.send(blocks);
	
	// The following code is the same as send for objects and arrays
	response.json(blocks);
	*/
	
	
	// Example 2 with strings
	/*
	var blocks = '<ul><li>Fixed</li><li>Movable</li></ul>';
	// The send function will convert strings to HTML
	response.send(blocks);
	*/
});

app.listen(3000, function(){
	console. log('Listening on port 3000');	
});