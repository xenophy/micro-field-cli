/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.database.Manager

CLI.define('MicroField.database.Manager', {

    // {{{ requires

    requires: [
        'MicroField.database.MySQL'
    ],

    // }}}
    // {{{ singleton

    singleton: true,

    // }}}
    // {{{ privates

    privates: {

        // {{{ getdriver

        getDriver: function(config) {

            var me      = this,
                f       = CLI.String.format,
                type    = config.driver;

            type = type.toLowerCase();

            if (type === 'mysql') {

                return CLI.create('MicroField.database.MySQL', {

                    // {{{ charset

                    charset: config.charset,

                    // }}}
                    // {{{ host

                    host: config.host,

                    // }}}
                    // {{{ user

                    user: config.user,

                    // }}}
                    // {{{ password

                    password: config.password,

                    // }}}
                    // {{{ database

                    database: config.database,

                    // }}}
                    // {{{ port

                    port: config.port,

                    // }}}
                    // {{{ socket

                    socket: config.socket

                    // }}}

                });

            } else {

                // [ERR] unknown deriver: ***************
                MicroField.app.log.error(f('unknown driver: "{0}"', type));

                // プロセス終了
                process.exit(1);

            }

        }

        // }}}

    },

    // }}}
    // {{{ getConnection

    getConnection: function(config) {

        var me = this,
            driver;

        driver = me.getDriver(config);

        return driver;

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
