/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

*/

/**
 * Yes Button
 */
describe('Yes Button', function(t) {

    var cfg = t.testConfig;

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
                next();
            });
        },
        // Click Yes Button
        // Close confirm message box.
        // Move to list screen.
        function(next) {
            var yes = Ext.ComponentQuery.query('button[itemId=yes]', Ext.Msg)[0];
            t.pass('Click Yes Button');
            t.click(yes, function() {
                t.notOk(Ext.Msg.isVisible(), 'Close confirm message box.');
                t.waitForShowTargetView(t.getViews().Edit, function() {
                    t.is(location.hash, Ext.String.format('#\{0\}', t.getScreenName()), 'Move to list screen.');
                    next();
                });
            });
        }
    );

});

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
