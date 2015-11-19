// doThing() defined elsewhere

function doThing(callback) {
	// Switch the following two lines to test the error and normal cases
	//callback(new Error('something bad happened'));
	callback(null, 33);
}

function foo(callback) {
	doThing(function(err, res) {
		if (err) {
			callback(err);
		} else {
			callback(null, res);
		}
	});
}

foo(function(err, res){
	if (err) {
		console.log("error: ", err);
	} else {
		console.log('Done!', res);
	}
});