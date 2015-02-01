/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.upgrade.VersionFile

CLI.define('MicroField.upgrade.VersionFile', {

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
            fs      = require('fs'),
            path    = require('path'),
            crypto  = require('crypto'),
            env     = MicroField.app.Environment,
            sdk, hmac_object, fileName, filePath;

        // 非同期処理実行
        async.series([

            // SDKバージョン取得、ファイル名、ファイルパス決定
            function(next) {
                env.getSdkVersion(function(data) {
                    sdk = data.version;
                    hmac_object = crypto.createHmac('sha256', 'MicroFieldSDK');
                    hmac_object.update('v' + sdk.version);
                    fileName = hmac_object.digest('hex');
                    filePath = path.join(MicroField.app.getApplicationDir(), '.microfield', 'vf');
                    next();
                });
            },

            // ファイル一覧取得
            function(next) {

                MicroField.app.walk(MicroField.app.getApplicationDir(), function(err, results) {

                    CLI.iterate(results, function(item, num) {
                        results[num] = item.substr(MicroField.app.getApplicationDir().length + 1);
                    });

                    var exclude = [
                        '.git',
                        '.gitignore',
                        '.microfield',
                        '.sencha',
                        'app.js',
                        'app.json',
                        'bootstrap.json',
                        'build',
                        'cmd/tmp',
                        'cmd/vf',
                        'ext',
                        'login/.sencha',
                        'login/app.js',
                        'login/app.json',
                        'login/bootstrap.json',
                        'login/build',
                        'login/ext',
                        'login/mods/MicroField/app/Application.js',
                        'login/resources/images',
                        'login/sass/example/bootstrap.json',
                        'login/sass/src/view/main/Main.scss',
                        'microfield-cmd.log',
                        'microfield-cli.log',
                        'mods/microfield.json',
                        'mods/MicroField/app/Application.js',
                        'packages/siesta-extjs',
                        'packages/siesta-lite',
                        'resources/images',
                        'README.md',
                        'sass/example/bootstrap.json',
                        'sass/src/view/main/Main.scss'
                    ];

                    var excludeExt = [
                        '.DS_Store',
                        '.sass-cache',
                        '.swp'
                    ];

                    var list = [];

                    CLI.iterate(results, function(item, num) {

                        var match = false;

                        CLI.iterate(exclude, function(target) {
                            if(item.substr(0, target.length) === target) {
                                match = true;
                            }
                        });

                        CLI.iterate(excludeExt, function(target) {
                            if(path.extname(path.basename(item)) === target || path.basename(item) === target) {
                                match = true;
                            }
                        });

                        //build.xmlは、マッチさせない
                        if (item === 'build.xml') {
                            match = false;
                        }

                        if (!match) {
                            list.push(item);
                        }

                    });

                    var data = [];

                    CLI.iterate(list, function(item, num) {

                        var target = path.join(MicroField.app.getApplicationDir(), item);
                        var src = fs.readFileSync(target).toString();

                        hmac_object = crypto.createHmac('sha256', 'MicroFieldSDK');
                        hmac_object.update(src);

                        var hex = hmac_object.digest('hex');

                        data.push(item + ',' + hex);

                    });

                    fs.writeFileSync(
                        path.join(filePath, fileName),
                        data.join("\n"),
                        'utf8'
                    );

                    next();
                });

            }

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
