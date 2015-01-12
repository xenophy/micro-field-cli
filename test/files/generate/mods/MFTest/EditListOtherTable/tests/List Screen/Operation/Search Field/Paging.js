/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

*/

/**
 * Paging
 */
describe('Paging', function(t) {

    var cfg = t.testConfig,
        totalCount;

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
        // Got total count is xxx.
        function(next) {
            var store = t.getViews().List.getStore();
            t.waitForStoresToLoad(store, function() {
                totalCount = store.totalCount;
                t.pass('Got total count is ' + totalCount + '.');
                next();
            });
            t.pass('Press ENTER key');
            t.keyPress(t.getFields().List.fieldSearch, 'ENTER');
        },
        // Click Next Button
        function(next) {
            var store = t.getViews().List.getStore();
            t.waitForStoresToLoad(store, next);
            t.pass('Click Next Button');
            t.click(t.getButtons().List.next);
        },
        // Do not change total count.
        function(next) {
            var store = t.getViews().List.getStore();
            t.is(store.totalCount, totalCount, 'Do not change total count.');
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
