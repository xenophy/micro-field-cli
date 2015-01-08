/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * This file is part of MicroField CLI
 */


// {{{ helper

require('../../../helper.js');

// }}}
// {{{ microfield config

describe("microfield config", function() {

    var fs          = require('fs'),
        path        = require('path'),
        filepath    = path.resolve(path.join(process.env[CLI.isWindows ? 'USERPROFILE' : 'HOME']));
        filename    = '.microfieldclicfg.json',
        exists      = false;

    // {{{ beforeEach

    beforeEach(function() {

        // 既存の設定ファイル存在確認
        if (fs.existsSync(path.join(filepath, filename))) {

            exists = true;

            // リネーム
            fs.renameSync(path.join(filepath, filename), path.join(filepath, '.microfieldclicfg.json.testbackup'));

        }

    });

    // }}}
    // {{{ afterEach

    afterEach(function() {

        if (exists) {

            // リネーム
            fs.renameSync(path.join(filepath, '.microfieldclicfg.json.testbackup'), path.join(filepath, filename));

        }

    });

    // }}}
    // {{{ new

    it("new", function(next) {

        execChildProcess('node bin/index.js config', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // ファイルが生成されること
            assert.ok(fs.existsSync(path.join(filepath, filename)));

            // 内容が空であること
            var comp = [
                'MicroField CLI v{0}'.bold,
                '',
                'microfield config'.yellow,
                'Management MicroField CLI configuration.',
                '',
                '',
                ''
            ].join("\n");

            comp = CLI.String.format(
                comp,
                MicroField.manifest.version
            );

            assert.equal(stdout, comp);

            next();
        });

    });

    // }}}
    // {{{ apply accessToken

    it("apply accessToken", function(next) {

        execChildProcess('node bin/index.js config --accessToken=123456789', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // 設定処理メッセージが表示されること
            var comp = [
                'MicroField CLI v{0}'.bold,
                '',
                '{1} Set {2} to "{3}"',
                '',
            ].join("\n");

            comp = CLI.String.format(
                comp,
                MicroField.manifest.version,
                '[INF]'.green.bold,
                'accessToken'.green,
                '123456789'.bold
            );

            assert.equal(stdout, comp);

            // 設定した内容がファイルに反映されていること
            assert.equal(JSON.parse(fs.readFileSync(path.join(filepath, filename))).accessToken, '123456789');

            execChildProcess('node bin/index.js config', function(err, stdout, stderr) {

                assert.equal(err, null);
                assert.equal(stderr, '');

                // 設定が反映されていること
                var comp = [
                    'MicroField CLI v{0}'.bold,
                    '',
                    'microfield config'.yellow,
                    'Management MicroField CLI configuration.',
                    '',
                    'Settings'.underline,
                    '  * {1}: 123456789',
                    '',
                    ''
                ].join("\n");

                comp = CLI.String.format(
                    comp,
                    MicroField.manifest.version,
                    tagSpacer('accessToken').bold.green
                );

                assert.equal(stdout, comp);

                next();
            });

        });

    });

    // }}}
    // {{{ apply extPath

    it("apply extPath", function(next) {

        execChildProcess('node bin/index.js config --extPath=~/Library/Sencha/ext-5.1.0', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // 設定処理メッセージが表示されること
            var comp = [
                'MicroField CLI v{0}'.bold,
                '',
                '{1} Set {2} to "{3}"',
                '',
            ].join("\n");

            comp = CLI.String.format(
                comp,
                MicroField.manifest.version,
                '[INF]'.green.bold,
                'extPath'.green,
                '~/Library/Sencha/ext-5.1.0'.bold
            );

            assert.equal(stdout, comp);

            // 設定した内容がファイルに反映されていること
            assert.equal(JSON.parse(fs.readFileSync(path.join(filepath, filename))).extPath, '~/Library/Sencha/ext-5.1.0');

            execChildProcess('node bin/index.js config', function(err, stdout, stderr) {

                assert.equal(err, null);
                assert.equal(stderr, '');

                // 設定が反映されていること
                var comp = [
                    'MicroField CLI v{0}'.bold,
                    '',
                    'microfield config'.yellow,
                    'Management MicroField CLI configuration.',
                    '',
                    'Settings'.underline,
                    '  * {1}: ~/Library/Sencha/ext-5.1.0',
                    '',
                    ''
                ].join("\n");

                comp = CLI.String.format(
                    comp,
                    MicroField.manifest.version,
                    tagSpacer('extPath').bold.green
                );

                assert.equal(stdout, comp);

                next();
            });

        });

    });

    // }}}
    // {{{ apply releasesUrl

    it("apply releasesUrl", function(next) {

        execChildProcess('node bin/index.js config --releasesUrl=https://api.github.com/repos/xenophy/micro-field/releases', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // 設定処理メッセージが表示されること
            var comp = [
                'MicroField CLI v{0}'.bold,
                '',
                '{1} Set {2} to "{3}"',
                '',
            ].join("\n");

            comp = CLI.String.format(
                comp,
                MicroField.manifest.version,
                '[INF]'.green.bold,
                'releasesUrl'.green,
                'https://api.github.com/repos/xenophy/micro-field/releases'.bold
            );

            assert.equal(stdout, comp);

            // 設定した内容がファイルに反映されていること
            assert.equal(JSON.parse(fs.readFileSync(path.join(filepath, filename))).releasesUrl, 'https://api.github.com/repos/xenophy/micro-field/releases');

            execChildProcess('node bin/index.js config', function(err, stdout, stderr) {

                assert.equal(err, null);
                assert.equal(stderr, '');

                // 設定が反映されていること
                var comp = [
                    'MicroField CLI v{0}'.bold,
                    '',
                    'microfield config'.yellow,
                    'Management MicroField CLI configuration.',
                    '',
                    'Settings'.underline,
                    '  * {1}: https://api.github.com/repos/xenophy/micro-field/releases',
                    '',
                    ''
                ].join("\n");

                comp = CLI.String.format(
                    comp,
                    MicroField.manifest.version,
                    tagSpacer('releasesUrl').bold.green
                );

                assert.equal(stdout, comp);

                next();
            });

        });

    });

    // }}}
    // {{{ apply domain

    it("apply domain", function(next) {

        execChildProcess('node bin/index.js config --domain=localhost', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // 設定処理メッセージが表示されること
            var comp = [
                'MicroField CLI v{0}'.bold,
                '',
                '{1} Set {2} to "{3}"',
                '',
            ].join("\n");

            comp = CLI.String.format(
                comp,
                MicroField.manifest.version,
                '[INF]'.green.bold,
                'domain'.green,
                'localhost'.bold
            );

            assert.equal(stdout, comp);

            // 設定した内容がファイルに反映されていること
            assert.equal(JSON.parse(fs.readFileSync(path.join(filepath, filename))).domain, 'localhost');

            execChildProcess('node bin/index.js config', function(err, stdout, stderr) {

                assert.equal(err, null);
                assert.equal(stderr, '');

                // 設定が反映されていること
                var comp = [
                    'MicroField CLI v{0}'.bold,
                    '',
                    'microfield config'.yellow,
                    'Management MicroField CLI configuration.',
                    '',
                    'Settings'.underline,
                    '  * {1}: localhost',
                    '',
                    ''
                ].join("\n");

                comp = CLI.String.format(
                    comp,
                    MicroField.manifest.version,
                    tagSpacer('domain').bold.green
                );

                assert.equal(stdout, comp);

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
