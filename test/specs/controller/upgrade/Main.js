/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * This file is part of MicroField CLI
 */

// {{{ helper

require('../../../helper.js');

// }}}
// {{{ microfield upgrade

describe("microfield upgrade", function() {

    var cfg         = getMicroFieldConfig(),
        rewriteBase = 'micro-field-cli-test-upgrade',
        decidedIt   = ((!cfg || !cfg.releasesUrl || !cfg.accessToken) ? it.skip : it);

        // TODO: とりあえずテストから外すため、後で削除
        decidedIt = it.skip;

    // {{{ setup

    decidedIt("upgrade", function(next) {

        execChildProcess('cat ' + currentPath + '/test/clear.sql|mysql -uroot', function(err, stdout, stderr) {

            upgradeAchive(rewriteBase, null, function(targetPath) {

                // TODO: まず、ちゃんとアップグレードできるようにする
                // TODO:　テストケース追加

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
