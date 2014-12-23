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
            htaccess, sdk, latest, latestPath;

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
                    sdk = data.version;
                    next();
                });
            },

            // 最新バージョン取得
            function(next) {
                env.getLatestVersion(function(data) {
                    latest = data;
                    next();
                });
            },

            // バージョン比較
            function(next) {

                if (sdk.isLessThan(latest)) {
                    next();
                } else {

                    // TODO: 処理ストップ
                }

            },

            // アーカイブ取得
            function(next) {
                env.getArchive(latest, function(data) {
                    latestPath = data;
                    next();
                });
            }

            // SUM情報取得解析
            function(next) {
                env.getVersionSum(data) {
                    next();
                }
            }

            // microfield.json初期値取得

            // アップグレード実行

        ], function() {
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
