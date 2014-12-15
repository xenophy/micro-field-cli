/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controller.profile.Main

CLI.define('MicroField.controller.profile.Main', {

    // {{{ requires

    requires: [
        'MicroField.profile.Profile'
    ],

    // }}}
    // {{{ extend

    extend: 'MicroField.controller.Controller',

    // }}}
    // {{{ run

    run: function(target) {

        if (!target) {

            CLI.create('MicroField.controller.profile.Help').run();
            return;

        }

        MicroField.profile.Profile.execute(target, this.argv.json ? true : false);

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
