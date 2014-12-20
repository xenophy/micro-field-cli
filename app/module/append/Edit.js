/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.append.Edit

CLI.define('MicroField.module.append.Edit', {

    // {{{ extend

    extend: 'MicroField.module.append.Abstract',

    // }}}
    // {{{ config

    config: {

        // {{{ filenames

        filenames: {

            // {{{ items

            items: 'app/view/edit/Edit.js',

            // }}}
            // {{{ serverscript

            serverscript: 'classes/Users.php'

            // }}}

        },

        // }}}
        // {{{ fieldTypes

        fieldTypes: [
            'textfield'
        ],

        // }}}
        // {{{ textfield

        textfield: {

            // {{{ xtype

            xtype: 'textfield',

            // }}}
            // {{{ fieldtype

            fieldtype: 'varchar(255)'

            // }}}

        }

        // }}}

    },

    // }}}
    // {{{ execute

    execute: function(callback) {

        var me      = this,
            async   = require('async'),
            fs      = require('fs'),
            path    = require('path'),
            parser  = MicroField.module.Parser,
            skip    = false,
            fns;

        fns = [

            // {{{ 初期化

            function(next) {
                me.init(next);
            },

            // }}}
            // {{{ name重複チェック

            function(next) {
                me.duplicatecheck(function(duplicate) {

                    if (duplicate) {

                        skip = true;

                        // TODO: エラーメッセージ


                    }

                    next();

                });
            },

            // }}}
            // {{{ テーブルにフィールド追加

            function(next) {
                if (!skip) {
                    me.alterTable(next);
                }
            },

            // }}}
            // {{{ サーバーサイドスクリプトにフィールド追加

            function(next) {
                if (!skip) {
                    me.alterServerScript(next);
                }
            },

            // }}}
            // {{{ クライアントサイドスクリプトにフィールド追加

            function(next) {
                if (!skip) {
                    me.alterClientScript(next);
                }
            }

            // }}}

        ];

        // 非同期処理実行
        async.series(fns, function() {

            // コールバック実行
            callback();

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
