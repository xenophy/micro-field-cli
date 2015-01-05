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
// {{{ microfield help setup

describe("microfield help setup", function() {

    // {{{ stdout

    it("stdout", function(next) {

        execChildProcess('node bin/index.js help setup', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            var comp = [
                'MicroField CLI v{0}'.bold,
                '',
                'microfield setup'.yellow,
                'This command builds the current application.',
                '',
                '',
                ''
            ].join("\n");

            comp = CLI.String.format(
                comp,
                MicroField.manifest.version
            );

            assert.equal(stdout, comp);

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
