/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controler.get.Help

CLI.define('MicroField.controller.get.Help', {

    // {{{ extend

    extend: 'MicroField.controller.Controller',

    // }}}
    // {{{ run

    run: function() {

        var me          = this,
            f           = CLI.String.format,
            bold        = me.ansi.bold,
            underline   = me.ansi.underline,
            text        = '';

        text += MicroField.app.getTitle();
        text += "\n";
        text += underline('Commands') + "\n";
        text += f('  * {0} - Get Siesta Lite from Bryntum', bold('siesta-lite')) + "\n";
        text += f('  * {0} - Get Ext JS for Siesta Lite\'s Harness from CDN', bold('siesta-extjs')) + "\n";

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
