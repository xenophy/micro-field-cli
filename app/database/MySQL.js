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

            callback(err);

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

    },

    // }}}
    // {{{ query

    query: function(sql, callback) {

        var me      = this,
            conn    = me.conn;

        // クエリー実行
        conn.query(sql, function (err, rows, fields) {

            // コールバック関数実行
            callback(err, rows, fields);

        });

    },

    // }}}
    // {{{ createTable

    createTable: function(defs, callback) {

        var me = this,
            f = CLI.String.format,
            data    = {},
            fields  = [],
            sql;

        sql = [
            'CREATE TABLE {0} (',
            '{1}',
            ')'
        ].join("\n");

        CLI.iterate(defs.fields, function(item) {

            var field = '    ';

            field += item.name + ' ';
            field += item.type;

            if (CLI.isNumber(item.length)) {
                field += '(' + item.length + ')';
            }

            if (item.notnull === true) {
                field += ' NOT NULL';
            }

            if (item.default !== undefined) {
                field += ' DEFAULT \'' + item.default + '\'';
            }

            if (item.auto_increment === true) {
                field += ' AUTO_INCREMENT';
            }

            fields.push(field);

        });

        fields.push('    PRIMARY KEY (`' + defs.primary_key + '`)'),

        sql = f(sql, defs.name, fields.join(",\n"));

        if (defs.engine) {
            sql += ' ENGINE=' + defs.engine;
        }

        if (defs.auto_increment) {
            sql += ' AUTO_INCREMENT=' + defs.auto_increment;
        }

        if (defs.charset) {
            sql += ' DEFAULT CHARSET=' + defs.charset;
        }

        sql += ';';

        // クエリー実行
        me.query(sql, callback);

    },

    // }}}
    // {{{ existsTable

    existsTable: function(table, callback) {

        var me  = this,
            f   = CLI.String.format,
            sql;

        // クエリー作成
        sql = [
            f("SHOW TABLES FROM `{0}` LIKE '{1}'", me.getDatabase(), table)
        ].join("\n");

        // クエリー実行
        me.query(sql, function(err, rows, fields) {

            if (rows && rows.length === 1) {

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
