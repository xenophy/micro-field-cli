/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

*/

/**
 * New Button
 */
describe('New Button', function(t) {

    var cfg = t.testConfig;

    // {{{ Unedited

    t.it('Unselected', function(t) {

        t.chain(
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
            // Click New Button
            function(next) {
                t.pass('Click New Button');
                t.click(t.getButtons().List.btnAdd, next);
            },
            // Wait for show screen
            function(next) {
                t.waitForShowTargetView(t.getViews().Edit, next);
            },
            // Hash is new screen
            function(next) {
                t.is(location.hash, Ext.String.format('#\{0\}/new', t.getScreenName()), 'Hash is new screen');
                next();
            }
        );

    });

    // }}}
    // {{{ Single Select

    t.it('Single Select', function(t) {

        t.chain(
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
            // Move to new screen
            function(next) {
                t.changeScreen('#' + t.getScreenName() + '/new');
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
                    t.is(store.getAt(0).get(cfg.columnName), cfg.dummyText, 'loaded text and input text is same.');
                    next();
                });
                t.pass('Click Save Button');
                t.click(t.getButtons().Edit.btnSave);
            },
            // Select first row
            function(next) {
                t.pass('Select first row');
                t.getViews().List.getSelectionModel().selectRange(0, 0);
                next();
            },
            // Click New Button
            function(next) {
                t.pass('Click New Button');
                t.click(t.getButtons().List.btnAdd, next);
            },
            // Wait for show screen
            function(next) {
                t.waitForShowTargetView(t.getViews().Edit, next);
            },
            // Hash is new screen
            function(next) {
                t.is(location.hash, Ext.String.format('#\{0\}/new', t.getScreenName()), 'Hash is new screen');
                next();
            }
        );

    });

    // }}}
    // {{{ Multi Select

    t.it('Multi Select', function(t) {

        t.chain(
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
            // Move to new screen
            function(next) {
                t.changeScreen('#' + t.getScreenName() + '/new');
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
                    t.is(store.getAt(0).get(cfg.columnName), cfg.dummyText, 'loaded text and input text is same.');
                    next();
                });
                t.pass('Click Save Button');
                t.click(t.getButtons().Edit.btnSave);
            },
            // Move to new screen
            function(next) {
                t.changeScreen('#' + t.getScreenName() + '/new');
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
                    t.is(store.getAt(0).get(cfg.columnName), cfg.dummyText, 'loaded text and input text is same.');
                    next();
                });
                t.pass('Click Save Button');
                t.click(t.getButtons().Edit.btnSave);
            },
            // Select first and second rows
            function(next) {
                t.pass('Select first and second rows');
                t.getViews().List.getSelectionModel().selectRange(0, 1);
                next();
            },
            // Click New Button
            function(next) {
                t.pass('Click New Button');
                t.click(t.getButtons().List.btnAdd, next);
            },
            // Wait for show screen
            function(next) {
                t.waitForShowTargetView(t.getViews().Edit, next);
            },
            // Hash is new screen
            function(next) {
                t.is(location.hash, Ext.String.format('#\{0\}/new', t.getScreenName()), 'Hash is new screen');
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
