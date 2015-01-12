/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

*/

/**
 * No Button
 */
describe('No Button', function(t) {

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
        // Close confirm message box.
        function(next) {
            var no = Ext.ComponentQuery.query('button[itemId=no]', Ext.Msg)[0];
            t.pass('Click No Button');
            t.click(no, function() {
                t.notOk(Ext.Msg.isVisible(), 'Close confirm message box.');
                next();
            });
        },
        // Click Cancel Button
        function(next) {
            t.pass('Click Cancel Button');
            t.click(t.getButtons().Edit.btnCancel, next);
        },
        // Click No Button
        // Do not change url hash.
        function(next) {
            var no = Ext.ComponentQuery.query('button[itemId=no]', Ext.Msg)[0];
            t.pass('Click No Button');
            t.click(no, function() {
                t.is(location.hash, Ext.String.format('#\{0\}/new', t.getScreenName()), 'Do not change url hash.');
                next();
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
