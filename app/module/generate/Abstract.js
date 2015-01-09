/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.generate.Abstract

CLI.define('MicroField.module.generate.Abstract', {

    // {{{ extend

    extend: 'MicroField.Base',

    // }}}
    // {{{ requires

    requires: [
        'MicroField.database.Manager'
    ],

    // }}}
    // {{{ mixins

    mixins: [
        'CLI.mixin.Ansi'
    ],

    // }}}
    // {{{ execute

    execute: CLI.emptyFn,

    // }}}
    // {{{ config

    config: {

        // {{{ appSettings

        appSettings: {},

        // }}}
        // {{{ tableStructure

        tableStructure: {}

        // }}}

    },

    // }}}
    // {{{ getTplDirectory

    getTplDirectory: function() {

        var path = require('path');

        return CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), '.microfield', 'tpl', CLI.getClassName(this).split('.').pop()));

    },

    // }}}
    // {{{ getDestDirectory

    getDestDirectory: function(o) {

        var path = require('path');

        return CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), 'mods', o.ns, o.dir));

    },

    // }}}
    // {{{ getData

    getData: function(o) {

        var tmp = CLI.apply(o, {
            lns         : o.ns.toLowerCase(),
            lname       : o.name.toLowerCase(),
            sname       : o.sname.toLowerCase(),
            generator   : MicroField.app.getSign()
        });

        if (this.getTableName) {
            tmp['tableName'] = o.table || this.getTableName();
        }

        return tmp;

    },

    // }}}
    // {{{ existsModuleDirectory

    existsModuleDirectory: function(modPath, callback) {

        var me      = this,
            fs      = require('fs'),
            path    = require('path'),
            target  = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), 'mods', modPath));

        fs.exists(target, function(exists) {
            callback(exists);
        });

    },

    // }}}
    // {{{ copyTemplates

    copyTemplates: function(target, destdir, callback) {

        var fs          = require('fs'),
            path        = require('path'),
            recursive   = require('recursive-readdir');

        recursive(target, function (err, files) {

            var items = [];

            CLI.iterate(files, function(src) {
                src = path.relative(MicroField.app.getApplicationDir(), src);
                items.push([src, path.relative(MicroField.app.getApplicationDir(), path.join(destdir, path.relative(target, src)))]);
            });

            // ファイルコピー
            MicroField.app.copyFiles(items, function(src, dest) {

                // [INF] copied: ***************
                MicroField.app.log.info('copied: ' + src);

            }, function(count) {

                callback();

            });

        });

    },

    // }}}
    // {{{ replaceTemplates

    replaceTemplates: function(target, data, callback) {

        var ECT         = require('ect'),
            async       = require('async'),
            fs          = require('fs'),
            recursive   = require('recursive-readdir');

        recursive(target, function (err, files) {

            var renderer = ECT({ root : '/' }),
                fns = [];

            CLI.iterate(files, function(filename) {

                fns.push((function(filename, text) {

                    return function(cb) {

                        fs.writeFile(filename, text, function() {

                            // [INF] replaced: ***************
                            MicroField.app.log.info('replaced: ' + filename);

                            cb();

                        });

                    };

                })(filename, renderer.render(filename, data || {})));


            });

            // 非同期実行開始
            async.series(fns, function() {
                callback();
            });

        });

    },

    // }}}
    // {{{ setupTables

    setupTables: function(options, callback) {

        var me      = this,
            fs      = require('fs'),
            path    = require('path'),
            async   = require('async'),
            f       = CLI.String.format,
            skip    = false,
            fns, conn;

        options = options || {};

        // データベース接続設定
        dbconf = me.getAppSettings()['database']['default'];

        // コネクションラッパー取得
        conn = MicroField.database.Manager.getConnection(dbconf);

        // スキーマ取得
        schema = MicroField.database.Manager.getSchema(
            dbconf,
            {
                cls     : CLI.getClassName(me).split('.').pop(),
                table   : options.table || me.getTableName()
            }
        );

        fns = [

            // 接続
            function(next) {

                if (!skip) {

                    conn.connect(schema, next);

                } else {

                    next();

                }

            },

            // テーブル存在確認
            function(next) {

                if (!skip) {

                    conn.existsTable(function(err, exists) {

                        if (err || exists) {
                            skip = true;
                        }

                        next();

                    });

                } else {

                    next();

                }

            },

            // テーブル生成
            function(next) {

                if (!skip) {

                    conn.createTable(function(err) {

                        if (err) {
                            skip = true;
                        }

                        next();

                    });

                } else {

                    next();

                }

            },

            // 初期データ挿入
            function(next) {

                if (!skip) {

                    conn.insertData(function(err) {

                        if (err) {
                            skip = true;
                        }

                        next();

                    });

                } else {

                    next();

                }

            },

            // 切断
            function(next) {

                conn.disconnect(next);

            }

        ];

        // 非同期処理実行開始
        async.waterfall(fns, function(err) {
            callback();
        });

    },

    // }}}
    // {{{ displayErrors

    displayErrors: function(type, o) {

        var me      = this,
            f       = CLI.String.format,
            bold    = me.ansi.bold;

        if (type === 'exists') {

            MicroField.app.log.error(f('Could not generate "{0}" directory, that is already exists.', o.modPath.bold));

        }

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
