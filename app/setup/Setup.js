/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.setup.Setup

CLI.define('MicroField.setup.Setup', {

    // {{{ requires

    requires: [
        'MicroField.config.Config',
        'MicroField.setup.Main',
        'MicroField.setup.Login'
    ],

    // }}}
    // {{{ mixins

    mixins: [
        'CLI.mixin.Ansi'
    ],

    // }}}
    // {{{ singleton

    singleton: true,

    // }}}
    // {{{ existsSenchaCmd

    existsSenchaCmd: function(callback) {

        var me      = this,
            exec    = require('child_process').exec,
            log     = MicroField.app.log,
            f       = CLI.String.format,
            cmd     = '';

        // コマンド実行
        cmd = 'sencha';

        exec(cmd, function(error, stdout, stderr) {

            if (error) {

                log.error('cannot find Sencha Cmd');
                return;

            }

            callback();

        });

    },

    // }}}
    // {{{ makeDirectories

    makeDirectories: function(callback) {


        var me = this,
            async = require('async'),
            mkdirp = require('mkdirp'),
            series = [];

        CLI.iterate([
            'resources/images',
            'login/resources/images'
        ], function(t) {

            series.push((function(t) {

                return function(next) {

                    var target = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), t));

                    mkdirp(target, function (err) {

                        // [INF] made: ********
                        MicroField.app.log.info('made: ' + target);

                        next();
                    });

                }

            })(t));

        });

        // 非同期実行
        async.series(series, function (err, result) {

            // コールバック
            callback();

        });

    },

    // }}}
    // {{{ execute

    execute: function() {

        var me      = this,
            async   = require('async'),
            fs      = require('fs'),
            path    = require('path'),
            f       = CLI.String.format,
            log     = MicroField.app.log,
            bold    = me.ansi.bold,
            cfg     = MicroField.config.Config,
            login   = MicroField.setup.Login,
            main    = MicroField.setup.Main,
            text    = '';

        // タイトル出力
        CLI.log(MicroField.app.getTitle());

        // 非同期処理実行開始
        async.series([

            // senchaコマンド存在確認
            function(next) {
                me.existsSenchaCmd(next);
            },

            // アプリケーションディレクトリでの実行であるかを判定
            function(next) {

                if (!MicroField.app.isApplicationDir()) {

                    log.error('cannot find ' + bold(MicroField.app.getSampleFilename()));
                    return;
                }

                next();

            },

            // Ext JS 存在確認
            function(next) {

                var extPath = cfg.getValues()['extPath'];

                if (!CLI.isDefined(extPath)) {

                    log.error('"' + bold('extPath') + '" config have not been set.');

                    text  = "\n";
                    text += 'Please set the ' + bold('extPath') + ' using folloing command.';
                    text += "\n";
                    text += "\n";
                    text += "  microfield config --extPath=\"[Ext JS Path]\"";
                    text += "\n";

                    CLI.log(text);

                    return;
                }

                fs.exists(CLI.resolvePath(extPath), function(exists) {

                    if (!exists) {

                        log.error('cannot find Ext JS in "' + bold(extPath) + '"');
                        return;

                    }

                    fs.exists(path.resolve(path.join(CLI.resolvePath(extPath), 'src')), function(exists) {

                        if (!exists) {

                            log.error('cannot find Ext JS in "' + bold(extPath) + '"');
                            return;

                        }

                        next();

                    });

                });

            },

            // microfield-sample.jsonのコピー
            function(next) {

                MicroField.app.copyFiles([
                    ['mods/microfield\-sample.json', 'mods/microfield.json']
                ], function(src, dest) {

                    // [INF] copied: ***************
                    MicroField.app.log.info(f('copied: {0} to {1}', src, dest));

                }, function(count) {

                    if (count > 0) {
                        CLI.log('');
                    }

                    // コールバック
                    next();

                });

            },

            // ログイン:クリーンアップ
            function(next) {
                login.cleanup.call(login, next);
            },

            // メイン:クリーンアップ
            function(next) {
                main.cleanup.call(main, next);
            },

            // ログイン:セットアップ実行
            function(next) {
                login.execute.call(login, next);
            },

            // メイン:セットアップ実行
            function(next) {
                main.execute.call(main, next);
            },

            // 必要ディレクトリ作成
            function(next) {

                me.makeDirectories(next);

            },

            // 書き込み権限変更
            function(next) {

                if (!CLI.isWindows) {

                    MicroField.app.changeToWritable([
                        '.htaccess',
                        'app.json',
                        'mods/MicroField/app/Application.js',
                        'mods/MicroField/app/view/center/Center.js',
                        'sass/src/view/main/Main.scss',
                        'login/app.json',
                        'login/sass/src/view/main/Main.scss',
                        'login/mods/MicroField/app/view/main/Main.js',
                        'login/mods/MicroField/app/Application.js',
                        'resources/Readme.md',
                        'resources/favicon.ico',
                        'login/resources/Readme.md',
                        'login/resources/favicon.ico',
                        'resources',
                        'resources/protected',
                        'login/resources',
                        'resources/images',
                        'login/resources/images',
                        'build/production/MicroField/resources',
                        'build/production/MicroField/resources/protected'
                    ], function(item) {

                        // [INF] copied: ***************
                        MicroField.app.log.info(f('chmod: {0}', item));

                    }, function(count) {

                        if (count > 0) {
                            CLI.log('');
                        }

                        // コールバック
                        next();

                    });

                } else {

                    // コールバック
                    next();

                }

            },

            // ログイン：アクセス初期化
            function(next) {

                // TODO
                next();

            },

            // メイン：アクセス初期化
            function(next) {

                // TODO
                next();

            },

            // ログイン:リビルド
            function(next) {

                // TODO: リビルドメソッド？
                // login.buildApplication.call(login, next);
                //
            },

            // メイン:リビルド
            function(next) {
                // TODO: リビルドメソッド？
                // main.buildApplication.call(main, next);
            }

        ], function (err, result) {

            console.log("done!");

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
