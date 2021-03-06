/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

generated by MicroField CLI v0.8.0 date: 2015/01/14 03:01:54
*/

/**
 * MFTest.EditList.view.main.Main Class
 *
 */
Ext.define('MFTest.EditList.view.main.Main', {

    // {{{ extend

    extend: 'MicroField.view.editlist.Main',

    // }}}
    // {{{ xtype

    xtype: 'mftest-editlist',

    // }}}
    // {{{ requires

    requires: [
        'MFTest.EditList.view.list.List',
        'MFTest.EditList.view.edit.Edit',
        'MFTest.EditList.view.main.MainController',
        'MFTest.EditList.view.main.MainModel'
    ],

    // }}}
    // {{{ controller

    controller: 'mftest-editlist-main',

    // }}}
    // {{{ viewModel

    viewModel: {
        type: 'mftest-editlist-main'
    },

    // }}}
    // {{{ config

    config: {

        // {{{ title

        title: _('MFTest.EditList:Title'),

        // }}}
        // {{{ items

        items: [{

            // {{{ xtype

            xtype: 'mftest-editlist-list'

            // }}}

        }, {

            // {{{ xtype

            xtype: 'mftest-editlist-edit'

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
