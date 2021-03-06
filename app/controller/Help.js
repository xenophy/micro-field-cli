/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controler.Help

CLI.define('MicroField.controller.Help', {

    // {{{ extend

    extend: 'MicroField.Help',

    // }}}
    // {{{ config

    config: {

        // {{{ categories

        categories: [{
            tag     : 'append',
            text    : 'Append field to specified module'
        }, {
            tag     : 'config',
            text    : 'Load a properties file or sets a configuration property'
        }, {
            tag     : 'generate',
            text    : 'Genarate module template'
        }, {
            tag     : 'get',
            text    : 'Get packages from internet'
        }, {
            tag     : 'help',
            text    : 'Displays help for commands'
        }, {
            tag     : 'profile',
            text    : 'Displays about already exists module status'
        }, {
            tag     : 'remove',
            text    : 'Remove field from specified module'
        }],

        // }}}
        // {{{ commands

        commands: [{
            tag     : 'setup',
            text    : 'Executes the setup process for an application'
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
