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
            tag     : 'config',
            text    : 'Load a properties file or sets a configuration property'
        }, {
            tag     : 'get',
            text    : 'Get packages from internet'
        }, {
            tag     : 'help',
            text    : 'Displays help for commands'
        }],

        // }}}
        // {{{ commands

        commands: [{
            tag     : 'setup',
            text    : 'Executes the setup process for an application'
        }, {
            tag     : 'profile',
            text    : 'Displays about already exists module status'
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
