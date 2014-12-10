/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.setup.Main

CLI.define('MicroField.setup.Main', {

    // {{{ extend

    extend: 'MicroField.setup.Abstract',

    // }}}
    // {{{ singleton

    singleton: true,

    // }}}
    // {{{ cleanupList

    cleanupList: [
        '.sencha',
        'app',
        'build',
        'ext',
        'app.js',
        'app.json',
        'app.json.\$old',
        'index.html'
    ],

    // }}}
    // {{{ disusedList

    disusedList: [
        'app',
        'app.js',
        'app.json',
        'index.html'
    ],

    // }}}
    // {{{ overrideList

    overrideList: [
        ['app.js_override', 'app.js'],
        ['app.json_override', 'app.json'],
        ['mods/microfield\-sample.json', 'mods/microfield.json']
    ],

    // }}}
    // {{{ type

    type: 'Main',

    // }}}
    // {{{ targetDir

    targetDir: '',

    // }}}
    // {{{ execute

    execute: function(callback) {

        var me      = this,
            async   = require('async'),
            series  = [];

        // アプリケーション生成
        series.push(function(callback) {
            me.generateApplication(callback);
        });

        // アプリケーションビルド
        series.push(function(callback) {
            me.buildApplication(callback);
        });

        // 非同期実行
        async.series(series, function (err, result) {

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
