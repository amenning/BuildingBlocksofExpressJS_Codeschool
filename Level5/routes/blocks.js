var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
//The code below forces the use of the native querystring Node library
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var blocks = {
	'Fixed': 'Fastened securely in position',
	'Movable': 'Capable of being moved',
	'Rotating': 'Moving in a circle around its center'
};

router.route('/')
	.get(function(request, response){
		if(request.query.limit >= 0){
			response.json(Object.keys(blocks).slice(0,request.query.limit));
		}else{	
			response.json(Object.keys(blocks));
		}
	})
	.post(parseUrlencoded, function(request, response){
		var newBlock = request.body;
		var formattedBlockName = newBlock.name[0].toUpperCase() + newBlock.name.slice(1).toLowerCase();
		blocks[formattedBlockName] = newBlock.description;
	
		response.status(201).json(formattedBlockName);
	});

router.route('/:name')
	.all(function(request, response, next){
		var name = request.params.name;
		var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
		request.blockName = block;
		next();
	})
	.get(function(request, response){
		var description = blocks[request.blockName];
		if(!description){
			response.status(404).json('No description found for ' + request.params.name);
		}else{
			response.json(description);
		}
	})
	.delete(function(request, response){
		delete blocks[request.blockName];
		response.sendStatus(200); //Automatically sets response body to "OK"; many packages, such as jQuery, cannot handle responses with empty bodies
	});

module.exports = router;