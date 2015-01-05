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

        execChildProcess('node bin/index.js hash --target=package.json --secret=MicroFieldCLITest', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // バージョンにより変わるので、その都度修正
            assert.equal(stdout, 'b9983915fb17b1d24863530f7dd86c03b7691e06c98c5cb594f0710f96810a43' + "\n");

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
