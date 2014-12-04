/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.Help

CLI.define('MicroField.Help', {

    // {{{ extend

    extend: 'CLI.app.Help',

    // }}}
    // {{{ run

    run: function() {

        CLI.log([
            'MicroField',
            '',
            '  usage: myapp help',
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
