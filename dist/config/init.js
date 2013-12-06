'use strict';

var path = require('path');
var init = function(app,express,appconfig){
	// this.app = app;
	// this.express = express;
	// this.appconfig = appconfig;
	console.log("appconfig",appconfig);
	var useSessions = function(){
		if(appconfig.settings.get('sessions:enabled')){
			if(appconfig.settings.get('sessions:type')==="mongo"){
				var mongo = require('./mongo'),
					MongoStore = require('connect-mongo')(express),
					express_session_config = {
					secret:'hjoiuu87go9hui',
					maxAge: new Date(Date.now() + 3600000),
					store: new MongoStore(
						{url:mongo[app.get('env')].url},
						function(err){
							if(!err){
								// logger.error(err || 'connect-mongodb setup ok possibly');
								// logger.silly('connect-mongodb setup ok possibly');
								console.log("ok mongo");
							}
						})
					};
				app.use(express.session(express_session_config));
			}
			else{
				app.use(express.session());
			}
		}
	},userAuth = function(){
		if(appconfig.settings.get('userauth:enabled')){
			if(appconfig.settings.get('userauth:rememberme')){
				// Remember Me middleware
				app.use(function(req, res, next) {
				    if (req.method === 'POST' && req.url === '/login') {
						if (req.body.rememberme) {
							req.session.cookie.maxAge = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days
						} else {
							req.session.cookie.expires = false;
						}
				    }
				    next();
				});
			}
			if(appconfig.settings.get('userauth:passport')){
				var passport = require('passport'),
					LocalStrategy = require('passport-local').Strategy;
				app.use(passport.initialize());
				app.use(passport.session());
			}
		}
	}, serverStatus = function(){
		console.log('Express server listening on port ' + app.get('port'));
		console.log('Running in environment: '+app.get('env'));
	};


	this.staticCaching = function(){
		return this._staticCaching();
	};

	return{
		useSessions:useSessions,
		userAuth:userAuth,
		serverStatus:serverStatus
	};
};


init.prototype._staticCaching = function(){
	console.log("in staticCaching");
	if(this.app.get('env') === 'development'){
		console.log("use dev static");
		this.app.use(this.express.static(path.join(__dirname, 'public')));
	}
	else{
		this.app.use(this.express.static(path.join(__dirname, 'public'),{maxAge: 86400000}));
	}
};

module.exports = init;

/*
return{
		staticCaching : function(){
			if(app.get('env') === 'development'){
				app.use(express.static(path.join(__dirname, 'public')));
			}
			else{
				app.use(express.static(path.join(__dirname, 'public'),{maxAge: 86400000}));
			}
		},
		useSessions: function(){
			if(appconfig.settings.get('sessions:enabled')){
				if(appconfig.settings.get('sessions:type')==="mongo"){
					var mongo = require('./mongo'),
						MongoStore = require('connect-mongo')(express),
						express_session_config = {
						secret:'hjoiuu87go9hui',
						maxAge: new Date(Date.now() + 3600000),
						store: new MongoStore(
							{url:mongo[app.get('env')].url},
							function(err){
								if(!err){
									// logger.error(err || 'connect-mongodb setup ok possibly');
									// logger.silly('connect-mongodb setup ok possibly');
									console.log("ok mongo");
								}
							})
						};
					app.use(express.session(express_session_config));
				}
				else{
					app.use(express.session());
				}
			}
		},
		userAuth: function(){
			if(appconfig.settings.get('userauth:enabled')){
				if(appconfig.settings.get('userauth:rememberme')){
					// Remember Me middleware
					app.use(function(req, res, next) {
					    if (req.method === 'POST' && req.url === '/login') {
							if (req.body.rememberme) {
								req.session.cookie.maxAge = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days
							} else {
								req.session.cookie.expires = false;
							}
					    }
					    next();
					});
				}
				if(appconfig.settings.get('userauth:passport')){
					var passport = require('passport'),
						LocalStrategy = require('passport-local').Strategy;
					app.use(passport.initialize());
					app.use(passport.session());
				}
			}
		},
		serverStatus: function(){
			console.log('Express server listening on port ' + app.get('port'));
			console.log('Running in environment: '+app.get('env'));
		}
	};
*/