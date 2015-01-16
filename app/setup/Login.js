/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.setup.Login

CLI.define('MicroField.setup.Login', {

    // {{{ extend

    extend: 'MicroField.setup.Abstract',

    // }}}
    // {{{ singleton

    singleton: true,

    // }}}
    // {{{ cleanupList

    cleanupList: [
        'login/.sencha',
        'login/app',
        'login/build',
        'login/ext',
        'login/app.js',
        'login/app.json',
        'login/app.json.\$old',
        'login/index.html'
    ],

    // }}}
    // {{{ disusedList

    disusedList: [
        'login/app',
        'login/app.js',
        'login/app.json',
        'login/index.html'
    ],

    // }}}
    // {{{ overrideList

    overrideList: [
        ['login/app.js_override', 'login/app.js'],
        ['login/app.json_override', 'login/app.json']
    ],

    // }}}
    // {{{ type

    type: 'Login',

    // }}}
    // {{{ targetDir

    targetDir: 'login',

    // }}}
    // {{{ execute

    execute: function(callback) {

        var me      = this,
            async   = require('async'),
            fns     = [];

        // アプリケーション生成
        fns.push(function(callback) {
            me.generateApplication(callback);
        });

        // アプリケーションビルド
        fns.push(function(callback) {
            me.buildApplication(callback);
        });

        // 非同期実行
        async.series(fns, function (err, result) {

            // コールバック
            callback();

        });

    }

    // }}}

});

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
