/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

generated by MicroField CLI v0.8.0 date: 2015/01/14 03:01:50
*/

/**
 * MFTest.BaseOtherName.view.main.Main Class
 *
 */
Ext.define('MFTest.BaseOtherName.view.main.Main', {

    // {{{ extend

    extend: 'MicroField.view.base.Base',

    // }}}
    // {{{ xtype

    xtype: 'mftest-baseothername',

    // }}}
    // {{{ requires

    requires: [
        'MFTest.BaseOtherName.view.main.MainController',
        'MFTest.BaseOtherName.view.main.MainModel'
    ],

    // }}}
    // {{{ controller

    controller: 'mftest-baseothername-main',

    // }}}
    // {{{ viewModel

    viewModel: {
        type: 'mftest-baseothername-main'
    },

    // }}}
    // {{{ config

    config: {

        // {{{ layout

        layout: 'fit',

        // }}}
        // {{{ items

        items: [{

            // {{{ bodyPadding

            bodyPadding: 20,

            // }}}
            // {{{ title

            title: _('MFTest.BaseOtherName:Title'),

            // }}}
            // {{{ layout

            layout: 'fit',

            // }}}
            // {{{ html

            html: _('MFTest.BaseOtherName:Html')

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
