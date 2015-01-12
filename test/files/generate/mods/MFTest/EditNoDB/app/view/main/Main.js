/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

generated by MicroField CLI v0.7.3 date: 2015/01/12 09:01:15
*/

/**
 * MFTest.EditNoDB.view.main.Main Class
 *
 */
Ext.define('MFTest.EditNoDB.view.main.Main', {

    // {{{ extend

    extend: 'MicroField.view.edit.Main',

    // }}}
    // {{{ requires

    requires: [
        'MFTest.EditNoDB.view.main.MainController',
        'MFTest.EditNoDB.view.main.MainModel',
        'MFTest.EditNoDB.view.edit.Edit'
    ],

    // }}}
    // {{{ xtype

    xtype: 'mftest-editnodb',

    // }}}
    // {{{ controller

    controller: 'mftest-editnodb-main',

    // }}}
    // {{{ viewModel

    viewModel: {
        type: 'mftest-editnodb-main'
    },

    // }}}
    // {{{ config

    config: {

        // {{{ layout

        layout: 'card',

        // }}}
        // {{{ title

        title: _('MFTest.EditNoDB:Title'),

        // }}}
        // {{{ items

        items: [{

            // {{{ 編集パネル

            xtype: 'mftest-editnodb-edit'

            // }}}

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