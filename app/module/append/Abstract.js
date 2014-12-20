/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.append.Abstract

CLI.define('MicroField.module.append.Abstract', {

    // {{{ requires

    requires: [
        'MicroField.database.Manager',
        'MicroField.module.Parser',
        'MicroField.module.alter.Table'
    ],

    // }}}
    // {{{ mixins

    mixins: [
        'CLI.mixin.Ansi'
    ],

    // }}}
    // {{{ config

    config: {

        // {{{ filenames

        filenames: {

            // {{{ items

            items: null,

            // }}}
            // {{{ serverscript

            serverscript: null

            // }}}

        },

        // }}}
        // {{{ items

        items: null,

        // }}}
        // {{{ tableName

        tableName: null,

        // }}}
        // {{{ ns

        ns: null,

        // }}}
        // {{{ name

        name: null,

        // }}}
        // {{{ fieldType

        fieldType: null,

        // }}}
        // {{{ fieldName

        fieldName: null

        // }}}

    },

    // }}}
    // {{{ constructor

    constructor: function(config) {

        var me  = this;

        me.initConfig(config);
        me.callParent(arguments);
    },

    // }}}
    // {{{ execute

    execute: CLI.emptyFn,

    // }}}
    // {{{ init

    init: function(callback) {

        var me          = this,
            filenames   = me.getFilenames(),
            async       = require('async'),
            fs          = require('fs'),
            path        = require('path'),
            parser      = MicroField.module.Parser,
            fns, target;

        fns = [

            // {{{ items解析

            function(next) {

                target = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), 'mods', me.getNs(), me.getName(), filenames.items));

                // ファイル読み込み
                fs.readFile(target, function(err, data) {

                    obj = parser.getClassConfig(parser.removeComment(data.toString()))
                    me.setItems(obj.config.items);
                    next();

                });

            },

            // }}}
            // {{{ テーブル名解析

            function(next) {

                target = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), 'mods', me.getNs(), me.getName(), filenames.serverscript));

                // ファイル読み込み
                fs.readFile(target, function(err, data) {

                    var m = parser.removeComment(data.toString()).match(/public(.*)\$table(.?)=(.?)['"]+(.*)+['"];/);

                    me.setTableName(m[4]);

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

        var me      = this,
            exists  = false;

        CLI.iterate(me.getItems(), function(item) {
            if (item.name === me.name) {
                exists = true;
            }
        });

        callback(exists);

    },

    // }}}
    // {{{ alterTable

    alterTable: function(callback) {

        var me = this;

        // テーブル変更クラス生成/実行
        CLI.create('MicroField.module.alter.Table', {

            // テーブル名
            tableName   : me.getTableName(),

            // フィールド名
            fieldName   : me.getFieldName(),

            // フィールド型
            fieldType   : me['get' + CLI.String.capitalize(me.getFieldType())]().fieldtype

        }).append(callback);

    },

    // }}}
    // {{{ alterServerScript

    alterServerScript: function(callback) {

        var me = this;

        // サーバーサイドスクリプト変更クラス生成/実行
        CLI.create('MicroField.module.alter.ServerScript', {

            // スクリプト名
            scriptName  : me.getFilenames().serverscript,

            // フィールド名
            fieldName   : me.getFieldName(),

            // 名前空間
            ns          : me.getNs(),

            // モジュール名
            name        : me.getName()

        }).append(callback);

    },

    // }}}
    // {{{ alterClientScript

    alterClientScript: function(callback) {

        var me = this;

        // クライアントサイドスクリプト変更クラス生成/実行
        CLI.create('MicroField.module.alter.ClientScript', {

            // スクリプト名
            scriptName  : me.getFilenames().items,

            // フィールド名
            fieldName   : me.getFieldName(),

            // xtype
            xtype       : me['get' + CLI.String.capitalize(me.getFieldType())]().xtype,

            // 名前空間
            ns          : me.getNs(),

            // モジュール名
            name        : me.getName()

        }).append(callback);

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
