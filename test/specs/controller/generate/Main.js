/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * This file is part of MicroField CLI
 */

// {{{ helper

require('../../../helper.js');

// }}}
// {{{ microfield generate

describe("microfield generate", function() {

    var cfg         = getMicroFieldConfig(),
        rewriteBase = 'micro-field-cli-test-generate',
        currentPath = process.cwd(),
        programPath = 'node ' + currentPath + '/bin/index.js',
        targetPath  = path.join(getHomePath(), 'UserDir', rewriteBase, 'public_html'),
        decidedIt   = ((!cfg || !cfg.releasesUrl || !cfg.accessToken) ? it.skip : it);

    // {{{ setup for generate test

    decidedIt("setup for generate test", function(next) {
        setupAchive(rewriteBase, null, function(targetPath) {
            next();
        });
    });

    // }}}
    // {{{ generate header

    decidedIt("generate header", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate header MFTest/Header', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // Headerテンプレート生成テスト


            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

    });

    // }}}
    // {{{ generate header duplicate

    decidedIt("generate header duplicate", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate header MFTest/Header', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // 重複エラーテスト




            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

    });

    // }}}
    // {{{ generate footer

    decidedIt("generate footer", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate footer MFTest/Footer', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // Footerテンプレート生成テスト



            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

    });

    // }}}
    // {{{ generate footer duplicate

    decidedIt("generate footer duplicate", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate footer MFTest/Footer', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // 重複エラーテスト



            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

    });

    // }}}
    // {{{ generate navigation

    decidedIt("generate navigation", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate navigation MFTest/Navigation', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // Navigationテンプレート生成テスト


            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

    });

    // }}}
    // {{{ generate navigation duplicate

    decidedIt("generate navigation duplicate", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate navigation MFTest/Navigation', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // 重複エラーテスト


            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

    });

    // }}}
    // {{{ generate tabletnavigation

    decidedIt("generate tabletnavigation", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate tabletnavigation MFTest/TabletNavigation', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // TabletNavigationテンプレート生成テスト



            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

    });

    // }}}
    // {{{ generate tabletnavigation duplicate

    decidedIt("generate tabletnavigation duplicate", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate tabletnavigation MFTest/TabletNavigation', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // 重複エラーテスト


            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

    });

    // }}}
    // {{{ generate base

    decidedIt("generate base", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate base MFTest/Base', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // Baseテンプレート生成テスト


            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

    });

    // }}}
    // {{{ generate base duplicate

    decidedIt("generate base duplicate", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate base MFTest/Base', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // 重複エラーテスト


            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

    });

    // }}}
    // {{{ generate edit

    decidedIt("generate edit", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate edit MFTest/Edit', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // Editテンプレート生成テスト


            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

    });

    // }}}
    // {{{ generate edit duplicate

    decidedIt("generate edit duplicate", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate edit MFTest/Edit', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // 重複エラーテスト


            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

    });

    // }}}
    // {{{ generate editlist

    decidedIt("generate editlist", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate editlist MFTest/EditList', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // EditListテンプレート生成テスト



            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

    });

    // }}}
    // {{{ generate editlist duplicate

    decidedIt("generate editlist duplicate", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate editlist MFTest/EditList', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // 重複エラーテスト


            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
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
