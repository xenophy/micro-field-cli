/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

*/

/**
 * First Button
 */
describe('First Button', function(t) {

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
            // Click First Button
            // Do not change page.
            function(next) {
                t.pass('Click First Button');
                t.click(t.getButtons().List.first, function() {
                    t.is(t.getViews().List.getStore().lastOptions.page, 1, 'Do not change page.');
                    next();
                });
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
            // Click First Page
            // Move to first page.
            function(next) {
                t.pass('Click First Page');
                t.click(t.getButtons().List.first, function() {
                    t.is(t.getViews().List.getStore().lastOptions.page, 1, 'Move to first page.');
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
