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
// {{{ microfield help config

describe("microfield help config", function() {

    // {{{ stdout

    it("stdout", function(next) {

        execChildProcess('node bin/index.js help config', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            var comp = [
                'MicroField CLI v{0}'.bold,
                '',
                'microfield config'.yellow,
                'Management MicroField CLI configuration.',
                '',
                'Options'.underline,
                '  * {1}: Sets the access token for MicroField repository',
                '  * {2}: Sets the setup domain',
                '  * {3}: Sets the Ext JS SDK directory path',
                '  * {4}: Sets the release url for MicroField repository',
                '',
                ''
            ].join("\n");

            comp = CLI.String.format(
                comp,
                MicroField.manifest.version,
                tagSpacer('--accessToken').bold.blue,
                tagSpacer('--domain').bold.blue,
                tagSpacer('--extPath').bold.blue,
                tagSpacer('--releasesUrl').bold.blue
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
