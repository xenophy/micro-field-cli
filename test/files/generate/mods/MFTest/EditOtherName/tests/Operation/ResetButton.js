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

        // Click Reset Button
        // Click event do not fire.
        t.chain(
            function(next) {
                t.wontFire(t.getButtons().Edit.btnReset, 'click');
                t.pass('Click Reset Button');
                t.click(t.getButtons().btnReset, function() {
                    t.pass('Click event do not fire.');
                    next();
                });
            }
        );

    });

    // }}}
    // {{{ Edited

    t.it('Edited', function(t) {

        t.chain(
            // Load data
            function(next) {
                t.getViews().Edit.load({
                    success: next
                });
            },
            // Input dummy text
            function(next) {
                t.setText(t.getFields().Edit[cfg.fieldName], cfg.dummyText, next);
            },
            // Click Reset Button
            // Reset to initial text.
            function(next) {
                t.pass('Click Reset Button');
                t.click(t.getButtons().Edit.btnReset, function() {
                    t.is(t.getFields().Edit[cfg.fieldName].getValue(), '', 'Reset to initial text.');
                    next();
                });
            },
            // Input dummy text
            function(next) {
                t.setText(t.getFields().Edit[cfg.fieldName], cfg.dummyText, next);
            },
            // Click Save Button
            function(next) {
                t.pass('Click Save Button');
                t.click(t.getButtons().Edit.btnSave, next);
            },
            // Wait for save
            function(next) {
                t.waitFor(function() {
                    return MicroField.controlBeforeUnload === false;
                }, next);
            },
            // Move to default screen
            t.gotoDefaulScreen(),
            // Move to target screen
            t.gotoTargetScreen(),
            // Wait for start loading
            function(next) {
                t.waitFor(function() {
                    return t.getViews().Edit.loading === true;
                }, next);
            },
            // Wait for loaded
            function(next) {
                t.waitFor(function() {
                    return t.getViews().Edit.loading === false;
                }, next);
            },
            // Input modified text
            function(next) {
                t.setText(t.getFields().Edit[cfg.fieldName], cfg.modifiedText, next);
            },
            // Click Reset Button
            // Reset to initial text.
            function(next) {
                t.pass('Click Reset Button');
                t.click(t.getButtons().Edit.btnReset, function() {
                    t.is(t.getFields().Edit[cfg.fieldName].getValue(), cfg.dummyText, 'Reset to initial text.');
                    next();
                });
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
