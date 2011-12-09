
var Logger = function(logLevel) {
	this._logLevel = logLevel || Logger.level.all;
	this._initLogger();
	this._error = [];
	this._warn = [];
	this._debug = [];
	this._log = [];
}

Logger.prototype = {
	_initLogger : function() {
		var that = this;
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
			if(that._logLevel & Logger.level.log ) {
				loggers.log.apply(console,arguments);
				persistArguments(arguments,that._log);
			}
		};
		function warn() {
			if(that._logLevel & Logger.level.warn ) {
				loggers.warn.apply(console,arguments);	
				persistArguments(arguments,that._warn);
			}
			
		};
		function debug() {
			if(that._logLevel & Logger.level.debug ) {
				loggers.debug.apply(console,arguments);
				persistArguments(arguments,that._debug);
			}
		};
		function error() {
			if(that._logLevel & Logger.level.error ) {
				loggers.error.apply(console,arguments);
				persistArguments(arguments,that._error);
			}
		};

		function persistArguments(args,logStorage) {
			args = Array.prototype.slice.call( args, 0 );
			for(var i = 0; i < args.length; i++) {
				logStorage.push(args[i]);
			}
		}
	},
	setLogLevel : function(logLevel) {
		this._logLevel = logLevel;
	}
}

Logger.level = {
  off : 0,
  log: 1,
  debug: 2,
  warn: 4,
  error: 8,
  all: 15
}