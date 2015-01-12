/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

generated by MicroField CLI v0.7.3 date: 2015/01/12 09:01:12
*/

/**
 * MFTest.Base.view.main.Main Class
 *
 */
Ext.define('MFTest.Base.view.main.Main', {

    // {{{ extend

    extend: 'MicroField.view.base.Base',

    // }}}
    // {{{ xtype

    xtype: 'mftest-base',

    // }}}
    // {{{ requires

    requires: [
        'MFTest.Base.view.main.MainController',
        'MFTest.Base.view.main.MainModel'
    ],

    // }}}
    // {{{ controller

    controller: 'mftest-base-main',

    // }}}
    // {{{ viewModel

    viewModel: {
        type: 'mftest-base-main'
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

            title: _('MFTest.Base:Title'),

            // }}}
            // {{{ layout

            layout: 'fit',

            // }}}
            // {{{ html

            html: _('MFTest.Base:Html')

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
