/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controller.get.siesta-extjs.Main

CLI.define('MicroField.controller.get.siesta-extjs.Main', {

    // {{{ requires

    requires: [
        'MicroField.get.Get'
    ],

    // }}}
    // {{{ extend

    extend: 'MicroField.controller.Controller',

    // }}}
    // {{{ config

    config: {

        // {{{ dirname

        dirname: 'siesta-extjs',

        // }}}
        // {{{ url

        url: 'http://cdn.sencha.com/ext/gpl/ext-4.2.0-gpl.zip',

        // }}}
        // {{{ title

        title: 'Ext JS from CDN'

        // }}}

    },

    // }}}
    // {{{ run

    run: function() {

        var me = this;

        // execute get process
        MicroField.get.Get.execute({
            dirname     : me.getDirname(),
            url         : me.getUrl(),
            title       : me.getTitle(),
            showTitle   : true
        });

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
