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
            // Click Reset Button
            function(next) {
                t.pass('Click Reset Button');
                t.click(t.getButtons().Edit.btnReset, next);
            },
            // Do not change url hash.
            function(next) {
                t.is(location.hash, Ext.String.format('#\{0\}/new', t.getScreenName()), 'Do not change url hash.');
                next();
            },
            // TextField is empty.
            function(next) {
                t.is(t.getFields().Edit[cfg.fieldName].getValue(), '', 'TextField is empty.');
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
            // Click Reset Button
            function(next) {
                t.pass('Click Reset Button');
                t.click(t.getButtons().Edit.btnReset, next);
            },
            // TextField is empty.
            function(next) {
                t.is(t.getFields().Edit[cfg.fieldName].getValue(), '', 'TextField is empty.');
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
