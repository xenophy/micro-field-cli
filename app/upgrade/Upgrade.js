/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.upgrade.Upgrade

CLI.define('MicroField.upgrade.Upgrade', {

    // {{{ requires

    requires: [
        'MicroField.app.Environment'
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
    // {{{ config

    config: {


    },

    // }}}
    // {{{ execute

    execute: function() {

        var me      = this,
            async   = require('async'),
            env     = MicroField.app.Environment,
            htaccess, sdk;


        // タイトル出力
        CLI.log(MicroField.app.getTitle());

        // 非同期処理実行
        async.series([

            // .htaccess情報取得
            function(next) {
                env.getHtaccess(function(data) {
                    htaccess = data;
                    next();
                });
            },

            // SDKバージョン取得
            function(next) {
                env.getSdkVersion(function(data) {
                    sdk = data;
                    next();
                });
            }

            // 最新リリースタグ取得

            // アーカイブ取得

            // SUM情報取得解析

            // microfield.json初期値取得

            // アップグレード実行

        ], function() {
        });

        /*

       */

        /*

            var me      = this,
                async   = Cmd.async;
            // MicroField Cmd 設定取得
            me.CmdConfig = me.getConfig();

            // .htaccess情報解析取得
            me.htaccess = me.getHtaccessInfo();

            // curlパス取得
            me.curlPath = me.getCurlPath();

            // コマンド生成
            me.cmds = me.createCommands();

            async.waterfall([

                // {{{ SDKバージョン取得

                function (callback) {
                    me.getSdkVersion(callback);
                },

                // }}}
                // {{{ 最新リリースタグ取得

                function (callback) {
                    me.getReleaseTags(callback);
                },

                // }}}
                // {{{ アーカイブ取得

                function (ret, callback) {

                    if (!ret) {
                        return;
                    }

                    me.getArchive(callback);

                },

                // }}}
                // {{{ SUM情報取得解析

                function (callback) {
                    me.getVersionSum(callback);
                },

                // }}}
                // {{{ microfield.json初期値取得

                function (callback) {
                    me.getInitialSdkConfig(callback);
                },

                // }}}
                // {{{ アップグレード実行

                function(callback) {
                    me.doUpgrade(callback);
                }

                // }}}

            ], function (err, results) {

                if (err) {
                    throw err;
                }

                // コールバック実行
                cb();
            });
        */

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
