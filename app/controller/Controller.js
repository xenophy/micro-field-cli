/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controller.Controller

CLI.define('MicroField.controller.Controller', {

    // {{{ extend

    extend: 'CLI.app.Controller',

    // }}}
    // {{{ getTitle

    getTitle: function() {

        var me      = this,
            ansies  = me.ansies,
            ver     = CLI.getVersion('MicroField').version,
            f       = CLI.String.format,
            text;

        text = [
            f('{0}MicroField CLI v{2}{1}', ansies.bold, ansies.reset, ver)
        ].join("\n");







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
