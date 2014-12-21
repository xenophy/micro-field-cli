/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.append.Abstract

CLI.define('MicroField.module.append.Abstract', {

    // {{{ extend

    extend: 'MicroField.Base',

    // }}}
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

        fieldName: null,

        // }}}
        // {{{ classConfig

        classConfig: {}

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

        // テーブル変更クラス生成/実行
        CLI.create('MicroField.module.alter.Table', this.getClassConfig()).append(callback);

    },

    // }}}
    // {{{ alterServerScript

    alterServerScript: function(callback) {

        // サーバーサイドスクリプト変更クラス生成/実行
        CLI.create('MicroField.module.alter.ServerScript', this.getClassConfig()).append(callback);

    },

    // }}}
    // {{{ alterClientScript

    alterClientScript: function(callback) {

        // クライアントサイドスクリプト変更クラス生成/実行
        CLI.create('MicroField.module.alter.ClientScript', this.getClassConfig()).append(callback);

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
