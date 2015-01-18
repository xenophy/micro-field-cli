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
    // {{{ privates

    privates: {

        // {{{ doUpgrade

        doUpgrade: function(o, callback) {

            var me              = this,
                async           = require('async'),
                crypto          = require('crypto'),
                fs              = require('fs-extra'),
                mkdirp          = require('mkdirp'),
                path            = require('path'),
                sdk             = o.sdk,
                latest          = o.latest,
                htaccess        = o.htaccess,
                escapeFiles     = [],
                escapedFiles    = [];

            // 非同期処理実行
            async.series([

                // 変更待避算出
                function(next) {

                    var series = [];

                    CLI.iterate(sdk.hash, function(file, sum) {

                        // 処理関数追加
                        series.push(function(subnext) {

                            var t = path.join(MicroField.app.getApplicationDir(), file);

                            // ファイル存在確認
                            fs.exists(t, function(exists) {

                                if (exists) {

                                    // ファイル読み込み
                                    fs.readFile(t, function(err, data) {

                                        if (crypto.createHmac('sha256', 'MicroFieldSDK').update(data.toString('utf8')).digest('hex') != sum) {
                                            escapeFiles.push(file);
                                        }

                                        subnext();

                                    });

                                } else {
                                    subnext();
                                }

                            });

                        });

                    });

                    async.series(series, function() {
                        next();
                    });

                },

                // 変更ファイル待避処理
                function(next) {

                    var series = [];

                    CLI.iterate(escapeFiles, function(file, i) {

                        series.push(function(subnext) {

                            var src     = path.join(MicroField.app.getApplicationDir(), file),
                                dest    = path.join(path.dirname(src), path.basename(src, path.extname(src)) + '_modified(v' + sdk.version + ')' + path.extname(src));

                            // リネーム処理
                            fs.rename(src, dest, function(err) {

                                // TODO: エラー処理

                                // リネーム後のファイル追加
                                escapedFiles.push(dest);

                                // [INFO Escaped modified files.]
                                //Cmd.puts(format('{0}: Escaped modified files.', ansi.green('INFO')));
                                subnext();

                            });

                        });

                    });

                    async.series(series, function() {
                        next();
                    });

                },

                // 最新版のファイルを、アーカイブからコピー
                function(next) {

                    var series = [];

                    CLI.iterate(latest.hash, function(file, i) {

                        series.push(function(subnext) {

                            var src     = path.join(latest.tmpdir, file),
                                dest    = path.join(MicroField.app.getApplicationDir(), file);

                            // ファイル存在確認
                            fs.exists(src, function(exists) {

                                if (exists) {

                                    // ディレクトリ作成
                                    mkdirp(path.dirname(dest), function (err) {

                                        // TODO: エラー処理

                                        // ファイルコピー
                                        fs.copy(src, dest, function(err) {

                                            // TODO: エラー処理

                                            subnext();
                                        });

                                    });

                                } else {
                                    subnext();
                                }

                            });

                        });

                    });

                    // .microfield/vfディレクトリの内容を、最新版と同期
                    series.push(function(subnext) {

                        var src     = path.join(latest.tmpdir, '.microfield', 'vf'),
                            dest    = path.join(MicroField.app.getApplicationDir(), '.microfield', 'vf');

                        // ファイル存在確認
                        fs.exists(src, function(exists) {

                            if (exists) {

                                // ディレクトリ作成
                                mkdirp(path.dirname(dest), function (err) {

                                    // TODO: エラー処理

                                    // ファイルコピー
                                    fs.copy(src, dest, function(err) {

                                        // TODO: エラー処理

                                        subnext();
                                    });

                                });

                            } else {
                                subnext();
                            }

                        });

                    });

                    // 非同期処理実行
                    async.series(series, function() {
                        next();
                    });

                },

                // .htaccess RewriteBase更新
                function(next) {

                    var target = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), '.htaccess'));

                    fs.readFile(target, function(err, data) {

                        var text = data.toString();

                        fs.writeFile(
                            target,
                            text.replace(/[\r\s]*RewriteBase (.*?)[\s]*\n/, '\n    RewriteBase ' + htaccess.rewriteBase + '\n\n'),
                            'utf8',
                            function(err) {

                            // TODO: エラー処理

                            next();
                        });
                    });

                }

            ], function() {
                callback();
            });

        }

        // }}}

    },

    // }}}
    // {{{ execute

    execute: function() {

        var me      = this,
            async   = require('async'),
            fs      = require('fs'),
            path    = require('path'),
            env     = MicroField.app.Environment,
            htaccess, sdk, latest;

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
                    latest.tmpdir = data;
                    next();
                });
            },

            // SUM情報取得解析
            function(next) {
                env.getVersionSum(sdk, latest, function(data) {
                    sdk.hash    = data.sdk;
                    latest.hash = data.latest;
                    next();
                });
            },

            // microfield.json初期値取得
            function(next) {
                env.getInitialSdkConfig(function(data) {
                    sdk.initConfig = data;
                    next();
                });
            },

            // アップグレード実行
            function(next) {
                me.doUpgrade({
                    htaccess    : htaccess,
                    sdk         : sdk,
                    latest      : latest
                }, next);
            },

            // microfield-sample.json の最新項目マージ
            function(next) {

                var series = [],
                    sample;

                // microfield-sample.json取得 / 最新版初期設定マージ
                series.push(function(subnext) {

                    target  = path.join(MicroField.app.getApplicationDir(), 'mods', MicroField.app.getSampleFilename());

                    fs.readFile(target, function(err, data) {
                        sample = CLI.decode(MicroField.app.removeComment(data.toString()), true);
                        sample = CLI.Object.merge(sdk.initConfig, sample);
                        subnext();
                    });

                });

                // オブジェクトコメントマージ
                series.push(function(subnext) {

                    var getObjectKeysRecursive = function(obj, parent) {

                        var me  = this,
                            ret = [];

                        var isNumber = function(x) {

                            if(typeof(x) != 'number' && typeof(x) != 'string') {
                                return false;
                            } else {
                                return (x == parseFloat(x) && isFinite(x));
                            }

                        }

                        for (var p in obj) {

                            if (!isNumber(p)) {

                                if (!parent) {
                                    ret.push(p);
                                    parent = '';
                                } else {
                                    ret.push(parent + '/' + p);
                                }

                                if (obj[p].constructor==Object) {
                                    if (parent === '') {
                                        Array.prototype.push.apply(ret, getObjectKeysRecursive(obj[p], p));
                                    } else {
                                        Array.prototype.push.apply(ret, getObjectKeysRecursive(obj[p], parent + '/' + p));
                                    }

                                }

                            }

                        }

                        return ret;

                    };

                    env.getConfigComments(getObjectKeysRecursive(sample), function(comments) {
                        env.makeConfigSection(sample, comments, function(text) {
                            sample = text;
                            subnext();
                        });
                    });

                });

                // microfield-sample.json保存
                series.push(function(subnext) {

                    target  = path.join(MicroField.app.getApplicationDir(), 'mods', MicroField.app.getSampleFilename());

                    fs.writeFile(target, sample, 'utf8', function(err) {

                        // TODO: エラー処理

                        subnext();
                    });

                });

                // 非同期処理実行
                async.series(series, function() {
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
