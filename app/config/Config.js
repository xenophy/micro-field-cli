/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.config.Config

CLI.define('MicroField.config.Config', {

    // {{{ singleton

    singleton: true,

    // }}}
    // {{{ filepath

    filepath: require('path').resolve(
        require('path').join(process.env[CLI.isWindows ? 'USERPROFILE' : 'HOME'], '.microfieldclicfg.json')
    ),

    // }}}
    // {{{ config

    config: {

        // {{{ params

        params: [
            'accessToken',
            'releasesUrl',
            'archiveUrl'
        ]

        // }}}

    },

    // }}}
    // {{{ privates

    privates: {

        // {{{ udpate

        update: function(config) {

            config = config || {};

            var me  = this,
                fs  = require('fs'),
                t   = this.filepath;

            if (!fs.existsSync(t)) {

                fs.writeFileSync(t, CLI.encode({}, null, '  '));
                fs.chmodSync(t, 0600);

            }

            CLI.applyIf(config, CLI.decode(fs.readFileSync(t).toString()));
            fs.writeFileSync(t, CLI.encode(config, null, '  '));

        }

        // }}}

    },

    // }}}
    // {{{ constructor

    constructor: function(config) {

        this.initConfig(config);

    },

    // }}}
    // {{{ init

    init: function() {

        // ファイル初期化
        this.update({});

    }

    // }}}


}, function(cls) {

    var setter = {};

    CLI.iterate(cls.getParams(), function(param) {

        setter['set' + CLI.String.capitalize(param)] = CLI.Function.createSequence(cls.init, function(token) {

            var o = {};

            o[param] = token;

            this.update(o);

        })

    });

    CLI.apply(cls, setter);

});

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
