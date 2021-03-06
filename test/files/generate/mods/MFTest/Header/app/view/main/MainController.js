/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

generated by MicroField CLI v0.8.0 date: 2015/01/14 03:01:47
*/

/**
 * MFTest.Header.view.main.MainController Class
 *
 */
Ext.define('MFTest.Header.view.main.MainController', {

    // {{{ extend

    extend: 'MicroField.view.base.BaseController',

    // }}}
    // {{{ alias

    alias: 'controller.mftest-header-main',

    // }}}
    // {{{ onBtnDashboard

    onBtnDashboard: function(btn) {
        this.redirectTo(MicroField.getApplication().getDefaultToken());
    },

    // }}}
    // {{{ onBtnMyPage

    onBtnMyPage: function(btn) {
        this.redirectTo('#mypage');
    },

    // }}}
    // {{{ onBtnLogout

    onBtnLogout: function(btn) {

        // 'x-logout' event fire
        MicroField.getApplication().fireEvent('x-logout', false);

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
