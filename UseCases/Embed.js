
module.exports = function () {

    var ComponentReference = require.dist("../Components/Simple.js");

    return ComponentReference().then(function (Component) {

        return {
            "#Components/Simple": Component
        };
    });
}
