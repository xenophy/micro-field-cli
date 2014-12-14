/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controller.get.siesta-lite.Main

CLI.define('MicroField.controller.get.siesta-lite.Main', {

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

        dirname: 'siesta-lite',

        // }}}
        // {{{ url

        url: 'http://www.bryntum.com/download/?product_id=siesta-lite',

        // }}}
        // {{{ title

        title: 'Siesta Lite from Bryntum'

        // }}}

    },

    // }}}
    // {{{ run

    run: function() {

        var me      = this,
            fs      = require('fs'),
            path    = require('path');

        // execute get process
        MicroField.get.Get.execute({
            dirname     : me.getDirname(),
            url         : me.getUrl(),
            title       : me.getTitle(),
            showTitle   : true
        }, function() {

            fs.exists(CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), 'packages', 'siesta-extjs')), function(exists) {

                if (!exists) {

                    var cls = CLI.create('MicroField.controller.get.siesta-extjs.Main');

                    MicroField.get.Get.execute({
                        dirname     : cls.getDirname(),
                        url         : cls.getUrl(),
                        title       : cls.getTitle(),
                        showTitle   : false
                    });

                }

            });

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
