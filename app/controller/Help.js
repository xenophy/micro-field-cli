/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controler.Help

CLI.define('MicroField.controller.Help', {

    // {{{ extend

    extend: 'MicroField.controller.Controller',

    // }}}
    // {{{ run

    run: function() {

        var me          = this,
            f           = CLI.String.format,
            ansies      = me.ansies,
            bold        = ansies.bold,
            underline   = ansies.underline,
            reset       = ansies.reset;


        CLI.log([
            me.getTitle(),
            '',
//            f('{0}Categories{1}', underline, reset),
//            '',
            f('{0}Commands{1}', underline, reset),
            f('  * {0}config{1} - Load a properties file or sets a configuration property', bold, reset),
            f('  * {0}help{1} - Displays help for commands', bold, reset),
            ''
        ].join("\n"));

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
