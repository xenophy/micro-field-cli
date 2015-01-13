/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

generated by MicroField CLI v0.8.0 date: 2015/01/14 03:01:47
*/

/**
 * MFTest.Header.view.main.MainModel Class
 *
 */
Ext.define('MFTest.Header.view.main.MainModel', {

    // {{{ extend

    extend: 'MicroField.app.ScreenModel',

    // }}}
    // {{{ alias

    alias: 'viewmodel.mftest-header-main',

    // }}}
    // {{{ data

    data: {

        // {{{ button

        button: {

            // {{{ dashboard

            dashboard: {
                text        : _('MFTest.Header:Title'),
                handler     : 'onBtnDashboard'
            },

            // }}}
            // {{{ mypage

            mypage: {
                text        : _('MFTest.Header:MyPage'),
                handler     : 'onBtnMyPage'
            },

            // }}}
            // {{{ logout

            logout: {
                text        : _('MFTest.Header:Logout'),
                handler     : 'onBtnLogout'
            }

            // }}}

        }

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
