#!/usr/bin/env node

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
This file is part of MicroField CLI

Copyright (c) 2014 Xenophy.CO.,LTD All rights Reserved.
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

    // {{{ name

    name: 'MicroField',

    // }}}
    // {{{ appFolder

    appFolder: __dirname + '/../app',

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

    }

    // }}

});

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
