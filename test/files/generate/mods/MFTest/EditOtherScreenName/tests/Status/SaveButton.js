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

        // Save Button is disabled.
        t.chain(
            function(next) {
                t.ok(t.getButtons().Edit.btnSave.disabled, 'Save Button is disabled.');
                next();
            }
        );

    });

    // }}}
    // {{{ Edited

    t.it('Edited', function(t) {

        t.chain(
            // Input dummy text
            function(next) {
                t.setText(t.getFields().Edit[cfg.fieldName], cfg.dummyText, next);
            },
            // Save Button is enabled.
            function(next) {
                t.notOk(t.getButtons().Edit.btnSave.disabled, 'Save Button is enabled.');
                next();
            },
            // reset
            function(next) {
                t.getFields().Edit[cfg.fieldName].reset();
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
