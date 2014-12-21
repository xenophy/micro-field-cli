/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.profile.Profile

CLI.define('MicroField.profile.Profile', {

    // {{{ extend

    extend: 'MicroField.Base',

    // }}}
    // {{{ requires

    requires: [
        'MicroField.module.Manager'
    ],

    // }}}
    // {{{ mixins

    mixins: [
        'CLI.mixin.Ansi'
    ],

    // }}}
    // {{{ singleton

    singleton: true,

    // }}}
    // {{{ showModuleList

    showModuleList: function(json) {

        var me          = this,
            f           = CLI.String.format,
            async       = require('async'),
            manager     = MicroField.module.Manager,
            infos       = [],
            fns         = [],
            bold        = me.ansi.bold,
            underline   = me.ansi.underline,
            green       = me.colors.green,
            text        = '';

        // モジュール一覧取得
        manager.getList(function(list) {

            CLI.iterate(list, function(modPath) {

                fns.push((function(modPath) {

                    return function(next) {
                        manager.getInfo(modPath, function(info) {

                            // module.json情報取得
                            info.path = modPath;
                            infos.push(info);

                            next();
                        });
                    };

                })(modPath));

            });

            // 非同期実行開始
            async.series(fns, function() {

                if (!json) {

                    text += MicroField.app.getTitle();
                    text += "\n";

                    text += "--------------------------------------------------------------------------------\n";

                    CLI.iterate(infos, function(info) {

                        text += "[ " + bold(info.path) + " ]\n";
                        text += "\n";

                        CLI.iterate(info, function(key, val) {

                            if (key !== 'path') {

                                if (CLI.isArray(val) && val.length > 0) {

                                    var tab = "\t";

                                    if (key.length < 8) {
                                        tab += "\t";
                                    }
                                    text += f("{0}{1}:", green(key), tab);

                                    CLI.iterate(val, function(item, i) {

                                        if (i > 0) {
                                            text += "\t\t ";
                                        }

                                        if (key === 'views' || key === 'controllers') {

                                            item = info.path.replace(/\//g, ".") + '.' + item;

                                        }

                                            text += f(" {0}\n", item);

                                    });

                                } else if (CLI.isString(val)) {

                                    text += f("{0}\t\t: {1}\n", green(key), val);

                                }

                            }

                        });

                        text += "--------------------------------------------------------------------------------\n";

                    });

                    CLI.log(text);

                } else {

                    CLI.log(CLI.encode(infos));

                }

            });

        });

    },

    // }}}
    // {{{ showModuleInfo

    showModuleInfo: function(target, json) {

        var me          = this,
            f           = CLI.String.format,
            async       = require('async'),
            manager     = MicroField.module.Manager,
            infos       = [],
            fns      = [],
            bold        = me.ansi.bold,
            underline   = me.ansi.underline,
            green       = me.colors.green,
            yellow      = me.colors.yellow,
            text        = '';

        manager.getInfo(target, function(info) {

            manager.getConfigOptions(target, function(co) {

                if (!json) {

                    text += MicroField.app.getTitle();
                    text += "\n";

                    text += "--------------------------------------------------------------------------------\n";
                    text += "[ " + bold(target) + " ]\n";
                    text += "\n";
                    text += underline('Edit form fields') + "\n";
                    text += "\n";

                    CLI.iterate(co.config.items, function(comp) {

                        text += " * " + bold(comp.name) + "(" + green(comp.xtype) + ")\n";

                    });

                    text += "\n";
                    text += "--------------------------------------------------------------------------------\n";

                    CLI.log(text);

                } else {

                    CLI.log(CLI.encode(co.config.items));

                }

            });

        });

    },

    // }}}
    // {{{ execute

    execute: function(target, json) {

        var me = this;

        if (target.toLowerCase() === 'list') {
            me.showModuleList(json);
            return;
        }

        me.showModuleInfo(target, json);

    }

    // }}}

});

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
