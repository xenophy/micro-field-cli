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
            // First Button is disabled.
            function(next) {
                t.ok(t.getButtons().List.first.disabled, 'First Button is disabled.');
                next();
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
            // First Button is enabled.
            function(next) {
                t.notOk(t.getButtons().List.first.disabled, 'First Button is enabled.');
                next();
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
