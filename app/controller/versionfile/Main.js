/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controller.versionfile.Main

CLI.define('MicroField.controller.versionfile.Main', {

    // {{{ requires

    requires: [
        'MicroField.upgrade.VersionFile'
    ],

    // }}}
    // {{{ extend

    extend: 'MicroField.controller.Controller',

    // }}}
    // {{{ run

    run: function() {

        // execute generate versionfile process
        MicroField.upgrade.VersionFile.execute();

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
