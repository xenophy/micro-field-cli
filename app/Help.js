/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.Help

CLI.define('MicroField.Help', {

    // {{{ extend

    extend: 'CLI.app.Controller',

    // }}}
    // {{{ mixins

    mixins: [
        'MicroField.mixin.Output'
    ],

    // }}}
    // {{{ config

    config: {

        // {{{ categories

        categories: [],

        // }}}
        // {{{ commands

        commands: [],

        // }}}
        // {{{ options

        options: []

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
    // {{{ run

    run: function() {

        this.outputList([
            'Categories',
            'Commands',
            'Options'
        ]);

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
