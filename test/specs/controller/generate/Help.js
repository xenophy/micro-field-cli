/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * This file is part of MicroField CLI
 */

// {{{ helper

require('../../../helper.js');

// }}}
// {{{ microfield help generate

describe("microfield help generate", function() {

    // {{{ stdout

    it("stdout", function(next) {

        execChildProcess('node bin/index.js help generate', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            var comp = [
                'MicroField CLI v{0}'.bold,
                '',
                'microfield generate'.yellow,
                'This category contains various commands for module template setup.',
                '',
                'Commands'.underline,
                '  * {1}: Generates a simple header module',
                '  * {2}: Generates a simple footer module',
                '  * {3}: Generates a tree panel based navigation module',
                '  * {4}: Generates a tree panel based navigation module for tablet',
                '  * {5}: Generates a plain module',
                '  * {6}: Generates a edit pattern module. This pattern is edit and save, depends on user\'s id',
                '  * {7}: Generates a editlist pattern module. This pattern have "list screen" and "edit screen',
                '',
                'Options'.underline,
                '  * {8}: Do not create database table when generate',
                '  * {9}: Specify custom table name when generate',
                '',
                'Syntax'.underline,
                '  microfield generate [command] [Module Path] [Options]',
                '',
                '  {10}microfield generate edit MyApp/Edit --table=myedit',
                '',
                ''
            ].join("\n");

            comp = CLI.String.format(
                comp,
                MicroField.manifest.version,
                tagSpacer('header').bold.blue,
                tagSpacer('footer').bold.blue,
                tagSpacer('navigation').bold.blue,
                tagSpacer('tabletnavigation').bold.blue,
                tagSpacer('base').bold.blue,
                tagSpacer('edit').bold.blue,
                tagSpacer('editlist').bold.blue,
                tagSpacer('--nodb').bold.blue,
                tagSpacer('--table').bold.blue,
                'Example: '.blue
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
