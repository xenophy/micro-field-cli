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
            name    : 'tabletnavigation',
            cls     : 'TabletNavigation'
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

        var me          = this;

        // modPath 入力チェック
        if (!modPath) {
            CLI.create('MicroField.controller.generate.Help').run();
            return;
        }

        // modPath 入力形式チェック
        if (modPath.split('/').length !== 2) {
            CLI.create('MicroField.controller.generate.Help').run();
            return;
        }

        // 入力コマンドチェック
        if (!me.findCommand(command)) {
            CLI.create('MicroField.controller.generate.Help').run();
            return;
        }

        // 任意のスクリーン名設定
        if (me.argv.name) {
            modScreen = me.argv.name;
        }

        var modNs       = modPath.split('/')[0],
            modName     = modPath.split('/')[1],
            modScreen   = modPath.split('/')[1],
            modDir      = modPath.split('/')[1];

        // 生成処理
        CLI.create('MicroField.module.generate.' + me.findCommand(command).cls).execute({
            ns      : modNs,
            name    : modName,
            sname   : modScreen,
            path    : modPath,
            dir     : modDir,
            nodb    : me.argv.nodb
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
