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
        }

        var errMsg = 'このテストには、configでアクセスキーが設定されている必要があります。';

        assert.ok(exists, errMsg);

        if (exists) {
            assert.ok(JSON.parse(fs.readFileSync(path.join(filepath, filename))).accessToken, errMsg);
        }

    });

    // }}}
    // {{{ afterEach

    afterEach(function() {
    });

    // }}}
    // {{{ setup

    it("setup", function(next) {

        // UserDir/micro-field-cli-setuptestディレクトリ作成


        // MicroField SDKダウンロード、UserDir/micro-field-cli-setuptestに展開





        next();

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
