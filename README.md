require.dist
=============

[![Build Status](https://secure.travis-ci.org/pinf/require.dist.png)](https://travis-ci.org/pinf/require.dist)

`require.dist` provides a mechanism to inline an asset within a module by embedding
the asset itself or a reference to it for on-demand loading at runtime.


Install
-------

    npm install require.dist

    npm test


Usage
=====

***Component.js***
```
exports.name = "Component";
```

***main.js***
```
    var ComponentReference = require.dist("./Component.js");

    ComponentReference().then(function (Component) {

        ASSERT.equal(Component.name, "Component");
    });
```

`ComponentReference` will either return embedded asset or load asset based
on embedded reference depending on which mode the source code was built in.

For more examples see `./UseCases`.


Provenance
==========

Original source logic under [Free Public License](https://opensource.org/licenses/FPL-1.0.0) by [Christoph Dorn](http://christophdorn.com/)
