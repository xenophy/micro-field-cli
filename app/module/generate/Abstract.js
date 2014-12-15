/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.generate.Abstract

CLI.define('MicroField.module.generate.Abstract', {

    // {{{ mixins

    mixins: [
        'CLI.mixin.Ansi'
    ],

    // }}}
    // {{{ execute

    execute: CLI.emptyFn,

    // }}}
    // {{{ existsModuleDirectory

    existsModuleDirectory: function(modPath, callback) {

        var me      = this,
            fs      = require('fs'),
            path    = require('path'),
            target  = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), 'mods', modPath));

        fs.exists(target, function(exists) {
            callback(exists);
        });

    },

    // }}}
    // {{{ displayErrors

    displayErrors: function(type, o) {

        var me      = this,
            f       = CLI.String.format,
            bold    = me.ansi.bold;

        if (type === 'exists') {

            MicroField.app.log.error(f('Could not generate "{0}" directory, that is already exists.', bold(o.modPath)));

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
