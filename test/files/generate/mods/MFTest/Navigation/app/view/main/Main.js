/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

generated by MicroField CLI v0.7.3 date: 2015/01/12 09:01:11
*/

/**
 * MFTest.Navigation.view.main.Main Class
 *
 */
Ext.define('MFTest.Navigation.view.main.Main', {

    // {{{ extend

    extend: 'Ext.tree.Panel',

    // }}}
    // {{{ xtype

    xtype: 'mftest-navigation',

    // }}}
    // {{{ controller

    controller: 'mftest-navigation-main',

    // }}}
    // {{{ requires

    requires: [
        'MFTest.Navigation.view.main.MainController',
        'MFTest.Navigation.view.main.MainModel'
    ],

    // }}}
    // {{{ viewModel

    viewModel: {
        type: 'mftest-navigation-main'
    },

    // }}}
    // {{{ store

    store: 'MFTest.Navigation.store.Tree',

    // }}}
    // {{{ config

    config: {

        // {{{ cls

        cls: 'x-mod-navigation',

        // }}}
        // {{{ rootVisible

        rootVisible: false,

        // }}}
        // {{{ animate

        animate: false,

        // }}}
        // {{{ expanded

        expanded: true,

        // }}}
        // {{{ items

        title: _('MFTest.Navigation:Title')

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