/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

*/

/**
 * Remove Button
 */
describe('Remove Button', function(t) {

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
            // Click Remove Button
            function(next) {
                t.pass('Click Remove Button');
                t.click(t.getButtons().List.btnRemove, next);
            },
            // Do not change url hash.
            function(next) {
                t.is(location.hash, Ext.String.format('#\{0\}', t.getScreenName()), 'Do not change url hash.');
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
            // Click Remove Button
            function(next) {
                t.pass('Click Remove Button');
                t.click(t.getButtons().List.btnRemove, next);
            },
            // Show confirm message box.
            function(next) {
                t.waitForComponentVisible(Ext.Msg, function() {
                    t.ok(Ext.Msg.isVisible(), 'Show confirm message box.');
                    next();
                });
            },
            // Click No Button
            // Do not change url hash.
            function(next) {
                var no = Ext.ComponentQuery.query('button[itemId=no]', Ext.Msg)[0];
                t.pass('Click No Button');
                t.click(no, function() {
                    t.is(location.hash, Ext.String.format('#\{0\}', t.getScreenName()), 'Do not change url hash.');
                    next();
                });
            },
            // Do not remove selected row.
            function(next) {
                t.is(t.getViews().List.getStore().getCount(), 1, 'Do not remove selected row.');
                next();
            },
            // Click Remove Button
            function(next) {
                t.pass('Click Remove Button');
                t.click(t.getButtons().List.btnRemove, next);
            },
            // Click Yes Button
            // Removed selected row.
            function(next) {
                t.waitForComponentVisible(Ext.Msg, function() {
                    var yes = Ext.ComponentQuery.query('button[itemId=yes]', Ext.Msg)[0];
                    var store   = t.getViews().List.getStore();
                    t.waitForStoresToLoad(store, function() {
                        t.is(store.getCount(), 0, 'Removed selected row.');
                        next();
                    });
                    t.pass('Click Yes Button');
                    t.click(yes, function() {});
                });
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
            // Click Remove Button
            function(next) {
                t.pass('Click Remove Button');
                t.click(t.getButtons().List.btnRemove, next);
            },
            // Show confirm message box.
            function(next) {
                t.waitForComponentVisible(Ext.Msg, function() {
                    t.ok(Ext.Msg.isVisible(), 'Show confirm message box.');
                    next();
                });
            },
            // Click No Button
            // Do not change url hash.
            function(next) {
                var no = Ext.ComponentQuery.query('button[itemId=no]', Ext.Msg)[0];
                t.pass('Click No Button');
                t.click(no, function() {
                    t.is(location.hash, Ext.String.format('#\{0\}', t.getScreenName()), 'Do not change url hash.');
                    next();
                });
            },
            // Do not remove selected rows.
            function(next) {
                t.is(t.getViews().List.getStore().getCount(), 2, 'Do not remove selected rows.');
                next();
            },
            // Click Remove Button
            function(next) {
                t.pass('Click Remove Button');
                t.click(t.getButtons().List.btnRemove, next);
            },
            // Click Yes Button
            // Removed selected rows.
            function(next) {
                t.waitForComponentVisible(Ext.Msg, function() {
                    var yes = Ext.ComponentQuery.query('button[itemId=yes]', Ext.Msg)[0];
                    var store   = t.getViews().List.getStore();
                    t.waitForStoresToLoad(store, function() {
                        t.is(store.getCount(), 0, 'Removed selected rows.');
                        next();
                    });
                    t.pass('Click Yes Button');
                    t.click(yes, function() {});
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
