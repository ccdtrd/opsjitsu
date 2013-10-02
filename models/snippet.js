


var mongoose = require('mongoose');
var SnippetSchema = mongoose.Schema({
    	body: String
});

module.exports = mongoose.model('Snippet', SnippetSchema); 