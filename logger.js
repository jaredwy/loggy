"use strict";
var Logger = function(logLevel) {
	this.logLevel = logLevel;
	this._initLogger();
	this._error = [];
	this._warn = [];
	this._debug = [];
	this._log = [];
}

Logger.prototype = {
	_initLogger : function() {
		//stash the old function
		var loggers = {};
		loggers.log = console.log;
		loggers.warn = console.warn;
		loggers.debug = console.debug;
		loggers.error = console.error;
		//set up loggers
		console.log = log;
		console.warn = warn;
		console.error = error;
		console.debug = debug;

		//repacment functions
		//since there seems to be no way to walk the stack anymore
		function log() {
			loggers.log.apply(console,arguments);
		};
		function warn() {
			loggers.warn.apply(console,arguments);	
		};
		function debug() {
			loggers.debug.apply(console,arguments);
		};
		function error() {
			loggers.error.apply(console,arguments);
		};

	},
	setLogLevel : function(logLevel) {
		this.logLevel = logLevel;
	}
}