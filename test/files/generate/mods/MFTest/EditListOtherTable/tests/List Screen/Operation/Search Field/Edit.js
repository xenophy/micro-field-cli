/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

*/

/**
 * Edit
 */
describe('Edit', function(t) {

    var cfg = t.testConfig,
        modifiedText;

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
        // Select first row
        function(next) {
            t.pass('Select first row');
            t.getViews().List.getSelectionModel().selectRange(0, 0);
            next();
        },
        // Click Edit Button
        function(next) {
            t.pass('Click Edit Button');
            t.click(t.getButtons().List.btnEdit);
            next();
        },
        // Wait for show screen
        function(next) {
            t.waitForShowTargetView(t.getViews().Edit, next);
        },
        // Got first row text.
        function(next) {
            t.pass('Got first row text.');
            modifiedText = t.getFields().Edit[cfg.fieldName].getValue() + '_modified';
            next();
        },
        // Input modified text
        function(next) {
            t.setText(t.getFields().Edit[cfg.fieldName], modifiedText, next);
        },
        // Click Save Button
        function(next) {
            t.waitForStoresToLoad(t.getViews().List.getStore(), next);
            t.pass('Click Save Button');
            t.click(t.getButtons().Edit.btnSave);
        },
        // Wait for show screen
        function(next) {
            t.waitForShowTargetView(t.getViews().List, next);
        },
        // loaded text and modified text is same.
        function(next) {
            var row = t.getViews().List.getStore().getAt(0);
            t.is(row.get(cfg.columnName), modifiedText, 'loaded text and modified text is same.');
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
