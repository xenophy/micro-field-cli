/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.database.MySQL

CLI.define('MicroField.database.MySQL', {

    // {{{ extend

    extend: 'MicroField.database.Abstract',

    // }}}
    // {{{ config

    config: {

        // {{{ charset

        charset: 'UTF8',

        // }}}
        // {{{ host

        host: '127.0.0.1',

        // }}}
        // {{{ user

        user: 'root',

        // }}}
        // {{{ password

        password: '',

        // }}}
        // {{{ database

        database: 'microfield',

        // }}}
        // {{{ port

        port: '3306',

        // }}}
        // {{{ socket

        socket: ''

        // }}}

    },

    // }}}
    // {{{ privates

    privates: {

        // {{{ conn

        conn: null

        // }}}

    },

    // }}}
    // {{{ connect

    connect: function(callback) {

        var me      = this,
            mysql   = require('mysql'),
            opts    = {},
            conn;

        CLI.iterate([
            'charset',
            'host',
            'user',
            'password',
            'database',
            'port',
            'socket'
        ], function(key) {

            var methodName = 'get' + CLI.String.capitalize(key);

            if (me[methodName]()) {
                opts[key] = me[methodName]();
            }

        });

        opts.port       = opts.port || 3306;
        opts.password   = opts.password || '';

        // データベースコネクション取得
        conn = me.conn = mysql.createConnection(opts);

        // 接続
        conn.connect(function(err) {

            if (err) {

                // [ERR] error connecting: ***************
                MicroField.app.log.error(f('error connecting: "{0}"', err.stack));

                return;

            }

            callback();

        });

      },

    // }}}
    // {{{ disconnect

    disconnect: function(callback) {

        var me      = this,
            conn    = me.conn;

        conn.end(function(err) {
            callback();
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
