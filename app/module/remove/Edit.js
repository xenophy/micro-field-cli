/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.remove.Edit

CLI.define('MicroField.module.remove.Edit', {

    // {{{ extend

    extend: 'MicroField.module.remove.Abstract',

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

        }

        // }}}

    },

    // }}}
    // {{{ execute

    execute: function(callback) {

        var me      = this,
            async   = require('async'),
            skip    = false,
            fns;

        fns = [

            // {{{ 初期化

            function(next) {
                me.init(next);
            },

            // }}}
            // {{{ テーブルからフィールド削除

            function(next) {
                if (!skip) {
                    me.alterTable(next);
                }
            },

            // }}}
            // {{{ サーバーサイドスクリプトからフィールド削除

            function(next) {
                if (!skip) {
                    me.alterServerScript(next);
                }
            },

            // }}}
            // {{{ クライアントサイドスクリプトからフィールド削除

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
