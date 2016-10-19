
const PATH = require("path");
const LODASH = require("lodash");
const THROUGH = require("through2");
const Promise = require("bluebird");
const RESOLVE = require("resolve");
const REGEXP_ESCAPE = require("escape-regexp");
RESOLVE.async = Promise.promisify(RESOLVE);
const FS = require("fs");
Promise.promisifyAll(FS);


module.exports = function (options) {
    options = options || {};

    function findInlineDeclarations (sourceCode) {
        var declarations = [];
        var re = /require\.dist\s*\(\s*["']([^"']+)["']\s*(?:,\s*([\S\s]+?)\s*)?\)/g;
        var match = null;
        while ( (match = re.exec(sourceCode)) ) {
            (function build (match) {

                var mappings = {};
                // TODO: Let resolver find implementation for extension and let
                //       concrete implementation parse options.
                if (match[2]) {
                    try {
                        LODASH.merge(mappings, JSON.parse(match[2]));
                    } catch (err) {
                        throw new Error("Error parsing 'require.dist' options '" + match[2] + "' for uri '" + match[1] + "'!");
                    }
                }

                declarations.push({
                    replace: new RegExp(REGEXP_ESCAPE(match[0]), "g"),
                    id: match[1],
                    mappings: mappings
                });

            })(match);
        }
        return declarations;
    }

    function resolveSourcePath (basePath, id) {
        return Promise.try(function () {

            if (/^\./.test(id)) {
                return PATH.join(basePath, id);
            }

            // TODO: Resolve mappings.

            return RESOLVE.async(id, {
                basedir: basePath
            });
        });
    }

    return function (file) {

        return THROUGH(function (buffer, enc, callback) {

            var stream = this;

            var sourceCode = buffer.toString();

            var basePath = PATH.dirname(file);
            var inlineDeclarations = findInlineDeclarations(sourceCode);

            return Promise.map(inlineDeclarations, function (inlineDeclaration) {

                return resolveSourcePath(basePath, inlineDeclaration.id).then(function (rootSourcePath) {

                    // Announce that this file was used.
                    stream.emit('file', rootSourcePath);

                    return FS.readFileAsync(rootSourcePath, "utf8").then(function (inlineBundle) {

                        // TODO: Embed without messing up indentation.
                        sourceCode = sourceCode.replace(
                            inlineDeclaration.replace,
                            [
                                '(function () {',
                                'var exports = {};',
                                inlineBundle,
                                'return {',
                                '  "then": function (handler) { return handler(exports); },',
                                '  "catch": function () {}',
                                ' };',
                                '})'
                            ].join("\n")
                        );

                        return null;
                    });
                });
            }).then(function () {

                stream.push(sourceCode);

                callback(null);
                return;
            }).catch(callback);
        });
    };
};
