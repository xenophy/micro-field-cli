/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.append.Abstract

CLI.define('MicroField.module.append.Abstract', {

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
            // {{{ model

            model           : '',

            // }}}
            // {{{ columns

            columns         : '',

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
        // {{{ fieldType

        fieldType           : '',

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

            // フィールドタイプ
            fieldType   : me.getFieldType(),

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
    // {{{ duplicatecheck

    duplicatecheck: function(callback) {

        var me      = this,
            async   = require('async'),
            skip    = false,
            fns;

        fns = [

            // テーブル変更クラス重複チェック
            function(next) {
                me.getAlterTableClass().duplicatecheck(function(duplicate) {

                    if (duplicate) {
                        skip = true;
                    }

                    next();
                });
            },

            // サーバースクリプト変更クラス重複チェック
            function(next) {
                if (!skip) {
                    me.getAlterServerClass().duplicatecheck(function(duplicate) {

                        if (duplicate) {
                            skip = true;
                        }

                        next();
                    });
                }
            },

            // クライアントスクリプト変更クラス重複チェック
            function(next) {
                if (!skip) {
                    me.getAlterClientClass().duplicatecheck(function(duplicate) {

                        if (duplicate) {
                            skip = true;
                        }

                        next();
                    });
                }
            }

        ];

        // 非同期処理実行
        async.series(fns, function() {

            // コールバック実行
            callback(skip);

        });

    },

    // }}}
    // {{{ alterTable

    alterTable: function(callback) {

        // テーブル変更クラス生成/実行
        this.getAlterTableClass().append(callback);

    },

    // }}}
    // {{{ alterServerScript

    alterServerScript: function(callback) {

        // サーバーサイドスクリプト変更クラス生成/実行
        this.getAlterServerClass().append(callback);

    },

    // }}}
    // {{{ alterClientScript

    alterClientScript: function(callback) {

        // クライアントサイドスクリプト変更クラス生成/実行
        this.getAlterClientClass().append(callback);

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
