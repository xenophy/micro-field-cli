/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controller.config.Main

CLI.define('MicroField.controller.config.Main', {

    // {{{ requires

    requires: [
        'MicroField.config.Config'
    ],

    // }}}
    // {{{ extend

    extend: 'MicroField.controller.Controller',

    // }}}
    // {{{ run

    run: function() {

        var me      = this,
            args    = me.argv,
            config  = MicroField.config.Config;

            console.log(args);

        CLI.iterate(config.getParams(), function(param) {

            if (args[param]) {
                config['set' + CLI.String.capitalize(param)](args[param]);
            }

        });

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
