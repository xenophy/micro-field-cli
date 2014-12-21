/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.append.EditList

CLI.define('MicroField.module.append.EditList', {

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

            serverscript: 'classes/Lists.php'

            // }}}

        },

        // }}}
        // {{{ fieldTypes

        fieldTypes: [
            'checkboxfield',
            'combobox',
            'datefield',
            'htmleditor',
            'numberfield',
            'textarea',
            'textfield',
            'timefield',
            'triggerfield'
        ]

        // }}}

    },

    // }}}
    // {{{ execute

    execute: function(callback) {

        var me      = this,
            async   = require('async'),
            skip    = false,
            fns;

        /*
            // name重複チェック
            me.checkDuplicateName(function() {

                // テーブルにフィールド追加
                me.alter.table.append(function() {

                    // サーバーサイドにフィールド追加
                    me.alter.server.append(function() {

                        // モデルにフィールド追加
                        me.alter.model.append(function() {

                            // カラムにフィールド追加
                            me.alter.column.append(function() {

                                // itemsにアイテム追加
                                me.alter.items.append(function() {

                                    // コールバック実行
                                    cb();

                                });

                            });

                        });

                    });

                });

            });
        */

        fns = [

            // {{{ 初期化

            function(next) {
                me.init(next);
            },

            // }}}
            // {{{ 重複チェック

            function(next) {
                me.duplicatecheck(function(duplicate) {

                    if (duplicate) {
                        skip = true;
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
