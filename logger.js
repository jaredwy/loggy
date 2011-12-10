
var Logger = function(logLevel) {
	this._logLevel = logLevel || Logger.level.all;
	this._error = [];
	this._warn = [];
	this._debug = [];
	this._log = [];
	this._initLogger();
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
		console.log = logger('log',this._log);
		console.warn = logger('warn',this._warn);
		console.error = logger('error',this._error);
		console.debug = logger('debug',this._debug);


		function logger(name,storage) {
			return function() {
				if(that._logLevel & Logger.level[name] ) {
					loggers[name].apply(console,arguments);
					persistArguments(arguments,storage);
				}
			}
		}

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