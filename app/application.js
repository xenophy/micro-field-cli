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

        me.log.error('Unknown command: "' + cmd.join(" ") + '"');

    },

    // }}}
    // {{{ log

    log: {

        // {{{ write

        write: function(tag, text) {

            CLI.log(tag + ' ' + text);

        },

        // }}}
        // {{{ error

        error: function(text) {

            var me = MicroField.getApplication();

            me.log.write(
                me.ansi.bold(
                    me.colors.red('[ERR]')
                ),
                text
            );

        }

        // }}}

    },

    // }}}
    // {{{ getTitle

    getTitle: function() {

        var me      = MicroField.getApplication(),
            version = CLI.getVersion('MicroField').version,
            f       = CLI.String.format,
            text    = '';

        text += me.ansi.bold(f('MicroField CLI v{0}', version)) + "\n";
        text += "\n";

        return text;

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
