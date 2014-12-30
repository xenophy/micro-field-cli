/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.database.PostgreSQL

CLI.define('MicroField.database.PostgreSQL', {

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

        user: 'postgres',

        // }}}
        // {{{ password

        password: '',

        // }}}
        // {{{ database

        database: 'microfield',

        // }}}
        // {{{ port

        port: '5432',

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

    connect: function(schema, callback) {

        var me      = this,
            f       = CLI.String.format,
            pg      = require('pg'),
            opts    = {},
            conn;

        // スキーマ設定
        me.schema = schema;

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

        opts.port       = opts.port || 5432;
        opts.password   = opts.password || '';

        // データベース接続/コネクション取得
        pg.connect(
            f(
                'tcp://{0}:{1}@{2}:{3}/{4}',
                opts.user,
                opts.password,
                opts.host,
                opts.port,
                opts.database
            ),
            function(err, client) {

                if (err) {

                    // [ERR] error connecting: ***************
                    MicroField.app.log.error(f('error connecting: "{0}"', err.stack));

                    return;

                }

                conn = me.conn = client;

                callback(err);

            }
        );

    },

    // }}}
    // {{{ disconnect

    disconnect: function(callback) {

        var me      = this,
            conn    = me.conn;

        conn.end();
        callback();

    },

    // }}}
    // {{{ query

    query: function(sql, callback) {

        var me      = this,
            conn    = me.conn;

        // クエリー実行
        conn.query(sql, function (err, result) {

            // コールバック関数実行
            callback(err, result);

        });

    },

    // }}}
    // {{{ createTable

    createTable: function(callback) {

        var me      = this,
            schema  = me.schema;

        // クエリー実行
        me.query(schema.getDDL(), callback);

    },

    // }}}
    // {{{ insertData

    insertData: function(callback) {

        var me      = this,
            schema  = me.schema;

        // クエリー実行
        me.query(schema.getDML(), callback);

    },

    // }}}
    // {{{ existsTable

    existsTable: function(callback) {

        var me      = this,
            schema  = me.schema;

        me.query(schema.getExists(), function(err, result) {

            if (result.rowCount === 1) {

                callback(err, true);

            } else {

                callback(err, false);

            }

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
