/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.alter.Abstract

CLI.define('MicroField.module.alter.Abstract', {

    // {{{ requires

    requires: [
        'MicroField.database.Manager'
    ],

    // }}}
    // {{{ config

    config: {

        // {{{ appSettings

        appSettings: {}

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
    // {{{ append

    append: CLI.emptyFn,

    // }}}
    // {{{ remove

    remove: CLI.emptyFn

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
