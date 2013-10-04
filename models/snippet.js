


var mongoose = require('mongoose');
var SnippetSchema = mongoose.Schema({
    	body: String,
    	date: { type: Date, default: Date.now },
    	language: String
});

module.exports = mongoose.model('Snippet', SnippetSchema); 