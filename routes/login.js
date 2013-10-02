/*
* Login Page.
*/

var Kitten = require("../models/kitten.js");

exports.index = function(req, res){
	var silence = new Kitten({ name: 'Silence' })
	console.log(silence.name); // 'Silence'

	// silence.save();

	Kitten.find(function (err, kittens) {
		if (err) console.error(kittens);
		// console.log(kittens);
		res.send(kittens);
	});
};