
/*
 * GET home page.
 */

var Snippet = require("../models/snippet.js");
var hljs = require('highlight.js');

exports.partials = function(req, res){
  var filename = req.params.filename;
  if(!filename) return;  // might want to change this
  res.render("partials/" + filename );
};


exports.index = function(req, res){
	res.render('index', {});
};

exports.list = function(req, res){
	Snippet.find({}).sort('field -date').execFind(function (err, snippets) {
		if (err){ 
			console.error("Failed to find all snippet");
			res.send();

		}else{
			console.info(snippets);
			res.send(snippets);
		}	
	});
};

exports.create = function(req, res){
	if(req.body.body){
		console.log("saving new snippet.body: [" + req.body.body + "]");

		var snippet = new Snippet({ body: req.body.body });
		snippet.save();
	
	}else{
		console.log("failed to find req.body.snippet");
	}
	res.redirect('/');
};


exports.delete = function(req, res){
	if(req.params.id){
		console.log("deleting snippet _id: [" + req.params.id + "]");

		var snippet = Snippet({ _id: req.params.id });
		snippet.remove();
	
	}else{
		console.log("failed to find req.params.id");
	}
	res.redirect('/');
};