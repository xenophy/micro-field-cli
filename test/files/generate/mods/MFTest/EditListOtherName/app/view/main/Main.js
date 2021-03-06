/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

generated by MicroField CLI v0.8.0 date: 2015/01/14 03:01:54
*/

/**
 * MFTest.EditListOtherName.view.main.Main Class
 *
 */
Ext.define('MFTest.EditListOtherName.view.main.Main', {

    // {{{ extend

    extend: 'MicroField.view.editlist.Main',

    // }}}
    // {{{ xtype

    xtype: 'mftest-editlistothername',

    // }}}
    // {{{ requires

    requires: [
        'MFTest.EditListOtherName.view.list.List',
        'MFTest.EditListOtherName.view.edit.Edit',
        'MFTest.EditListOtherName.view.main.MainController',
        'MFTest.EditListOtherName.view.main.MainModel'
    ],

    // }}}
    // {{{ controller

    controller: 'mftest-editlistothername-main',

    // }}}
    // {{{ viewModel

    viewModel: {
        type: 'mftest-editlistothername-main'
    },

    // }}}
    // {{{ config

    config: {

        // {{{ title

        title: _('MFTest.EditListOtherName:Title'),

        // }}}
        // {{{ items

        items: [{

            // {{{ xtype

            xtype: 'mftest-editlistothername-list'

            // }}}

        }, {

            // {{{ xtype

            xtype: 'mftest-editlistothername-edit'

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
