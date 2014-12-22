/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controller.remove.Main

CLI.define('MicroField.controller.remove.Main', {

    // {{{ requires

    requires: [
        'MicroField.module.Manager'
    ],

    // }}}
    // {{{ extend

    extend: 'MicroField.controller.Controller',

    // }}}
    // {{{ config

    config: {

        // {{{ fields

        fields: null

        // }}}

    },

    // }}}
    // {{{ findField

    findField: function(type) {

        var me = this;

        return CLI.Array.findBy(me.getFields(), function(item) {

            if (item === type) {
                return true;
            }

            return false;

        });

    },

    // }}}
    // {{{ run

    run: function(fieldName, modPath) {

        var me = this;

        // modPath 入力チェック
        if (!modPath) {
            CLI.create('MicroField.controller.remove.Help').run();
            return;
        }

        // フィールドタイプ一覧取得
        MicroField.module.Manager.getFieldTypes('remove', modPath, function(fields) {

            // フィールド定義設定
            me.setFields(fields);

            // fieldName 入力チェック
            if (!fieldName) {
                CLI.create('MicroField.controller.remove.Help').run();
                return;
            }

            // modPath 入力形式チェック
            if (modPath.split('/').length !== 2) {
                CLI.create('MicroField.controller.remove.Help').run();
                return;
            }

            // 削除処理実行
            MicroField.module.Manager.remove({

                // フィールド名
                fieldName   : fieldName,

                // モジュールパス
                modPath     : modPath

            }, function() {

            });

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
