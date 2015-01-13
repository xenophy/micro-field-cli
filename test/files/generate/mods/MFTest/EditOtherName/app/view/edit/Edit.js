/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

generated by MicroField CLI v0.8.0 date: 2015/01/14 03:01:51
*/

/**
 * MFTest.EditOtherName.view.edit.Edit Class
 *
 */
Ext.define('MFTest.EditOtherName.view.edit.Edit', {

    // {{{ extend

    extend: 'MicroField.view.edit.Edit',

    // }}}
    // {{{ xtype

    xtype: 'mftest-editothername-edit',

    // }}}
    // {{{ requires

    requires: [
        'MFTest.EditOtherName.view.edit.EditController',
        'MFTest.EditOtherName.view.edit.EditModel'
    ],

    // }}}
    // {{{ controller

    controller: 'mftest-editothername-edit',

    // }}}
    // {{{ viewModel

    viewModel: {
        type: 'mftest-editothername-edit'
    },

    // }}}
    // {{{ config

    config: {

        // {{{ api

        api: {
            load    : 'MicroField.rpc.MFTest.EditOtherName.Users.readData',
            submit  : 'MicroField.rpc.MFTest.EditOtherName.Users.updateData'
        },

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
        // {{{ items

        items: [{
            xtype       : 'textfield',
            itemId      : 'textdatatextfield',
            name        : 'textdata',
            fieldLabel  : _('MFTest.EditOtherName:field.Text'),
            width       : 300
        }],

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

        }],

        // }}}
        // {{{ trackResetOnLoad

        trackResetOnLoad: true

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
