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
        '{login}/.sencha',
        '{login}/app',
        '{login}/build',
        '{login}/ext',
        '{login}/app.js',
        '{login}/app.json',
        '{login}/app.json.\$old',
        '{login}/index.html'
    ],

    // }}}
    // {{{ disusedList

    disusedList: [
        '{login}/app',
        '{login}/app.js',
        '{login}/app.json',
        '{login}/index.html'
    ],

    // }}}
    // {{{ overrideList

    overrideList: [
        ['{login}/app.js_override', '{login}/app.js'],
        ['{login}/app.json_override', '{login}/app.json']
    ],

    // }}}
    // {{{ type

    type: 'Login',

    // }}}
    // {{{ targetDir

    targetDir: '{login}',

    // }}}
    // {{{ applyLoginDir

    applyLoginDir: function(loginSettings) {

        var me = this,
            dirName     = loginSettings['dirname'],
            cleanupList = me.getCleanupList(),
            disusedList = me.getDisusedList(),
            overrideList = me.getOverrideList();

        // microfield-sample.jsonに設定されているログインディレクトリに置換
        CLI.iterate(cleanupList, function(item, i) {
            cleanupList[i] = item.replace( /\{login\}/g , dirName);
        });
        me.setCleanupList(cleanupList);

        CLI.iterate(disusedList, function(item, i) {
            disusedList[i] = item.replace( /\{login\}/g , dirName);
        });
        me.setDisusedList(disusedList);

        CLI.iterate(overrideList, function(item, i) {
            overrideList[i][0] = item[0].replace( /\{login\}/g , dirName);
            overrideList[i][1] = item[1].replace( /\{login\}/g , dirName);
        });

        me.setTargetDir(me.getTargetDir().replace( /\{login\}/g , dirName));

    },

    // }}}
    // {{{ cleanup

    cleanup: function(loginSettings, callback) {

        var me = this;

        me.applyLoginDir(loginSettings);

        MicroField.app.removeFiles(me.getCleanupList(), function(item) {

            MicroField.app.log.info('removed: ' + item);

        }, function(count) {

            callback();

        });

    },

    // }}}
    // {{{ execute

    execute: function(loginSettings, callback) {

        var me          = this,
            async       = require('async'),
            fns         = [];

        me.applyLoginDir(loginSettings);

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
