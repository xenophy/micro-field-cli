/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controler.remove.Help

CLI.define('MicroField.controller.remove.Help', {

    // {{{ extend

    extend: 'MicroField.controller.Controller',

    // }}}
    // {{{ run

    run: function() {

        var me          = this,
            f           = CLI.String.format,
            bold        = me.ansi.bold,
            underline   = me.ansi.underline,
            green       = me.colors.green,
            text        = '';

        text += MicroField.app.getTitle();
        text += "\n";

        text += "This command removes a exists component in already exists module.\n";
        text += "\n";
        text += underline('Syntax') + "\n";
        text += " microfield remove [itemid] [target module]\n";
        text += "\n";
        text += f("  {0} microfield remove text1 MyApp/Edit\n", green('ex:'));

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
