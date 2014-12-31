/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
This file is part of MicroField CLI

Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com
*/

// {{{ require

require('cli-framework');

// }}}
// {{{ CLI.application

/*
 * define your application
 */
CLI.application({

    // {{{ requires

    requires: [
        'MicroField.app.Util'
    ],

    // }}}
    // {{{ appProperty

    appProperty: 'microfieldProp',

    // }}}
    // {{{ name

    name: 'MicroField',

    // }}}
    // {{{ appFolder

    appFolder: __dirname,

    // }}}
    // {{{ launch

    launch: function() {

        // {{{ package.jsonからバージョン設定

        var name = this.getName(),
            manifest = global[name].manifest = JSON.parse(
                require('fs').readFileSync(__dirname + '/../package.json').toString('utf8')
            );
        CLI.setVersion(name, manifest.version);

        // }}}

    },

    // }}}
    // {{{ onRoutingError

    onRoutingError: function(cmd) {

        var me = this;

        if (cmd.join(" ").length === 0) {

            CLI.create('MicroField.controller.Help').run();

        } else {

            MicroField.app.log.error('Unknown command: "' + cmd.join(" ") + '"');

        }

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
