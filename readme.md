# Loggy

Loggy is a simple javascript framework for logging using the usual console.log functions. It provides logging levels and the ability to persist the logs. It assumes you have a console.

## Usage
	var logger = new Logger();
	console.log("I did something");
	console.error("error")

You can set a log level either through the constructor (the default is all)

	var logger = new Logger(Logger.level.warn);
	console.log("I did something"); //Wont output
	logger.setLogLevel(Logger.level.warn | Logger.level.log);
	console.log("I did something"); // will now output

You can also access what was outputted through 'private variables' that match the output types name

	logger._error 

This will return an array of everything outputted, this is the reason i created this library. Needed a way to pull output from Webdriver while managing logging levels for production.
