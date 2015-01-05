/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * This file is part of MicroField CLI
 */


// {{{ helper

require('../../helper.js');

// }}}
// {{{ assert

var assert = require('power-assert');

// }}}
// {{{ colors

var colors = require('colors');

// }}}
// {{{ microfield help

describe("microfield help", function() {

    // {{{ stdout

    it("stdout", function(next) {

        execChildProcess('node bin/index.js', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            var comp = [
                'MicroField CLI v{0}'.bold,
                '',
                'Categories'.underline,
                '  * {1}: Append field to specified module',
                '  * {2}: Load a properties file or sets a configuration property',
                '  * {3}: Genarate module template',
                '  * {4}: Get packages from internet',
                '  * {5}: Displays help for commands',
                '  * {6}: Displays about already exists module status',
                '  * {7}: Remove field from specified module',
                '',
                'Commands'.underline,
                '  * {8}: Executes the setup process for an application',
                '',
                ''
            ].join("\n");

            comp = CLI.String.format(
                comp,
                MicroField.manifest.version,
                tagSpacer('append').bold.blue,
                tagSpacer('config').bold.blue,
                tagSpacer('generate').bold.blue,
                tagSpacer('get').bold.blue,
                tagSpacer('help').bold.blue,
                tagSpacer('profile').bold.blue,
                tagSpacer('remove').bold.blue,
                tagSpacer('setup').bold.blue
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
