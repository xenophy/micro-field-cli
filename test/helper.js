/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * This file is part of MicroField CLI
 */

(function() {

    "use strict";

    // {{{ cli-framework

    require('cli-framework');

    // }}}
    // {{{ assert

    global.assert = require('power-assert');

    // }}}
    // {{{ colors

    global.colors = require('colors');

    // }}}
    // {{{ fs

    global.fs = require('fs-extra');

    // }}}
    // {{{ path

    global.path = require('path');

    // }}}
    // {{{ request

    global.request = require("request");

    // }}}
    // {{{ temp

    global.temp = require("temp");

    // }}}
    // {{{ amdzip

    global.amdzip = require('adm-zip');

    // {{{ currentPath

    global.currentPath = process.cwd();

    // }}}
    // {{{ programPath

    global.programPath = 'node ' + currentPath + '/bin/index.js';

    // }}}
    // {{{ getTargetPath

    global.getTargetPath = function(rewriteBase) {
        return path.join(getHomePath(), 'UserDir', rewriteBase, 'public_html');
    };

    // }}}
    // {{{ removeComment

    global.removeComment = function(src) {

        // ソースコードコメント、スペース、改行削除
        src = src.replace(/\/\/.*?\n/g, '');
        src = src.split("\n");
        CLI.iterate(src, function(line, i) {
            src[i] = line.replace(/^[\s　]+|[\s　]+$/g, '');
        });
        src = src.join("\n");

        // 複数行のコメント削除
        src = src.replace(/\/\*[\s\S]*?\*\//g, '');

        // 単行コメント削除
        src = src.replace(/\s*\/\/.*$/g, '');

        return src;

    };

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
    // {{{ getLatestBeforeVersion

    global.getLatestBeforeVersion = function(releasesUrl, accessToken, callback) {

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
                latest, beforeLatest;

            CLI.iterate(data, function(item) {

                // ドラフトは含まない
                if (item.draft === false) {
                    versions.push(item.tag_name);
                }

            });

            var target = versions[1];

            // 最新バージョンの一つ前のバージョンを算出
            CLI.iterate(versions, function(version, num) {

                latest = new CLI.Version(version);
                latest.tarball_url = data[num].tarball_url;
                latest.zipball_url = data[num].zipball_url;

                if (latest.version === target) {
                    beforeLatest = latest;
                }

            });

            callback(beforeLatest);

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

    global.setupAchive = function(rewriteBase, before, callback) {

        var fs          = require('fs-extra'),
            path        = require('path'),
            homePath    = getHomePath(),
            cfg         = getMicroFieldConfig(),
            userdir     = path.join('UserDir', rewriteBase),
            targetPath  = path.join(homePath, userdir);

        before = before || function(next) {
            next();
        };

        // ターゲットディレクトリにpublic_htmlを追加
        targetPath = path.join(targetPath, 'public_html');

        // ユーザーディレクトリ作成
        fs.mkdirsSync(targetPath);

        // 最新バージョン情報取得
        getLatestVersion(cfg.releasesUrl, cfg.accessToken, function(latest) {

            // 最新アーカイブ取得
            getArchive(latest, cfg.accessToken, function(archivePath) {

                // アーカイブ内容をユーザーディレクトリにコピー
                fs.copySync(archivePath, targetPath);

                // .htaccessの内容取得、変更
                fs.writeFileSync(
                    path.join(targetPath, '.htaccess'),
                    fs.readFileSync(
                        path.join(targetPath, '.htaccess')
                    ).toString().replace(
                        /[\r\s]*RewriteBase (.*?)[\s]*\n/,
                        "\n    RewriteBase /~" + rewriteBase + "\n\n"
                    ),
                    'utf8'
                );

                // カレントディレクトリ取得
                var currentPath = process.cwd();

                // 作業ディレクトリへ移動
                process.chdir(targetPath);

                // setupコマンド実行
                execChildProcess('node ' + currentPath + '/bin/index.js setup', function(err, stdout, stderr) {

                    before(function() {

                        // カレントディレクトリ復元
                        process.chdir(currentPath);

                        // コールバック実行
                        callback(targetPath);

                    });

                });

            });

        });

    };

    // }}}
    // {{{ upgradeAchive

    global.upgradeAchive = function(rewriteBase, before, callback) {

        var fs          = require('fs-extra'),
            path        = require('path'),
            homePath    = getHomePath(),
            cfg         = getMicroFieldConfig(),
            userdir     = path.join('UserDir', rewriteBase),
            targetPath  = path.join(homePath, userdir);

        before = before || function(next) {
            next();
        };

        // ターゲットディレクトリにpublic_htmlを追加
        targetPath = path.join(targetPath, 'public_html');

        // ユーザーディレクトリ作成
        fs.mkdirsSync(targetPath);

        // 最新バージョンの一つ前のバージョン情報取得
        getLatestBeforeVersion(cfg.releasesUrl, cfg.accessToken, function(latest) {

            // 最新アーカイブ取得
            getArchive(latest, cfg.accessToken, function(archivePath) {

                // アーカイブ内容をユーザーディレクトリにコピー
                fs.copySync(archivePath, targetPath);

                // .htaccessの内容取得、変更
                fs.writeFileSync(
                    path.join(targetPath, '.htaccess'),
                    fs.readFileSync(
                        path.join(targetPath, '.htaccess')
                    ).toString().replace(
                        /[\r\s]*RewriteBase (.*?)[\s]*\n/,
                        "\n    RewriteBase /~" + rewriteBase + "\n\n"
                    ),
                    'utf8'
                );

                // カレントディレクトリ取得
                var currentPath = process.cwd();

                // 作業ディレクトリへ移動
                process.chdir(targetPath);

                // setupコマンド実行
                execChildProcess('node ' + currentPath + '/bin/index.js setup', function(err, stdout, stderr) {

                    // upgradeコマンド実行
                    execChildProcess('node ' + currentPath + '/bin/index.js upgrade', function(err, stdout, stderr) {

                        before(function() {

                            // カレントディレクトリ復元
                            process.chdir(currentPath);

                            // コールバック実行
                            callback(targetPath);

                        });

                    });

                });

            });

        });

    };

    // }}}
    // {{{ moveToWorkDirectory

    global.moveToWorkDirectory = function(rewriteBase) {

        // カレントディレクトリ取得
        var currentPath = process.cwd(),
            targetPath  = path.join(homePath, path.join('UserDir', rewriteBase));

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

    };

    // }}}
    // {{{ getMicroFieldConfig

    global.getMicroFieldConfig = function() {

        var fs          = require('fs-extra'),
            path        = require('path'),
            homePath    = getHomePath(),
            filename    = '.microfieldclicfg.json',
            exists      = false,
            cfg         = false;

        if (fs.existsSync(path.join(homePath, filename))) {
            exists = true;
        }

        if (exists) {

            cfg = JSON.parse(fs.readFileSync(path.join(homePath, filename)));

        }

        return cfg;

    };

    // }}}
    // {{{ getHomePath

    global.getHomePath = function() {

        var path = require('path');

        return path.resolve(path.join(process.env[CLI.isWindows ? 'USERPROFILE' : 'HOME']));

    };

    // }}}
    // {{{ MicroField

    global.MicroField = {
        manifest: JSON.parse(
            require('fs').readFileSync(__dirname + '/../package.json').toString('utf8')
        )
    };

    // }}}
    // {{{ getTargetConfig

    global.getTargetConfig = function(targetPath) {

        return CLI.decode(
            removeComment(
                fs.readFileSync(path.join(targetPath, 'mods/microfield.json')).toString()
            )
        );
    };

    // }}}
    // {{{ preg_quote

    global.preg_quote = function(str, delimiter) {
        return (str + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
    };

    // }}}
    // {{{ CLIクラスローダー設定

    CLI.Loader.setConfig({
        enabled : true,
        paths   : {
            'MicroField' : currentPath + '/app'
        }
    });

    // }}}
    // {{{ MicroField.database.Manager

    CLI.require('MicroField.database.Manager');

    // }}}

})();

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
