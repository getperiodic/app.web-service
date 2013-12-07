'use strict';
var sampleSharedVar = "sfh";
var home = require('../controller/home')(sampleSharedVar);

exports = module.exports = function(app){
	app.get('/',home.index);
	// app.get('/page',home.page);
};