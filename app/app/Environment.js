/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.app.Environment

CLI.define('MicroField.app.Environment', {

    // {{{ requires

    requires: [
        'MicroField.config.Config'
    ],

    // }}}
    // {{{ mixins

    mixins: [
    ],

    // }}}
    // {{{ singleton

    singleton: true,

    // }}}
    // {{{ getHtaccess

    getHtaccess: function(callback) {

        var me      = this,
            fs      = require('fs'),
            path    = require('path'),
            f       = CLI.String.format,
            cfg     = MicroField.config.Config,
            domain  = cfg.getValues()['domain'] || 'localhost';
            target  = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), '.htaccess'));

        fs.readFile(target, function(err, data) {

            var text        = data.toString(),
                rewriteBase = text.match(/[\r\s]*RewriteBase (.*?)[\s]*\n/)[1],
                url         = f('http://{0}{1}', domain, rewriteBase);

            callback({
                text        : text,
                domain      : domain,
                rewriteBase : rewriteBase,
                url         : url
            });

        });

    },

    // }}}
    // {{{ getSdkVersion

    getSdkVersion: function(callback) {

        var me      = this,
            fs      = require('fs'),
            path    = require('path'),
            f       = CLI.String.format,
            target  = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), 'mods/MicroField/libs/version.php'));

        fs.readFile(target, function(err, data) {

            var text = data.toString(),
                m;

            m = text.match(/define.*\(.?['|"]+MICROFIELD_VERSION['|"]+.?,.?['|"]+(.*)['|"]+\).?;/);

            // TODO: エラー処理

            callback({
                text        : text,
                version     : m[1]
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
