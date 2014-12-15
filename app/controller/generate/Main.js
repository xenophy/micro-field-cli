/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controller.generate.Main

CLI.define('MicroField.controller.generate.Main', {

    // {{{ requires

    requires: [
        'MicroField.module.generate.Base'
    ],

    // }}}
    // {{{ extend

    extend: 'MicroField.controller.Controller',

    // }}}
    // {{{ config

    config: {

        // {{{ commands

        commands: [
            'header',
            'footer',
            'navigation',
            'base',
            'edit',
            'editlist'
        ]

        // }}}

    },

    // }}}
    // {{{ run

    run: function(command, modPath) {

        var me      = this,
            modNs   = modPath.split('/')[0],
            modName = modPath.split('/')[1],
            modDir  = modPath.split('/')[1];

        if (me.argv.name) {
            modName = me.argv.name;
        }

        if (!CLI.Array.contains(me.getCommands(), command)) {
            CLI.create('MicroField.controller.generate.Help').run();
            return;
        }

        if (!modPath) {
            CLI.create('MicroField.controller.generate.Help').run();
            return;
        }

        if (modPath.split('/').length !== 2) {
            CLI.create('MicroField.controller.generate.Help').run();
            return;
        }

        command = CLI.String.capitalize(command);

        CLI.create('MicroField.module.generate.' + command).execute({
            ns      : modNs,
            name    : modName,
            path    : modPath,
            dir     : modDir
        }, function() {

        });

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
