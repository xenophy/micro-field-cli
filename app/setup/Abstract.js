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
    // {{{ removeFiles

    removeFiles: function(list, callback, progress) {

        var me      = this,
            async   = require('async'),
            path    = require('path'),
            count   = 0,
            series  = [];

        CLI.iterate(me.getCleanupList(), function(item) {

            var t = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), item));

            series.push(function(callback) {
                CLI.Fs.remove(t, callback, function(item) {
                    count++;
                    progress(item);
                });
            });

        });

        async.series(series, function (err, result) {
            callback(count);
        });

    },

    // }}}
    // {{{ cleanup

    cleanup: function(callback) {

        var me      = this,
            async   = require('async'),
            path    = require('path'),
            count   = 0,
            series  = [];

        me.removeFiles(me.getCleanupList(), function(count) {

            if (count > 0) {
                CLI.log('');
            }

            callback();

        }, function(item) {

            MicroField.app.log.info('removed: ' + item);

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
            bar     = me.progress('  ' + me.colors.green('Generating Application') + ' [:bar]', {
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

            MicroField.app.log.info('Generated Application');

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
