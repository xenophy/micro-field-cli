/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.app.Environment

CLI.define('MicroField.app.Environment', {

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
    // {{{ singleton

    singleton: true,

    // }}}
    // {{{ getHtaccess

    getHtaccess: function(callback) {

        var me      = this,
            fs      = require('fs'),
            path    = require('path'),
            f       = CLI.String.format,
            cfg     = MicroField.config.Config,
            domain  = cfg.getValues()['domain'] || 'localhost';
            target  = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), '.htaccess'));

        fs.readFile(target, function(err, data) {

            var text        = data.toString(),
                rewriteBase = text.match(/[\r\s]*RewriteBase (.*?)[\s]*\n/)[1],
                url         = f('http://{0}{1}', domain, rewriteBase);

            callback({
                text        : text,
                domain      : domain,
                rewriteBase : rewriteBase,
                url         : url
            });

        });

    },

    // }}}
    // {{{ getSdkVersion

    getSdkVersion: function(callback) {

        var me      = this,
            fs      = require('fs'),
            path    = require('path'),
            f       = CLI.String.format,
            target  = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), 'mods/MicroField/libs/version.php'));

        fs.readFile(target, function(err, data) {

            var text = data.toString(),
                m;

            m = text.match(/define.*\(.?['|"]+MICROFIELD_VERSION['|"]+.?,.?['|"]+(.*)['|"]+\).?;/);

            // TODO: エラー処理

            callback({
                text        : text,
                version     : new CLI.Version(m[1])
            });

        });

    },

    // }}}
    // {{{ getLatestVersion

    getLatestVersion: function(callback) {

        var me      = this,
            request = require("request"),
            f       = CLI.String.format,
            cfg     = MicroField.config.Config.getValues();

        request({
            url     : f('{0}?access_token={1}', cfg.releasesUrl, cfg.accessToken),
            method  : 'GET',
            headers : {
                'User-Agent': 'request'
            }
        }, function(err, res, body) {

            // TODO: エラー処理

            var versions    = [],
                data        = CLI.decode(body),
                latest;

            CLI.iterate(data, function(item) {

                // ドラフトは含まない
                if (item.draft === false) {
                    versions.push(item.tag_name);
                }

            });

            // 最新バージョンを算出
            CLI.iterate(versions, function(version, num) {

                if (!latest) {
                    latest = new CLI.Version(version);
                    latest.tarball_url = data[num].tarball_url;
                    latest.zipball_url = data[num].zipball_url;
                }

                if (latest.isLessThan(version)) {
                    latest = new CLI.Version(version);
                    latest.tarball_url = data[num].tarball_url;
                    latest.zipball_url = data[num].zipball_url;
                }

            });

            callback(latest);

        });

    },

    // }}}
    // {{{ getArchive

    getArchive: function(latest, callback) {

        var me      = this,
            fs      = require('fs'),
            path    = require('path'),
            temp    = require('temp'),
            request = require("request"),
            amdzip  = require('adm-zip'),
            f       = CLI.String.format,
            cfg     = MicroField.config.Config.getValues(),
            bar;

        temp.mkdir(MicroField.app.getName(), function(err, dirPath) {

            // TODO:　エラー処理
            if (!err) {

                var buf = '';

                request({
                    url     : f('{0}?access_token={1}', latest.zipball_url, cfg.accessToken),
                    method  : 'GET',
                    headers : {
                        'User-Agent': 'request'
                    }
                }, function(err, res, body) {

                    var target = dirPath + '/latest.zip';

                    fs.writeFile(target, body, 'binary', function() {

                        // [INF] Unzipping ...
                        MicroField.app.log.info('Unzipping ...');

                        // zipファイル読み込み
                        var zip = new amdzip(target);

                        // 解凍先のフォルダ名取得
                        var folderName = zip.getEntries()[0].entryName;

                        // 解凍
                        zip.extractAllTo(dirPath, true);

                        // ディレクトリ名変更
                        fs.rename(path.join(dirPath, folderName), path.join(dirPath, 'latest'), function() {

                            // zipファイル削除
                            fs.unlink(target, function() {

                                // [INF] Got MicroField SDK vX.X.X
                                MicroField.app.log.info('Got MicroField SDK v' + latest.version);

                                callback(path.join(dirPath, 'latest'));

                            });

                        });

                    });

                }).on('data', function(chunk) {

                    buf += chunk;
                    bar.tick(chunk.length);

                }).on('response', function (res) {

                    res.setEncoding('binary');

                    bar = me.progress('  ' + me.colors.green('Downloading MicroField SDK v' + latest.version) + ' [:bar] :percent :etas', {
                        complete: '=',
                        incomplete: ' ',
                        width: 20,
                        total: parseInt(res.headers['content-length'], 10)
                    });

                }).on('error', function (err) {

                    callback();

                });

            }

        });

    },

    // }}}
    // {{{ getVersionSum

    getVersionSum: function(sdk, latest, callback) {



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
