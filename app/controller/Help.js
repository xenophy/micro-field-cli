/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controler.Help

CLI.define('MicroField.controller.Help', {

    // {{{ extend

    extend: 'MicroField.controller.Controller',

    // }}}
    // {{{ run

    run: function() {

        var me          = this,
            app         = MicroField.getApplication(),
            f           = CLI.String.format,
            bold        = me.ansi.bold,
            underline   = me.ansi.underline,
            text        = '';

        text += app.getTitle();
        text += underline('Commands') + "\n";
        text += f('  * {0} - Load a properties file or sets a configuration property', bold('config')) + "\n";
        text += f('  * {0} - Displays help for commands', bold('help')) + "\n";

        CLI.log(text);

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
