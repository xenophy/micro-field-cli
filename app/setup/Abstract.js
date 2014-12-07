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
        // {{{ targetDir

        targetDir: ''

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

            if (count > 0) {
                CLI.log('');
            }

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
            bar     = me.progress('  ' + me.colors.green('Generating Login Application') + ' [:bar]', {
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

            // [INF] Generated Login Application
            MicroField.app.log.info('Generated Login Application');
            CLI.log('');

            // 不要なファイルを削除
            MicroField.app.removeFiles([
                'login/app',
                'login/app.json',
                'login/index.html'
            ], function(item) {

                // [INF] removed: ***************
                MicroField.app.log.info('removed: ' + item);

            }, function(count) {

                if (count > 0) {
                    CLI.log('');
                }

                // コピー
                MicroField.app.copyFiles([
                    ['login/app.json_override', 'login/app.json']
                ], function(item) {

                    // [INF] copied: ***************
                    MicroField.app.log.info('copied: ' + item);

                }, function(count) {

                    if (count > 0) {
                        CLI.log('');
                    }

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
            bar     = me.progress('  ' + me.colors.green('Building Login Application') + ' [:bar]', {
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
                me.cleenup(callback);

                return;
            }

            // [INF] Generated Login Application
            MicroField.app.log.info('Generated Login Application');
            CLI.log('');

            // コールバック
            callback();

        });

    },

    // }}}
    // {{{ execute

    execute: function(callback) {
        callback();
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
