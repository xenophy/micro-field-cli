/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

*/

/**
 * Search
 */
describe('Search', function(t) {

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
        // Input search text
        function(next) {
            t.setText(t.getFields().List.fieldSearch, 'isotasam2156@example.net', next);
        },
        // Press ENTER key
        // Got search row.
        // Searched count is 1.
        function(next) {
            var store   = t.getViews().List.getStore();
            t.waitForStoresToLoad(store, function() {
                var row = store.getAt(0);
                t.is(row.get(cfg.columnName), 'isotasam2156@example.net', 'Got search row.');
                t.is(store.getCount(), 1, 'Searched count is 1.');
                next();
            });
            t.pass('Press ENTER key');
            t.keyPress(t.getFields().List.fieldSearch, 'ENTER');
        },
        // Click Clear Trigger
        // Search filter was removed.
        function(next) {
            var store = t.getViews().List.getStore();
            t.waitForStoresToLoad(store, function() {
                t.is(store.getCount(), 100, 'Search filter was removed.');
                next();
            });
            t.pass('Click Clear Trigger');
            t.getFields().List.fieldSearch.onTriggerClearClick();
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
