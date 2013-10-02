
/*
 * GET home page.
 */

var Snippet = require("../models/snippet.js");

exports.index = function(req, res){
	res.render('index', {});
};

exports.list = function(req, res){
	Snippet.find(function (err, snippets) {
		if (err){ 
			console.error("Failed to find all snippet");
			res.send();

		}else{
			console.log(snippets);
			res.send(snippets);
		}	
	});
};

exports.upload = function(req, res){
	if(req.body.snippet){
		console.log("saving new snippet: [" + req.body.snippet + "]");

		var snippet = new Snippet({ body: req.body.snippet });
		snippet.save();
	
	}else{
		console.log("failed to find req.body.snippet");
	}
	res.redirect('/');
};