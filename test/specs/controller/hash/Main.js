/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * This file is part of MicroField CLI
 */


// {{{ helper

require('../../../helper.js');

// }}}
// {{{ assert

var assert = require('power-assert');

// }}}
// {{{ colors

var colors = require('colors');

// }}}
// {{{ microfield hash

describe("microfield hash", function() {

    // {{{ generate hash

    it("generate hash", function(next) {

        execChildProcess('node bin/index.js hash --target=app/controller/hash/Main.js --secret=MicroFieldCLITest', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // app/controller/hash/Main.js のソースが変化したら修正
            assert.equal(stdout, '2d89c3722d5f5daeafa6650478e94a7784a512abf0a4a89b534d412990a4ec47' + "\n");

            next();

        });

    });

    // }}}
    // {{{ json format

    /*
    it("json format", function() {
    });
   */

    // }}}

});

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
