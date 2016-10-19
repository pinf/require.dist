require.dist
=============

[![Build Status](https://secure.travis-ci.org/pinf/require.dist.png)](https://travis-ci.org/pinf/require.dist)

`require.dist` provides a mechanism to inline an asset within a module by embedding
the asset itself or a reference to it for on-demand loading at runtime.

API
---

```
require.dist(id [, mappings])
```
  * `id` - A CommonJS/NodeJS style module ID
  * `mappings` - Optional alias to URI mappings to resolve aliased module IDs


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

`ComponentReference` will either return the embedded asset or load the asset based
on an embedded reference depending on which mode the source code was built in.

See `./UseCases` for more examples and `./Adapters` on how to replace
`require.dist` calls at source code bundling time using various
build frameworks.

To make `require.dist` available in NodeJS directly use:
```
require("require.dist")(require);
```


Provenance
==========

Original source logic under [Free Public License](https://opensource.org/licenses/FPL-1.0.0) by [Christoph Dorn](http://christophdorn.com/)
