/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

*/

/**
 * Remove
 */
describe('Remove', function(t) {

    var cfg = t.testConfig,
        secondText;

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
        // Input search text
        function(next) {
            t.setText(t.getFields().List.fieldSearch, '@example.net', next);
        },
        // Press ENTER key
        function(next) {
            var store = t.getViews().List.getStore();
            t.waitForStoresToLoad(store, function() {
                next();
            });
            t.pass('Press ENTER key');
            t.keyPress(t.getFields().List.fieldSearch, 'ENTER');
        },
        // Get second row text
        function(next) {
            var row = t.getViews().List.getStore().getAt(1);
            secondText = row.get(cfg.columnName);
            next();
        },
        // Select first row
        function(next) {
            t.pass('Select first row');
            t.getViews().List.getSelectionModel().selectRange(0, 0);
            next();
        },
        // Click Remove Button
        function(next) {
            t.pass('Click Remove Button');
            t.click(t.getButtons().List.btnRemove);
            next();
        },
        // Click Yes Button
        function(next) {
            t.waitForComponentVisible(Ext.Msg, function() {
                var yes = Ext.ComponentQuery.query('button[itemId=yes]', Ext.Msg)[0];
                t.waitForStoresToLoad(t.getViews().List.getStore(), next);
                t.pass('Click Yes Button');
                t.click(yes);
            });
        },
        // loaded text and backup text is same.
        function(next) {
            var row = t.getViews().List.getStore().getAt(0);
            t.is(row.get(cfg.columnName), secondText, 'loaded text and backup text is same.');
            next();
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
