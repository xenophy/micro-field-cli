/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.setup.Abstract

CLI.define('MicroField.setup.Abstract', {

    // {{{ requires

    requires: [
        'MicroField.config.Config'
    ],

    // }}}
    // {{{ mixins

    mixins: [
        'CLI.mixin.Ansi',
        'CLI.mixin.Progress'
    ],

    // }}}
    // {{{ config

    config: {

        // {{{ cleanupList

        cleanupList: [],

        // }}}
        // {{{ disusedList

        disusedList: [],

        // }}}
        // {{{ overrideList

        overrideList: [],

        // }}}
        // {{{ type

        type: '',

        // }}}
        // {{{ targetDir

        targetDir: '',

        // }}}
        // {{{ url

        url: null

        // }}}

    },

    // }}}
    // {{{ constructor

    constructor: function(config) {

        var me  = this;

        me.initConfig(config);
        me.callParent(arguments);

    },

    // }}}
    // {{{ cleanup

    cleanup: function(callback) {

        var me = this;

        MicroField.app.removeFiles(me.getCleanupList(), function(item) {

            MicroField.app.log.info('removed: ' + item);

        }, function(count) {

            callback();

        });

    },

    // }}}
    // {{{ generateApplication

    generateApplication: function(callback) {

        var me      = this,
            exec    = require('child_process').exec,
            f       = CLI.String.format,
            cmd     = '',
            timer   = null,
            bar     = me.progress('  ' + me.colors.green('Generating ' + me.getType() + ' Application') + ' [:bar]', {
                complete: '=',
                incomplete: ' ',
                width: 20,
                total: 101
            });

        // プログレスバー動作開始
        timer = setInterval(function () {
            bar.tick();
            if (bar.curr === 100) {
                bar.curr = 0;
            }
        }, 100);

        // コマンド実行
        cmd = f([
            'cd {0}',
            'sencha -sdk "{1}" generate app MicroField ./',
            'sencha app refresh'
        ].join(MicroField.app.getCmdSeparator()),
            CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), me.getTargetDir())),
            CLI.resolvePath(MicroField.config.Config.getValues()['extPath'])
        );
        exec(cmd, function(error, stdout, stderr) {

            // プログレスバー動作停止
            clearInterval(timer);
            bar.stream.clearLine();
            bar.stream.cursorTo(0);

            if (error !== null) {

                // クリーンアップ
                me.cleenup(callback);

                return;
            }

            // [INF] Generated [Type] Application
            MicroField.app.log.info('Generated ' + me.getType() + ' Application');

            // 不要なファイルを削除
            MicroField.app.removeFiles(me.getDisusedList(), function(item) {

                // [INF] removed: ***************
                MicroField.app.log.info('removed: ' + item);

            }, function(count) {

                // コピー
                MicroField.app.copyFiles(me.getOverrideList(), function(item) {

                    // [INF] copied: ***************
                    MicroField.app.log.info('copied: ' + item);

                }, function(count) {

                    // コールバック
                    callback();

                });

            });

        });

    },

    // }}}
    // {{{ buildApplication

    buildApplication: function(callback) {

        var me      = this,
            exec    = require('child_process').exec,
            f       = CLI.String.format,
            cmd     = '',
            timer   = null,
            bar     = me.progress('  ' + me.colors.green('Building ' + me.getType() + ' Application') + ' [:bar]', {
                complete: '=',
                incomplete: ' ',
                width: 20,
                total: 101
            });

        // プログレスバー動作開始
        timer = setInterval(function () {
            bar.tick();
            if (bar.curr === 100) {
                bar.curr = 0;
            }
        }, 100);

        // コマンド実行
        cmd = f([
            'cd {0}',
            'sencha app refresh',
            'sencha app build --clean'
        ].join(MicroField.app.getCmdSeparator()),
            CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), me.getTargetDir()))
        );
        exec(cmd, function(error, stdout, stderr) {

            // プログレスバー動作停止
            clearInterval(timer);
            bar.stream.clearLine();
            bar.stream.cursorTo(0);

            if (error !== null) {

                // クリーンアップ
                me.cleanup(callback);

                return;
            }

            // [INF] Built [Type] Application
            MicroField.app.log.info('Built ' + me.getType() + ' Application');

            // コールバック
            callback();

        });

    },

    // }}}
    // {{{ execute

    execute: function(callback) {
        callback();
    },

    // }}}
    // {{{ access4Init

    access4Init: function(callback) {

        var me      = this,
            f       = CLI.String.format,
            request = require("request");

        request({
            url: me.getUrl(),
            port: 80,
            method: 'PUT'
        }, function(err, res, body) {

            // [INF] accessed: ***************
            MicroField.app.log.info(f('accessed: {0}', me.getUrl()));

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
