/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.alter.Table

CLI.define('MicroField.module.alter.Table', {

    // {{{ extend

    extend: 'MicroField.module.alter.Abstract',

    // }}}
    // {{{ config

    config: {

        // {{{ tableName

        tableName: {}

        // }}}

    },

    // }}}
    // {{{ addField

    /**
     * フィールド挿入メソッド
     */
    addField: function(callback) {

        var me          = this,
            async       = require('async'),
            fs          = require('fs'),
            path        = require('path'),
            f           = CLI.String.format,
            appdir      = MicroField.app.getApplicationDir(),
            rmc         = MicroField.app.removeComment,
            ns          = me.getNs(),
            name        = me.getName(),
            fieldName   = me.getFieldName(),
            fieldType   = me.getFieldType(),
            script      = me.getFilenames().serverscript,
            classes     = me.getClasses(),
            connInfo    = me.getAppSettings()['database']['default'],
            skip        = false,
            afterfield, tplCls, fns;

        // テンプレート情報クラス生成
        tplCls = CLI.create(f('MicroField.module.append.{0}.{1}', me.getTplType().toLowerCase(), classes[fieldType]), {});

        // コネクションラッパー取得
        conn = MicroField.database.Manager.getConnection(connInfo);

        fns = [

            // {{{ テーブル名解析

            function(next) {

                target = path.join(appdir, 'mods', ns, name, script);

                // ファイル読み込み
                fs.readFile(target, function(err, data) {

                    var m = rmc(data.toString()).match(/public(.*)\$table(.?)=(.?)['"]+(.*)+['"];/);

                    // TODO: エラー処理：見つからなかったとき

                    me.setTableName(m[4]);

                    next();

                });

            },

            // }}}
            // {{{ 接続

            function(next) {

                // TODO: エラー処理：接続できなかったとき

                if (!skip) {
                    conn.connect(next);
                } else {
                    next();
                }

            },

            // }}}
            // {{{ 挿入先フィールド名取得

            function(next) {

                var sql = f('SHOW COLUMNS FROM `{0}`', me.getTableName());

                conn.query(sql, function(err, columns) {

                    // TODO: エラー処理: クエリーエラー、テーブルが見つからなかった時

                    var pos = false;

                    // modifiedの前のカラム名を取得
                    CLI.iterate(columns, function(col, i) {
                        if (col.Field === 'modified') {
                            pos = i-1;
                        }
                    });

                    afterfield = columns[pos].Field;
                    next();

                });
            },

            // }}}
            // {{{ フィールド挿入

            function(next) {

                var sql = [
                    'ALTER TABLE',
                    '    `{0}`',
                    'ADD',
                    '    `{1}` {2} NOT NULL',
                    'AFTER',
                    '    `{3}`'
                ].join("\n");

                sql = f(sql, me.getTableName(), fieldName, tplCls.getColumnType()[connInfo.driver.toString()], afterfield);

                conn.query(sql, function(err) {

                    // TODO: エラー処理：フィールドの追加に失敗したとき

                    next();
                });

            },

            // }}}
            // {{{ 切断

            function(next) {
                conn.disconnect(next);
            }

            // }}}

        ];

        // 非同期処理実行開始
        async.series(fns, function(err) {
            callback();
        });

    },

    // }}}
    // {{{ append

    append: function(callback) {

        var me      = this,
            async   = require('async'),
            fns;

        fns = [

            // {{{ アプリケーション設定取得

            function(next) {

                MicroField.app.getSettings(function(settings) {
                    me.setAppSettings(settings);
                    next();
                });

            },

            // }}}
            // {{{ フィールド挿入

            function(next) {
                me.addField(function() {
                    next();
                });
            }

            // }}}

        ];

        // 非同期処理実行
        async.series(fns, function() {

            // コールバック実行
            callback();

        });

    },

    // }}}
    // {{{ duplicatecheck

    duplicatecheck: function(callback) {

        var me          = this,
            async       = require('async'),
            fs          = require('fs'),
            path        = require('path'),
            f           = CLI.String.format,
            appdir      = MicroField.app.getApplicationDir(),
            rmc         = MicroField.app.removeComment,
            ns          = me.getNs(),
            name        = me.getName(),
            fieldName   = me.getFieldName(),
            fieldType   = me.getFieldType(),
            script      = me.getFilenames().serverscript,
            classes     = me.getClasses(),
            skip        = false,
            exists      = false,
            bold        = me.ansi.bold,
            connInfo, conn, tplCls, fns;

        fns = [

            // {{{ アプリケーション設定取得

            function(next) {

                MicroField.app.getSettings(function(settings) {

                    // アプリケーション設定取得/設定
                    me.setAppSettings(settings);

                    // コネクション情報取得
                    connInfo = me.getAppSettings()['database']['default'];

                    // テンプレート情報クラス生成
                    tplCls = CLI.create(f('MicroField.module.append.{0}.{1}', me.getTplType().toLowerCase(), classes[fieldType]), {});

                    // コネクションラッパー取得
                    conn = MicroField.database.Manager.getConnection(connInfo);

                    next();
                });

            },

            // }}}
            // {{{ テーブル名解析

            function(next) {

                target = path.join(appdir, 'mods', ns, name, script);

                // ファイル読み込み
                fs.readFile(target, function(err, data) {

                    var m = rmc(data.toString()).match(/public(.*)\$table(.?)=(.?)['"]+(.*)+['"];/);

                    // TODO: エラー処理：見つからなかったとき

                    me.setTableName(m[4]);

                    next();

                });

            },

            // }}}
            // {{{ 接続

            function(next) {

                // TODO: エラー処理：接続できなかったとき

                if (!skip) {
                    conn.connect(next);
                } else {
                    next();
                }

            },

            // }}}
            // {{{ 挿入先フィールド名取得

            function(next) {

                var sql = f('SHOW COLUMNS FROM `{0}`', me.getTableName());

                conn.query(sql, function(err, columns) {

                    // TODO: エラー処理: クエリーエラー、テーブルが見つからなかった時


                    // modifiedの前のカラム名を取得
                    CLI.iterate(columns, function(col, i) {

                        if (col.Field === fieldName) {

                            exists = true;

                            MicroField.app.log.error(f(
                                '"{0}.{1}" already exists in database table.',
                                bold(me.getTableName()),
                                bold(me.getFieldName())
                            ));

                        }

                    });

                    next();

                });
            },

            // }}}
            // {{{ 切断

            function(next) {
                conn.disconnect(next);
            }

            // }}}

        ];

        // 非同期処理実行
        async.series(fns, function() {

            // コールバック実行
            callback(exists);

        });

    },

    // }}}
    // {{{ remove

    remove: CLI.emptyFn

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
