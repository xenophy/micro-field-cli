/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

generated by MicroField CLI v0.8.0 date: 2015/01/14 03:01:55
*/

/**
 * MFTest.EditListOtherScreenName.view.edit.Edit Class
 *
 */
Ext.define('MFTest.EditListOtherScreenName.view.edit.Edit', {

    // {{{ extend

    extend: 'MicroField.view.editlist.Edit',

    // }}}
    // {{{ xtype

    xtype: 'mftest-editlistotherscreenname-edit',

    // }}}
    // {{{ requires

    requires: [
        'MFTest.EditListOtherScreenName.view.edit.EditController',
        'MFTest.EditListOtherScreenName.view.edit.EditModel'
    ],

    // }}}
    // {{{ controller

    controller: 'mftest-editlistotherscreenname-edit',

    // }}}
    // {{{ viewModel

    viewModel: {
        type: 'mftest-editlistotherscreenname-edit'
    },

    // }}}
    // {{{ api

    api: {
        load    : 'MicroField.rpc.MFTest.EditListOtherScreenName.Lists.readData',
        submit  : 'MicroField.rpc.MFTest.EditListOtherScreenName.Lists.updateData',
        remove  : 'MicroField.rpc.MFTest.EditListOtherScreenName.Lists.removeData'
    },

    // }}}
    // {{{ config

    config: {

        // {{{ paramOrder

        paramOrder: ['id'],

        // }}}
        // {{{ trackResetOnLoad

        trackResetOnLoad: true,

        // }}}
        // {{{ border

        border: false,

        // }}}
        // {{{ bodyPadding

        bodyPadding: 20,

        // }}}
        // {{{ defaults

        defaults: {
            labelAlign  : 'top'
        },

        // }}}
        // {{{ tbar

        tbar: [{

            // {{{ 保存ボタン

            reference       : 'btnSave',
            bind: {
                handler     : '{button.save.handler}',
                text        : '{button.save.text}'
            }

            // }}}

        }, {

            // {{{ リセットボタン

            reference       : 'btnReset',
            bind: {
                handler     : '{button.reset.handler}',
                text        : '{button.reset.text}'
            }

            // }}}

        }, {

            // {{{ キャンセルボタン

            reference       : 'btnCancel',
            bind: {
                handler     : '{button.cancel.handler}',
                text        : '{button.cancel.text}'
            }

            // }}}

        }, '-', {

            // {{{ 削除

            reference       : 'btnRemove',
            bind: {
                handler     : '{button.remove.handler}',
                text        : '{button.remove.text}'
            }

            // }}}

        }],

        // }}}
        // {{{ items

        items: [{
            xtype       : 'hidden',
            itemId      : 'pkhiddenfield',
            name        : 'pk'
        }, {
            xtype       : 'textfield',
            itemId      : 'textdatatextfield',
            name        : 'textdata',
            fieldLabel  : _('MFTest.EditListOtherScreenName:field.Textdata'),
            width       : 300
        }]

        // }}}

    }

    // }}}

});

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
