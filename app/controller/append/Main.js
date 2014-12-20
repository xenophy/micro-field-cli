/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controller.append.Main

CLI.define('MicroField.controller.append.Main', {

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

    run: function(fieldType, fieldName, modPath) {

        var me = this;

        // フィールドタイプ一覧取得
        MicroField.module.Manager.getFieldTypes('append', modPath, function(fields) {

            // フィールド定義設定
            me.setFields(fields);

            if (!me.findField(fieldType)) {
                CLI.create('MicroField.controller.append.Help').run();
                return;
            }

            if (!fieldName) {
                CLI.create('MicroField.controller.append.Help').run();
                return;
            }

            if (!modPath) {
                CLI.create('MicroField.controller.append.Help').run();
                return;
            }

            if (modPath.split('/').length !== 2) {
                CLI.create('MicroField.controller.append.Help').run();
                return;
            }

            MicroField.module.Manager.append({
                fieldType   : fieldType,
                fieldName   : fieldName,
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
