'use strict';
var path = require('path'),
	periodic = require('../helpers/periodic.controller'),
	sampledata = require('../resources/sample/sampledata'),
	controller_resource=false;

var index = function(req, res, next){
	var pageData = {
		title: 'Home page',
		page: {name:'home'},
		user: req.user,
		headerjs: ["/scripts/home-index.js"]
	};
	res.set('Cache-Control','max-age=900, public');
	res.render('home/index', pageData);
};

var controller = function(resource){
	controller_resource= resource;

	return{
		index: index
		// page: page
	};
};

module.exports = controller;
