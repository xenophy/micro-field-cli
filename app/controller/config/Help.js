/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controler.config.Help

CLI.define('MicroField.controller.config.Help', {

    // {{{ extend

    extend: 'MicroField.Help',

    // }}}
    // {{{ config

    config: {


    },

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
        text += underline('Options') + "\n";
        text += f('  * --{0} - Sets the access token for MicroField repository', bold('accessToken')) + "\n";
        text += f('  * --{0} - Sets the Ext JS SDK directory path', bold('extPath')) + "\n";
        text += f('  * --{0} - Sets the release url for MicroField repository', bold('releasesUrl')) + "\n";
        text += f('  * --{0} - Sets the archive url for MicroField repository', bold('archiveUrl')) + "\n";

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
