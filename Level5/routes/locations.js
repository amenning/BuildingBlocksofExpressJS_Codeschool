var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
//The code below forces the use of the native querystring Node library
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var locations = {
	'Fixed': 'First floor',
	'Movable': 'Second floor',
	'Rotating': 'Penthouse'
};

router.route('/:name')
	.all(function(request, response, next){
		var name = request.params.name;
		var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
		request.blockName = block;
		next();
	})
	.get(function(request, response){
		var description = locations[request.blockName];
		if(!description){
			response.status(404).json('No description found for ' + request.params.name);
		}else{
			response.json(description);
		}
	})
	.delete(function(request, response){
		delete locations[request.blockName];
		response.sendStatus(200); //Automatically sets response body to "OK"; many packages, such as jQuery, cannot handle responses with empty bodies
	});

module.exports = router;