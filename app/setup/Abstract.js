/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.setup.Abstract

CLI.define('MicroField.setup.Abstract', {

    // {{{ mixins

    mixins: [
        'CLI.mixin.Ansi'
    ],

    // }}}
    // {{{ config

    config: {

        // {{{ cleanupList

        cleanupList: []

        // }}}

    },

    // }}}
    // {{{ constructor

    constructor: function(config) {

        var me  = this;

        me.initConfig(config);
        me.callParent(arguments);

    },

    // }}}
    // {{{ cleanup

    cleanup: function(callback) {

        var me      = this,
            async   = require('async'),
            path    = require('path'),
            series  = [];

        CLI.iterate(me.getCleanupList(), function(item) {

            var t = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), item));

            series.push(function(callback) {
                CLI.Fs.remove(t, callback, function(item) {
                    MicroField.app.log.info('removed: ' + item);
                });
            });

        });

        async.series(series, function (err, result) {
            callback();
        });

    },

    // }}}
    // {{{ execute

    execute: function(callback) {
        callback();
    }

    // }}}

});

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
