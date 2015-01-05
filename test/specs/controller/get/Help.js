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
// {{{ microfield help get

describe("microfield help get", function() {

    // {{{ stdout

    it("stdout", function(next) {

        execChildProcess('node bin/index.js help get', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            var comp = [
                'MicroField CLI v{0}'.bold,
                '',
                'microfield get'.yellow,
                'This category contains various commands for get packages from internet.',
                '',
                'Commands'.underline,
                '  * {1}: Get Siesta Lite from Bryntum Site',
                '  * {2}: Get Ext JS for Siesta Lite\'s Harness from CDN',
                '',
                ''
            ].join("\n");

            comp = CLI.String.format(
                comp,
                MicroField.manifest.version,
                tagSpacer('siesta-lite').bold.blue,
                tagSpacer('siesta-extjs').bold.blue
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
