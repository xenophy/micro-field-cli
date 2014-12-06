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

        if (!fs.existsSync(CLI.resolvePath(extPath)) || !fs.existsSync(path.resolve(path.join(CLI.resolvePath(extPath), 'src')))) {

            log.error('cannot find Ext JS in "' + bold(extPath) + '"');
            return;

        }

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
