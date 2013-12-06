'use strict';

var home = require('../controller/home');

exports = module.exports = function(app){
	app.get('/',home.index);
	app.get('/page',home.page);
};