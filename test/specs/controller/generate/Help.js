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
                '  * {8}: Sets custom screen name',
                '  * {9}: Do not create database table when generate',
                '  * {10}: Sets custom table name when generate',
                '',
                'Syntax'.underline,
                '  microfield generate [command] [Module Path] [Options]',
                '',
                '  {11}microfield generate edit MyApp/Edit --table=myedit',
                '',
                ''
            ].join("\n");

            comp = CLI.String.format(
                comp,                                       // {0}
                MicroField.manifest.version,                // {1}
                tagSpacer('header').bold.blue,              // {2}
                tagSpacer('footer').bold.blue,              // {3}
                tagSpacer('navigation').bold.blue,          // {4}
                tagSpacer('tabletnavigation').bold.blue,    // {5}
                tagSpacer('base').bold.blue,                // {6}
                tagSpacer('edit').bold.blue,                // {7}
                tagSpacer('editlist').bold.blue,            // {8}
                tagSpacer('--name').bold.blue,              // {9}
                tagSpacer('--nodb').bold.blue,              // {10}
                tagSpacer('--table').bold.blue,             // {11}
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
