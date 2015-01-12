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
        // Insert test data
        function(next) {
            t.pass('Insert test data');
            t.directConfig.insertTestData(function() {
                next();
            });
        },
        // Load store
        function(next) {
            var store = t.getViews().List.getStore();
            t.waitForStoresToLoad(store, next);
            store.load();
        },
        // Wait for loaded
        function(next) {
            t.waitFor(function() {
                return t.getViews().List.loading === false;
            }, next);
        },
        // Move to edit screen
        function(next) {
            t.changeScreen('#' + t.getScreenName() + '/1');
            next();
        },
        // Wait for show screen
        function(next) {
            t.waitForShowTargetView(t.getViews().Edit, next);
        },
        // Wait for loaded
        function(next) {
            t.waitFor(function() {
                return t.getViews().Edit.loading === false;
            }, function() {
                textdata = t.getFields().Edit[cfg.fieldName].getValue();
                next();
            });
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
        function(next) {
            var yes = Ext.ComponentQuery.query('button[itemId=yes]', Ext.Msg)[0];
            t.pass('Click No Button');
            t.click(yes, function() {
                t.notOk(Ext.Msg.isVisible(), 'Close confirm message box.');
                next();
            });
        },
        // Move to list screen.
        function(next) {
            t.waitForShowTargetView(t.getViews().List, function() {
                t.is(location.hash, Ext.String.format('#\{0\}', t.getScreenName()), 'Move to list screen.');
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
