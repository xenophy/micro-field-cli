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

        // Reset Button is disabled.
        t.chain(
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
            // Input dummy text
            function(next) {
                t.setText(t.getFields().Edit[cfg.fieldName], cfg.dummyText, next);
            },
            // Reset Button is enabled.
            function(next) {
                t.notOk(t.getButtons().Edit.btnReset.disabled, 'Reset Button is enabled.');
                next();
            },
            // reset
            function(next) {
                t.getFields().Edit[cfg.fieldName].reset();
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
