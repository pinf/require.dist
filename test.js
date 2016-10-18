
const ASSERT = require("assert");

require("./")(require);


function main(callback) {
	try {

// TODO: ...

		return callback(null);

	} catch(err) {
		return callback(err);
	}
}


main(function(err) {
	if (err) {
		console.error(err.stack);
		process.exit(1);
	}
	console.log("OK");
	process.exit(0);
});
