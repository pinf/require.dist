
const ASSERT = require("assert");
const PATH = require("path");
const FS = require("fs-extra");
const BROWSERIFY = require("browserify");


const SUITE_NAME = "Embed-Browserify-Simple";
const SUITE_RESULT_PATH = PATH.join(__dirname, "../TestResults", SUITE_NAME);

if (!FS.existsSync(SUITE_RESULT_PATH)) FS.mkdirsSync(SUITE_RESULT_PATH);


describe(SUITE_NAME, function () {

    it('Embed-Simple' , function (callback) {

        var stream = FS.createWriteStream(PATH.join(__dirname, "../TestResults", SUITE_NAME, "bundle.js"));
        stream.on('error', callback);
        stream.on('close', function () {

            var result = require(
                PATH.join(__dirname, "../TestResults", SUITE_NAME, "bundle.js")
            )();

            if (result["#Components/Simple"]) {
                ASSERT.equal(result["#Components/Simple"].name, "Simple");
                ASSERT.equal(typeof result["#Components/Simple"].init, "function");
                ASSERT.equal(result["#Components/Simple"].init(SUITE_NAME) === SUITE_NAME, true);
            }

            callback(null);
            return;
        });

        BROWSERIFY({
            "standalone": "exports"
        })
        .on('error', callback)
        .add(PATH.join(__dirname, "../UseCases/Embed.js"))
        .transform(require("../Adapters/Browserify")())
        .bundle()
        .pipe(stream);
    });

});
