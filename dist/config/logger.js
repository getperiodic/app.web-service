'use strict';

var winston = require('winston');
	// events = require('events'),
	// util = require('util');
// console.log("logger env: ",process.env.NODE_ENV)
var logger = new (winston.Logger)({
	transports:[
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'logs/app.log'})
	]
});

// util.inherits(config,events.EventEmitter);

// logger.prototype._another = function(options){
// };
module.exports = logger;