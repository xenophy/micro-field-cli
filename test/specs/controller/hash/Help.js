/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * This file is part of MicroField CLI
 */

// {{{ helper

require('../../../helper.js');

// }}}
// {{{ microfield help hash

describe("microfield help hash", function() {

    // {{{ stdout

    it("stdout", function(next) {

        execChildProcess('node bin/index.js help hash', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            var comp = [
                'MicroField CLI v{0}'.bold,
                '',
                'microfield hash'.yellow,
                'This category contains various commands for hash genetation.',
                'To hash needs string.',
                '',
                'Syntax'.underline,
                '  microfield hash --target=[filepath] --secret=[secret]',
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
