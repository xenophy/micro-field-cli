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

        commands: [{
            name    : 'header',
            cls     : 'Header'
        }, {
            name    : 'footer',
            cls     : 'Footer'
        }, {
            name    : 'navigation',
            cls     : 'Navigation'
        }, {
            name    : 'base',
            cls     : 'Base'
        }, {
            name    : 'edit',
            cls     : 'Edit'
        }, {
            name    : 'editlist',
            cls     : 'EditList'
        }]

        // }}}

    },

    // }}}
    // {{{ findCommand

    findCommand: function(command) {

        var me = this;

        return CLI.Array.findBy(me.getCommands(), function(item) {

            if (item.name === command) {
                return true;
            }

            return false;

        });

    },

    // }}}
    // {{{ run

    run: function(command, modPath) {

        var me          = this,
            modNs       = modPath.split('/')[0],
            modName     = modPath.split('/')[1],
            modScreen   = modPath.split('/')[1],
            modDir      = modPath.split('/')[1];

        if (me.argv.name) {
            modScreen = me.argv.name;
        }

        if (!me.findCommand(command)) {
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

        CLI.create('MicroField.module.generate.' + me.findCommand(command).cls).execute({
            ns      : modNs,
            name    : modName,
            sname   : modScreen,
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
