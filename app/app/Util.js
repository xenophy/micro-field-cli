/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.app.Util

CLI.define('MicroField.app.Util', {
}, function() {

    // {{{ MicroField.app

    CLI.apply(MicroField.app, {

        // {{{ getSampleFilename

        getSampleFilename: function() {

            return 'microfield\-sample.json';

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

                MicroField.app.log.write(
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

            return text;

        },

        // }}}
        // {{{ getApplicationDir

        getApplicationDir: function() {

            return process.cwd();

        },

        // }}}
        // {{{ isApplicationDir

        isApplicationDir: function() {

            var me      = this,
                fs      = require('fs');
                path    = require('path');

            // MicroFieldディレクトリであるか判定 (microfield-sample.jsonの存在確認)
            if (!fs.existsSync(path.resolve(path.join(this.getApplicationDir(), 'mods' , this.getSampleFilename())))) {

                return false

            }

            return true;

        }

        // }}}

    });

});

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
