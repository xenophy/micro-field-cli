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
// {{{ microfield help profile

describe("microfield help profile", function() {

    // {{{ stdout

    it("stdout", function(next) {

        execChildProcess('node bin/index.js help profile', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            var comp = [
                'MicroField CLI v{0}'.bold,
                '',
                'microfield profile'.yellow,
                'This command displays about already exists module status.',
                '',
                'Commands'.underline,
                '  * {1}: Displays module list',
                '',
                'Options'.underline,
                '  * {2}: Output json format',
                '',
                'Syntax'.underline,
                '  microfield profile [ModuleName] or "list"',
                '',
                ''
            ].join("\n");

            comp = CLI.String.format(
                comp,
                MicroField.manifest.version,
                tagSpacer('list').bold.blue,
                tagSpacer('--json').bold.blue
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
