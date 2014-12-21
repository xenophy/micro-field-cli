/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.Manager

CLI.define('MicroField.module.Manager', {

    // {{{ extend

    extend: 'MicroField.Base',

    // }}}
    // {{{ requires

    requires: [
        'MicroField.module.Parser'
    ],

    // }}}
    // {{{ singleton

    singleton: true,

    // }}}
    // {{{ config

    config: {

        // {{{ classes

        classes: {
            edit        : 'Edit',
            editlist    : 'EditList'
        }

        // }}}

    },

    // }}}
    // {{{ getList

    getList: function(callback) {

        var me          = this,
            async       = require('async'),
            fs          = require('fs'),
            path        = require('path'),
            recursive   = require('recursive-readdir'),
            modroot     = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), 'mods')),
            mods        = [],
            fns         = [];

        recursive(modroot, function (err, files) {

            CLI.iterate(files, function(file) {

                fns.push((function(file) {

                    return function(next) {

                        if (path.basename(file) === 'module.json') {

                            mods.push(path.relative(path.join(MicroField.app.getApplicationDir(), 'mods'), path.dirname(file)));

                        }
                        next();

                    };

                })(file));

            });

            async.series(fns, function() {

                // コールバック実行
                callback(mods);

            });

        });

    },

    // }}}
    // {{{ getInfo

    getInfo: function(modPath, callback) {

        var me      = this,
            fs      = require('fs'),
            path    = require('path'),
            target  = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), 'mods', modPath, 'module.json'));

        fs.readFile(target, function(err, data) {
            callback(CLI.decode(MicroField.app.removeComment(data.toString()), true));
        });

    },

    // }}}
    // {{{ getConfigOptions

    getConfigOptions: function(modPath, callback) {

        var me      = this,
            async   = require('async'),
            fs      = require('fs'),
            path    = require('path'),
            parser  = MicroField.module.Parser,
            skips   = {},
            fns, obj, target;

        // Editビュー解析
        target = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), 'mods', modPath, '/app/view/edit/Edit.js'));

        fns = [

            function(next) {

                fs.exists(target, function(exists) {

                    if (!exists) {
                        skips.editview = true;
                    } else {
                        skips.editview = false;
                    }

                    next();

                });

            },

            function(next) {

                if (!skips.editview) {

                    fs.readFile(target, function(err, data) {

                        obj = parser.getClassConfig(parser.removeComment(data.toString()))

                        next();

                    });

                } else {
                    next();
                }


            }

        ];

        // 非同期処理実行
        async.series(fns, function() {

            // コールバック実行
            callback(obj);

        });

    },

    // }}}
    // {{{ getFieldTypes

    getFieldTypes: function(type, modPath, callback) {

        var me          = this,
            async       = require('async'),
            fs          = require('fs'),
            parser      = MicroField.module.Parser,
            classes     = me.getClasses(),
            skip        = false,
            fns, types;

        // メインコントローラークラスファイルパス取得
        target = me.getMainViewControllerPath(modPath);

        fns = [

            // {{{ ファイル存在確認

            function(next) {

                fs.exists(target, function(exists) {

                    if (!exists) {

                        skip = true;

                        // TODO: エラー表示

                    }

                    next();

                });

            },

            // }}}
            // {{{ メインコントローラークラス解析/クラス生成/実行

            function(next) {

                if (!skip) {

                    fs.readFile(target, function(err, data) {

                        obj = parser.getClassConfig(parser.removeComment(data.toString()));

                        var cls = CLI.create('MicroField.module.append.' + classes[obj.extend.split('.')[2]], {
                        });

                        types = cls.getFieldTypes();

                        next();

                    });

                }

            }

            // }}}

        ];

        /// 非同期処理実行
        async.series(fns, function() {

            // コールバック実行
            callback(types);

        });

    },

    // }}}
    // {{{ getMainViewControllerPath

    getMainViewControllerPath: function(modPath) {

        var me      = this,
            path    = require('path');

        return CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), 'mods', modPath, '/app/view/main/MainController.js'));

    },

    // }}}
    // {{{ append

    append: function(o, callback) {

        var me          = this,
            async       = require('async'),
            fs          = require('fs'),
            parser      = MicroField.module.Parser,
            modPath     = o.modPath,
            fieldType   = o.fieldType,
            fieldName   = o.fieldName,
            modNs       = modPath.split('/')[0],
            modName     = modPath.split('/')[1],
            classes     = me.getClasses(),
            skip        = false,
            fns;

        // メインコントローラークラスファイルパス取得
        target = me.getMainViewControllerPath(modPath);

        fns = [

            // {{{ ファイル存在確認

            function(next) {

                fs.exists(target, function(exists) {

                    if (!exists) {

                        skip = true;

                        // TODO: エラー表示

                    }

                    next();

                });

            },

            // }}}
            // {{{ メインコントローラークラス解析/クラス生成/実行

            function(next) {

                if (!skip) {

                    fs.readFile(target, function(err, data) {

                        obj = parser.getClassConfig(parser.removeComment(data.toString()));

                        CLI.create('MicroField.module.append.' + classes[obj.extend.split('.')[2]], {
                            ns          : modNs,
                            name        : modName,
                            fieldType   : fieldType,
                            fieldName   : fieldName
                        }).execute(next);

                    });

                }

            }

            // }}}

        ];

        /// 非同期処理実行
        async.series(fns, function() {

            // コールバック実行
            callback();

        });

    },

    // }}}
    // {{{ remove

    remove: function() {


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
