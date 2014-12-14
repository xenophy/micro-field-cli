/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controler.hash.Help

CLI.define('MicroField.controller.hash.Help', {

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
        text += "This category contains various commands for hash genetation.\n";
        text += "To hash needs string.\n";
        text += "\n";
        text += "  microfield hash --target=[filepath] --secret=[secret]\n";

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
