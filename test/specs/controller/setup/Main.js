/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * This file is part of MicroField CLI
 */

// {{{ helper

require('../../../helper.js');

// }}}
// {{{ microfield setup

describe("microfield setup", function() {

    var cfg         = getMicroFieldConfig(),
        rewriteBase = 'micro-field-cli-test-setup',
        decidedIt   = ((!cfg || !cfg.releasesUrl || !cfg.accessToken) ? it.skip : it);

        // TODO: とりあえずテストから外すため、後で削除
        decidedIt = it.skip;

    // {{{ setup

    decidedIt("setup", function(next) {

        execChildProcess('cat ' + currentPath + '/test/clear.sql|mysql -uroot', function(err, stdout, stderr) {

            setupAchive(rewriteBase, null, function(targetPath) {

                // .senchaディレクトリが作成されること
                assert.ok(fs.existsSync(path.join(targetPath, '.sencha')));

                // app.jsが存在すること
                assert.ok(fs.existsSync(path.join(targetPath, 'app.js')));

                // app.jsonが存在すること
                assert.ok(fs.existsSync(path.join(targetPath, 'app.json')));

                // app.jsとapp.js_overrideの内容が一致すること
                assert.equal(
                    fs.readFileSync(path.join(targetPath, 'app.js')).toString(),
                    fs.readFileSync(path.join(targetPath, 'app.js_override')).toString()
                );

                // login/.senchaディレクトリが作成されること
                assert.ok(fs.existsSync(path.join(targetPath, 'login', '.sencha')));

                // login/app.jsが存在すること
                assert.ok(fs.existsSync(path.join(targetPath, 'login', 'app.js')));

                // login/app.jsonが存在すること
                assert.ok(fs.existsSync(path.join(targetPath, 'login', 'app.json')));

                // ログインができること

                // ログイン後のページが表示されること

                next();

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
