/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controler.get.Help

CLI.define('MicroField.controller.get.Help', {

    // {{{ extend

    extend: 'MicroField.Help',

    // }}}
    // {{{ config

    config: {

        // {{{ commands

        commands: [{
            tag     : 'siesta-lite',
            text    : 'Get Siesta Lite from Bryntum Site'
        }, {
            tag     : 'siesta-extjs',
            text    : 'Get Ext JS for Siesta Lite\'s Harness from CDN'
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
