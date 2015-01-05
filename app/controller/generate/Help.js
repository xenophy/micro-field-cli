/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controler.generate.Help

CLI.define('MicroField.controller.generate.Help', {

    // {{{ extend

    extend: 'MicroField.Help',

    // }}}
    // {{{ config

    config: {

        // {{{ title

        title: 'microfield generate',

        // }}}
        // {{{ desc

        desc: 'This category contains various commands for module template setup.',

        // }}}
        // {{{ commands

        commands: [{
            tag     : 'header',
            text    : 'Generates a simple header module'
        }, {
            tag     : 'footer',
            text    : 'Generates a simple footer module'
        }, {
            tag     : 'navigation',
            text    : 'Generates a tree panel based navigation module'
        }, {
            tag     : 'navigation',
            text    : 'Generates a tree panel based navigation module'
        }, {
            tag     : 'tabletnavigation',
            text    : 'Generates a tree panel based navigation module for tablet'
        }, {
            tag     : 'base',
            text    : 'Generates a plain module'
        }, {
            tag     : 'edit',
            text    : 'Generates a edit pattern module. This pattern is edit and save, depends on user\'s id'
        }, {
            tag     : 'editlist',
            text    : 'Generates a editlist pattern module. This pattern have "list screen" and "edit screen'
        }],

        // }}}
        // {{{ opts

        opts: [{
            tag     : '--nodb',
            text    : 'Do not create database table when generate'
        }, {
            tag     : '--table',
            text    : 'Specify custom table name when generate'
        }],

        // }}}
        // {{{ syntax

        syntax: [{
            text: [
                'microfield generate [command] [Module Path] [Options]',
                '',
                '  Example: microfield generate edit MyApp/Edit --table=myedit',
            ].join("\n")
        }]

        // }}}

    }

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
