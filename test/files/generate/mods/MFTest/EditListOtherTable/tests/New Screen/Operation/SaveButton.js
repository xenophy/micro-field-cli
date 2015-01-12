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
            // Move to new screen
            function(next) {
                t.changeScreen('#' + t.getScreenName() + '/new');
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
                t.is(location.hash, Ext.String.format('#\{0\}/new', t.getScreenName()), 'Do not change url hash.');
                next();
            },
            // TextField is empty.
            function(next) {
                t.is(t.getFields().Edit[cfg.fieldName].getValue(), '', 'TextField is empty.');
                next();
            }
        );

    });

    // }}}
    // {{{ Edited

    t.it('Edited', function(t) {

        t.chain(
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
