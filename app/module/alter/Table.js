/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.alter.Table

CLI.define('MicroField.module.alter.Table', {

    // {{{ extend

    extend: 'MicroField.module.alter.Abstract',

    // }}}
    // {{{ config

    config: {

        // {{{ tableName

        tableName: {},

        // }}}
        // {{{ fieldName

        fieldName: {},

        // }}}
        // {{{ fieldType

        fieldType: {}

        // }}}

    },

    // }}}
    // {{{ addField

    /**
     * フィールド挿入メソッド
     */
    addField: function(callback) {

        var me      = this,
            async   = require('async'),
            fs      = require('fs'),
            path    = require('path'),
            f       = CLI.String.format,
            parser  = MicroField.module.Parser,
            skip    = false,
            afterfield, fns;

        // コネクションラッパー取得
        conn = MicroField.database.Manager.getConnection(me.getAppSettings()['database']['default']);

        fns = [

            // {{{ 接続

            function(next) {

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

                    // TODO: エラー処理

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

                sql = f(sql, me.getTableName(), me.getFieldName(), me.getFieldType(), afterfield);

                conn.query(sql, function(err) {

                    // TODO: エラー処理

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
            fs      = require('fs'),
            path    = require('path'),
            parser  = MicroField.module.Parser,
            skip    = false,
            fieldname, fns;

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
