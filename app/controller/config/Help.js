/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controler.config.Help

CLI.define('MicroField.controller.config.Help', {

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
        text += underline('Options') + "\n";
        text += f('  * --{0} - *****', bold('accessToken')) + "\n";
        text += f('  * --{0} - *****', bold('releasesUrl')) + "\n";
        text += f('  * --{0} - *****', bold('archiveUrl')) + "\n";

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
