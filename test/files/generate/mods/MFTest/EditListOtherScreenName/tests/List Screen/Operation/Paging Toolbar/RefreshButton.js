/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

*/

/**
 * Prev Button
 */
describe('Prev Button', function(t) {

    var cfg = t.testConfig;

    // {{{ First Page

    t.it('First Page', function(t) {
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
            // Click Refresh Button
            // Refresh store.
            function(next) {
                var store = t.getViews().List.getStore();
                t.waitForStoresToLoad(store, function() {
                    t.pass('Refresh store.');
                    next();
                });
                t.pass('Click Refresh Button');
                t.click(t.getButtons().List.refresh);
            }
        );
    });

    // }}}
    // {{{ Second Page

    t.it('Second Page', function(t) {
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
            // Move to second page
            function(next) {
                t.waitForStoresToLoad(t.getViews().List.getStore(), next);
                t.pass('Click Next Button');
                t.click(t.getButtons().List.next);
            },
            // Click Refresh Button
            // Refresh store.
            function(next) {
                var store = t.getViews().List.getStore();
                t.waitForStoresToLoad(store, function() {
                    t.pass('Refresh store.');
                    next();
                });
                t.pass('Click Refresh Button');
                t.click(t.getButtons().List.refresh);
            }
        );
    });

    // }}}
    // {{{ Last Page

    t.it('Last Page', function(t) {
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
            // Move to last page
            function(next) {
                t.waitForStoresToLoad(t.getViews().List.getStore(), next);
                t.pass('Click Last Button');
                t.click(t.getButtons().List.last);
            },
            // Click Refresh Button
            // Refresh store.
            function(next) {
                var store = t.getViews().List.getStore();
                t.waitForStoresToLoad(store, function() {
                    t.pass('Refresh store.');
                    next();
                });
                t.pass('Click Refresh Button');
                t.click(t.getButtons().List.refresh);
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
