/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * This file is part of MicroField CLI
 */


// {{{ helper

require('../../../helper.js');

// }}}
// {{{ assert

var assert = require('power-assert');

// }}}
// {{{ colors

var colors = require('colors');

// }}}
// {{{ microfield setup

describe("microfield setup", function() {

    var fs          = require('fs-extra'),
        path        = require('path'),
        homePath    = path.resolve(path.join(process.env[CLI.isWindows ? 'USERPROFILE' : 'HOME'])),
        rewriteBase = 'micro-field-cli-setuptest',
        userdir     = path.join('UserDir', rewriteBase),
        filename    = '.microfieldclicfg.json',
        targetpath  = path.join(homePath, userdir),
        exists      = false,
        releasesUrl, accessToken;

    // {{{ 既存の設定ファイル存在確認

    if (fs.existsSync(path.join(homePath, filename))) {
        exists = true;
    }

    if (exists) {

        var cfg = JSON.parse(fs.readFileSync(path.join(homePath, filename)));

        releasesUrl = cfg.releasesUrl;
        accessToken = cfg.accessToken;
    }

    // }}}
    // {{{ setup

    ((!exists || !releasesUrl || !accessToken) ? it.skip : it)("setup", function(next) {

        // ターゲットディレクトリにpublic_htmlを追加
        targetpath = path.join(targetpath, 'public_html');

        // ユーザーディレクトリ作成
        fs.mkdirsSync(targetpath);

        // 最新バージョン情報取得
        getLatestVersion(releasesUrl, accessToken, function(latest) {

            // 最新アーカイブ取得
            getArchive(latest, accessToken, function(archivePath) {

                // アーカイブ内容をユーザーディレクトリにコピー
                fs.copySync(archivePath, targetpath);

                // .htaccessの内容取得、変更
                fs.writeFileSync(
                    path.join(targetpath, '.htaccess'),
                    fs.readFileSync(
                        path.join(targetpath, '.htaccess')
                    ).toString().replace(
                        /[\r\s]*RewriteBase (.*?)[\s]*\n/,
                        "\n    RewriteBase /~" + rewriteBase + "\n\n"
                    ),
                    'utf8'
                );

                // カレントディレクトリ取得
                var currentPath = process.cwd();

                // 作業ディレクトリへ移動
                process.chdir(targetpath);

                // setupコマンド実行
                execChildProcess('node ' + currentPath + '/bin/index.js setup', function(err, stdout, stderr) {

                    // .senchaディレクトリが作成されること
                    assert.ok(fs.existsSync(path.join(targetpath, '.sencha')));

                    // app.jsが存在すること
                    assert.ok(fs.existsSync(path.join(targetpath, 'app.js')));

                    // app.jsonが存在すること
                    assert.ok(fs.existsSync(path.join(targetpath, 'app.json')));

                    // app.jsとapp.js_overrideの内容が一致すること
                    assert.equal(
                        fs.readFileSync(path.join(targetpath, 'app.js')).toString(),
                        fs.readFileSync(path.join(targetpath, 'app.js_override')).toString()
                    );

                    // login/.senchaディレクトリが作成されること
                    assert.ok(fs.existsSync(path.join(targetpath, 'login', '.sencha')));

                    // login/app.jsが存在すること
                    assert.ok(fs.existsSync(path.join(targetpath, 'login', 'app.js')));

                    // login/app.jsonが存在すること
                    assert.ok(fs.existsSync(path.join(targetpath, 'login', 'app.json')));

                    // ログインができること

                    // ログイン後のページが表示されること

                    // カレントディレクトリ復元
                    process.chdir(currentPath);

                    next();

                });

            });

        });

     });

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
