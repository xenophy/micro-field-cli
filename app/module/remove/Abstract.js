/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.remove.Abstract

CLI.define('MicroField.module.remove.Abstract', {

    // {{{ extend

    extend: 'MicroField.Base',

    // }}}
    // {{{ config

    config: {

        // {{{ filenames

        filenames: {

            // {{{ items

            items           : '',

            // }}}
            // {{{ serverscript

            serverscript    : ''

            // }}}

        },

        // }}}
        // {{{ ns

        ns                  : '',

        // }}}
        // {{{ name

        name                : '',

        // }}}
        // {{{ fieldName

        fieldName           : '',

        // }}}
        // {{{ classConfig

        classConfig         : {},

        // }}}

    },

    // }}}
    // {{{ execute

    execute: CLI.emptyFn,

    // }}}
    // {{{ init

    init: function(callback) {

        var me = this;

        // 変更クラスコンフィグオプション設定
        me.setClassConfig({

            // テンプレートタイプ
            tplType     : CLI.getClassName(me).split('.').pop(),

            // モジュール名前空間
            ns          : me.getNs(),

            // モジュール名
            name        : me.getName(),

            // フィールド名
            fieldName   : me.getFieldName(),

            // ファイル名一覧
            filenames   : me.getFilenames()

        });

        // コールバック実行
        callback();

    },

    // }}}
    // {{{ getAlterTableClass

    getAlterTableClass: function() {
        return CLI.create('MicroField.module.alter.' + CLI.getClassName(this).split('.').pop().toLowerCase() + '.Table', this.getClassConfig());
    },

    // }}}
    // {{{ getAlterServerClass

    getAlterServerClass: function() {
        return CLI.create('MicroField.module.alter.' + CLI.getClassName(this).split('.').pop().toLowerCase() + '.ServerScript', this.getClassConfig());
    },

    // }}}
    // {{{ getAlterClientClass

    getAlterClientClass: function() {
        return CLI.create('MicroField.module.alter.' + CLI.getClassName(this).split('.').pop().toLowerCase() + '.ClientScript', this.getClassConfig());
    },

    // }}}
    // {{{ alterTable

    alterTable: function(callback) {

        // テーブル変更クラス生成/実行
        this.getAlterTableClass().remove(callback);

    },

    // }}}
    // {{{ alterServerScript

    alterServerScript: function(callback) {

        // サーバーサイドスクリプト変更クラス生成/実行
        this.getAlterServerClass().remove(callback);

    },

    // }}}
    // {{{ alterClientScript

    alterClientScript: function(callback) {

        // クライアントサイドスクリプト変更クラス生成/実行
        this.getAlterClientClass().remove(callback);

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
