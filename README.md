require.dist
=============

[![Build Status](https://secure.travis-ci.org/pinf/require.dist.png)](https://travis-ci.org/pinf/require.dist)


`require.dist` is a module that patches the `require` given to your module by the NodeJS module system.

It adds the method `require.dist(uri, mappings)` which you can use to inline asset bundles.

Instead of inlining the whole bundle there is an option to keep the bundle separate and only inline a reference to it.

Code processing and runtime modules are available to provide a complete minimal `require.dist` experience.


Install
-------

    npm install require.dist


Usage
-----

`package.json`

    {
        "name": "test"
    }

`main.js`

    require("require.dist")(require);

    var bundle = require.dist("./bundle.uic");

Run:

    $ node main.js


Provenance
==========

Original source logic under [Free Public License](https://opensource.org/licenses/FPL-1.0.0) by [Christoph Dorn](http://christophdorn.com/)
