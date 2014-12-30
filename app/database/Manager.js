/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.database.Manager

CLI.define('MicroField.database.Manager', {

    // {{{ requires

    requires: [
        'MicroField.database.MySQL',
        'MicroField.database.PostgreSQL'
    ],

    // }}}
    // {{{ singleton

    singleton: true,

    // }}}
    // {{{ privates

    privates: {

        // {{{ getClassName

        getClassName: function(config) {

            var me      = this,
                f       = CLI.String.format,
                type    = config.driver;

            type = type.toLowerCase();

            if (type === 'mysql') {

                return 'MySQL';

            } else if (type === 'pgsql') {

                return 'PostgreSQL';

            } else {

                // [ERR] unknown deriver: ***************
                MicroField.app.log.error(f('unknown driver: "{0}"', type));

                // プロセス終了
                process.exit(1);

            }

        },

        // }}}
        // {{{ getDriver

        getDriver: function(config) {



        }

        // }}}

    },

    // }}}
    // {{{ getConnection

    getConnection: function(config) {

        var me      = this,
            clsName = me.getClassName(config);

        return CLI.create('MicroField.database.' + clsName, {

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

    },

    // }}}
    // {{{ getSchema

    getSchema: function(config, table) {

        var me = this,
            f  = CLI.String.format;

        return CLI.create(f(
            'MicroField.database.schema.{0}.{1}',
            config.driver,
            CLI.String.capitalize(table)
        ), config);
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
