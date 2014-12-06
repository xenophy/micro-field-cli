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
    // {{{ execute

    execute: function() {

        var me      = this,
            async   = require('async'),
            fs      = require('fs'),
            path    = require('path'),
            log     = MicroField.app.log,
            bold    = me.ansi.bold,
            cfg     = MicroField.config.Config,
            login   = MicroField.setup.Login,
            main    = MicroField.setup.Main,
            text    = '';

        // タイトル出力
        CLI.log(MicroField.app.getTitle());

        // TODO: senchaコマンド存在確認


        // アプリケーションディレクトリでの実行であるかを判定
        if (!MicroField.app.isApplicationDir()) {

            log.error('cannot find ' + bold(MicroField.app.getSampleFilename()));
            return;
        }

        // Ext JS 存在確認
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

        // TODO: 非同期対応
        if (!fs.existsSync(CLI.resolvePath(extPath)) || !fs.existsSync(path.resolve(path.join(CLI.resolvePath(extPath), 'src')))) {

            log.error('cannot find Ext JS in "' + bold(extPath) + '"');
            return;

        }

        // TODO: microfield-sample.jsonのコピー

        // TODO: 書き込み権限変更

        /*
                // microfield-sample.jsonコピー
                me.copyFiles([
                    {src: 'mods/microfield\-sample.json', dest: 'mods/microfield.json'}
                ]);

                var mfdir = Cmd.mfdir;

                if (!Cmd.isWindows) {

                    // 変更ファイル一覧
                    var targets = [
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
                        'login/resources/favicon.ico'
                    ];

                    var dirTargets = [
                        'resources',
                        'resources/protected',
                        'login/resources',
                        'resources/images',
                        'login/resources/images',
                        'build/production/MicroField/resources',
                        'build/production/MicroField/resources/protected'
                    ];

                    try {
                        rmdir('resources/images');
                    } catch(e) {
                    }

                    try {
                        fs.mkdirSync('resources/images');
                    } catch(e) {
                    }

                    try {
                        rmdir('login/resources/images');
                    } catch(e) {
                    }

                    try {
                        fs.mkdirSync('login/resources/images');
                    } catch(e) {
                    }

                    // ファイル書き込み権限変更
                    Ext.iterate(targets, function(item) {

                        var target = mfdir + '/' + item;

                        Cmd.puts(format('{1}: {0} ...', target, ansi.blue('Changing Permissions')));
                        Cmd.puts("\033[2A");

                        // 権限変更処理
                        try {
                            fs.chmodSync(target, 0666);
                        } catch(e) {
                        }

                        Cmd.puts(format('\033[0J{1}: {0}', target, ansi.green('Changed')));

                    });

                    // ディレクトリ書き込み権限変更
                    Ext.iterate(dirTargets, function(item) {

                        var target = mfdir + '/' + item;

                        Cmd.puts(format('{1}: {0} ...', target, ansi.blue('Changing Directory Permissions')));
                        Cmd.puts("\033[2A");

                        // 権限変更処理
                        try {
                            fs.chmodSync(target, 0777);
                        } catch(e) {
                        }

                        Cmd.puts(format('\033[0J{1}: {0}', target, ansi.green('Changed')));

                    });

                }

               */




        // 非同期処理実行開始
        async.series([

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
