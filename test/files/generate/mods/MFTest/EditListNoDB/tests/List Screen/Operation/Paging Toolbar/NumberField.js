/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

*/

/**
 * Number Field
 */
describe('Number Field', function(t) {

    var cfg = t.testConfig;

    // {{{ Exist Page

    t.it('Exist Page', function(t) {
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
            // Input page number(50)
            function(next) {
                t.waitFor(function() {
                    return !t.getFields().List.inputItem.disabled;
                }, function() {
                    t.getFields().List.inputItem.setValue('50');
                    t.getFields().List.inputItem.focus();
                    next();
                });
            },
            // Press ENTER key
            // Move to 50th page.
            function(next) {
                var store   = t.getViews().List.getStore();
                t.waitForStoresToLoad(store, function() {
                    t.is(store.lastOptions.page, 50, 'Move to 50th page.');
                    next();
                });
                t.keyPress(t.getFields().List.inputItem, 'ENTER');
            }
        );
    });

    // }}}
    // {{{ Non Existing Page

    t.it('Non Existing Page', function(t) {
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
            // Input page number(5000)
            function(next) {
                t.waitFor(function() {
                    return !t.getFields().List.inputItem.disabled;
                }, function() {
                    t.getFields().List.inputItem.setValue('5000');
                    t.getFields().List.inputItem.focus();
                    next();
                });
            },
            // Press ENTER key
            // Move to last page.
            function(next) {
                var store   = t.getViews().List.getStore();
                t.waitForStoresToLoad(store, function() {
                    t.is(store.lastOptions.page, 100, 'Move to last page.');
                    next();
                });
                t.keyPress(t.getFields().List.inputItem, 'ENTER');
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
