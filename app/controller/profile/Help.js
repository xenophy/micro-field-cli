/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controler.profile.Help

CLI.define('MicroField.controller.profile.Help', {

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
        text += underline('microfield profile') + "\n";
        text += "\n";
        text += f('This command displays about already exists module status.') + "\n";
        text += "\n";
        text += underline('Commands') + "\n";
        text += f('  * {0} - Displays module list', bold('list')) + "\n";
        text += "\n";
        text += underline('Options') + "\n";
        text += f('  * {0} - Output json format', bold('--json')) + "\n";
        text += "\n";
        text += underline('Syntax') + "\n";
        text += f('  microfield profile [ModuleName]') + "\n";

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
