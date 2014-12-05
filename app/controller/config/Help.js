/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controler.config.Help

CLI.define('MicroField.controller.config.Help', {

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
            f('{0}Options{1}', underline, reset),
            f('  * --{0}accessToken{1} - *****', bold, reset),
            f('  * --{0}releasesUrl{1} - *****', bold, reset),
            f('  * --{0}archiveUrl{1} - *****', bold, reset),
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
