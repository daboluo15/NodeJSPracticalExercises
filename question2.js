function remoteMathService(cb) {
	var one;
	var two;
	var async = require('async');
	var calls = [];
	
	calls.push(function(callback) {
		callOneService(function(err, num) {
			if (err) {
				console.log("error in call one service");
			} else {
				one = num;
				console.log("in calloneservice, one = ", one);
			}
			callback();
		});		
	});
	
	calls.push(function(callback) {
		callTwoService(function(err, num) {
			if (err) {

			} else {
				two = num;
				console.log("in calloneservice, two = ", two);
			}
			callback();
		});
	});

	async.parallel(calls, function(err, result) {
		if (err) {
			return console.log(err);
		} else {
			return cb(undefined, one + two);
		}
	});
	

}
function callOneService(cb) {
	setTimeout(function() {
		return cb(undefined, 1);
	}, 1000);
}
function callTwoService(cb) {
	setTimeout(function() {
		return cb(undefined, 2);
	}, 1500);
}
remoteMathService(function(err, answer) {
	if (err) { 
		console.log("error ", err);
		return;
	} else {
		if (answer !== 3) {
			console.log("wrong answer", answer);
		} else {
			console.log("correct");
		}
	}
});