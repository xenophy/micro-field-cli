/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controller.upgrade.Main

CLI.define('MicroField.controller.upgrade.Main', {

    // {{{ requires

    requires: [
        'MicroField.upgrade.Upgrade'
    ],

    // }}}
    // {{{ extend

    extend: 'MicroField.controller.Controller',

    // }}}
    // {{{ run

    run: function() {

        // execute upgrade process
        MicroField.upgrade.Upgrade.execute();

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
