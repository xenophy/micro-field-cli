/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

*/

/**
 * Cancel Button
 */
describe('Cancel Button', function(t) {

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
            // Click Cancel Button
            function(next) {
                t.pass('Click Cancel Button');
                t.click(t.getButtons().Edit.btnCancel, next);
            },
            // Wait for show screen
            function(next) {
                t.waitForShowTargetView(t.getViews().List, next);
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
            // Click Cancel Button
            function(next) {
                t.pass('Click Cancel Button');
                t.click(t.getButtons().Edit.btnCancel, next);
            },
            // Show confirm message box.
            function(next) {
                t.waitForComponentVisible(Ext.Msg, function() {
                    t.ok(Ext.Msg.isVisible(), 'Show confirm message box.');
                    Ext.Msg.hide();
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
