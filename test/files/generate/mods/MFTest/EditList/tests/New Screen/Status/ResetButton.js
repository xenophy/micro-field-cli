/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

*/

/**
 * Reset Button
 */
describe('Reset Button', function(t) {

    var cfg = t.testConfig;

    // {{{ Unedited

    t.it('Unedited', function(t) {
        t.chain(
            // Move to new screen
            function(next) {
                t.changeScreen('#' + t.getScreenName() + '/new');
                next();
            },
            // Wait for show screen
            function(next) {
                t.waitForShowTargetView(t.getViews().Edit, next);
            },
            // Reset Button is disabled.
            function(next) {
                t.ok(t.getButtons().Edit.btnReset.disabled, 'Reset Button is disabled.');
                next();
            }
        );
    });

    // }}}
    // {{{ Edited

    t.it('Edited', function(t) {
        t.chain(
            // Move to new screen
            function(next) {
                t.changeScreen('#' + t.getScreenName() + '/new');
                next();
            },
            // Wait for show screen
            function(next) {
                t.waitForShowTargetView(t.getViews().Edit, next);
            },
            // Input dummy text
            function(next) {
                t.setText(t.getFields().Edit[cfg.fieldName], cfg.dummyText, next);
            },
            // Reset Button is enabled.
            function(next) {
                t.notOk(t.getButtons().Edit.btnReset.disabled, 'Reset Button is enabled.');
                next();
            }
        );
    });

    // }}}

});

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
