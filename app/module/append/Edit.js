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






//        console.log(o);

//        console.log(me['get' + CLI.String.capitalize(o.fieldType)]().xtype);

/*
 *
 *
        checkDuplicateName: function(cb) {

            var me      = this,
                err     = Cmd.classes['Ext.cmd.append.Error'],
                exists  = false;

            Ext.iterate(me.getItems(), function(item) {
                if (item.name === me.name) {
                    exists = true;
                }
            });

            if (exists) {

                // エラー出力
                err.output(
                    err.ERR_DUPLICATE_ITEMID,
                    {
                        itemId  : me.name,
                        xtype   : me.xtype
                    }
                );


            } else {

                // コールバック実行
                cb();

            }

        }p
 *
 *
             var me              = this,
                args            = Cmd.opts.args(),
                itemId          = args[3],
                target          = args[4],
                help            = me.help;

            // name重複チェック
            me.checkDuplicateName(function() {

                // テーブルにフィールド追加
                me.alter.table.append(function() {

                    // サーバーサイドにフィールド追加
                    me.alter.server.append(function() {

                        // itemsにアイテム追加
                        me.alter.items.append(function() {

                            // コールバック実行
                            cb();

                        });

                    });

                });

            });
*/



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
