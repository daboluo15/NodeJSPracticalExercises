// This is a mock database implementation with just a connect function
// db.connect will need to be called a total of 10 times before it successfully connects
var counter = 0;

var db = {
	connect: function(cb) {
		console.log('connection attempt', counter + 1);
		if (counter < 9) {
			counter++;
			return cb('db not ready yet');
		}
		return cb();
	}
};

var backoff = require('backoff');

var exponentialBackoff = backoff.exponential({
	initialDelay: 10
});

exponentialBackoff.failAfter(9);


// Try to connect, log a successful connection & exit
// If we fail to connect, log an error and return
exponentialBackoff.on('ready', function(number, delay) {
	console.log('After ' + delay + 'ms:');
	db.connect(function(err) {
		if (err) {
			console.error(err);
			return;
		}
		console.log('successfully connected!');
		counter++;
	});
	exponentialBackoff.backoff();
});

exponentialBackoff.backoff();

