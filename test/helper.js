/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * This file is part of MicroField CLI
 */

(function() {

    "use strict";

    // {{{ cli-framework

    require('cli-framework');

    // }}}
    // {{{ request

    var request = require("request");

    // }}}
    // {{{ temp

    var temp = require("temp");

    // }}}
    // {{{ amdzip

    var amdzip = require('adm-zip');

    // }}}
    // {{{ fs

    var fs = require('fs-extra');

    // }}}
    // {{{ path

    var path = require('path');

    // }}}
    // {{{ execChildProcess

    var exec = require('child_process').exec;

    global.execChildProcess = function(cmd, callback) {

        var child = exec(cmd, function(err, stdout, stderr) {
            callback(err, stdout, stderr);
        });

    };

    // }}}
    // {{{ spacer

    global.tagSpacer = function(tag) {
        return tag + CLI.String.repeat(' ', 18 - tag.length);
    };

    // }}}
    // {{{ getLatestVersion

    global.getLatestVersion = function(releasesUrl, accessToken, callback) {

        var f = CLI.String.format;

        request({
            url     : f('{0}?access_token={1}', releasesUrl, accessToken),
            method  : 'GET',
            headers : {
                'User-Agent': 'request'
            }
        }, function(err, res, body) {

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

    };

    // }}}
    // {{{ getArchive

    global.getArchive = function(latest, accessToken, callback) {

        var f = CLI.String.format;

        temp.mkdir('MicroFieldCLITest', function(err, dirPath) {

            var buf = '';

            request({
                url     : f('{0}?access_token={1}', latest.zipball_url, accessToken),
                method  : 'GET',
                headers : {
                    'User-Agent': 'request'
                }
            }, function(err, res, body) {

                var target = dirPath + '/latest.zip';

                fs.writeFile(target, body, 'binary', function() {

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

                            callback(path.join(dirPath, 'latest'));

                        });

                    });

                });

            }).on('data', function(chunk) {

                if (chunk) {
                    buf += chunk;
                }

            }).on('response', function (res) {

                res.setEncoding('binary');

            }).on('error', function (err) {

                callback();

            });

        });

    };

    // }}}
    // {{{ setupAchive

    global.setupAchive = function(rewriteBase, callback) {



    };

    // }}}
    // {{{ MicroField

    global.MicroField = {
        manifest: JSON.parse(
            require('fs').readFileSync(__dirname + '/../package.json').toString('utf8')
        )
    };

    // }}}


})();

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
