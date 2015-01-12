/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

*/

/**
 * Save Button
 */
describe('Save Button', function(t) {

    var cfg = t.testConfig;

    // {{{ Unedited

    t.it('Unedited', function(t) {

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
            // Click Save Button
            function(next) {
                t.pass('Click Save Button');
                t.click(t.getButtons().Edit.btnSave, next);
            },
            // Do not change url hash.
            function(next) {
                t.is(location.hash, Ext.String.format('#\{0\}/1', t.getScreenName()), 'Do not change url hash.');
                next();
            }
        );

    });

    // }}}
    // {{{ Edited

    t.it('Edited', function(t) {

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
            // Input dummy text
            function(next) {
                t.setText(t.getFields().Edit[cfg.fieldName], cfg.dummyText, next);
            },
            // Click Save Button
            // loaded text and input text is same.
            function(next) {
                var store = t.getViews().List.getStore();
                t.waitForStoresToLoad(store, function() {
                    var row = store.getAt(0);
                    t.is(row.get(cfg.columnName), cfg.dummyText, 'loaded text and input text is same.');
                    next();
                });
                t.pass('Click Save Button');
                t.click(t.getButtons().Edit.btnSave);
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
