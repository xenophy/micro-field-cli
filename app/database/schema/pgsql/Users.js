/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.database.schema.pgsql.Users

CLI.define('MicroField.database.schema.pgsql.Users', {

    // {{{ extend

    extend: 'MicroField.database.schema.Abstract',

    // }}}
    // {{{ getDDL

    getDDL: function() {

        var me  = this,
            f   = CLI.String.format;

        return f(
            [
                '-- ----------------------------',
                '--  Sequence structure for {0}_pk_seq',
                '-- ----------------------------',
                'DROP SEQUENCE IF EXISTS "public"."{0}_pk_seq";',
                'CREATE SEQUENCE "public"."{0}_pk_seq" INCREMENT 1 START 4 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;',
                'ALTER TABLE "public"."{0}_pk_seq" OWNER TO "postgres";',
                '',
                '-- ----------------------------',
                '--  Table structure for {0}',
                '-- ----------------------------',
                'DROP TABLE IF EXISTS "public"."{0}";',
                'CREATE TABLE "public"."{0}" (',
                '  "pk" int8 NOT NULL DEFAULT nextval(\'{0}_pk_seq\'::regclass),',
                '  "status" int2 DEFAULT 1,',
                '  "role" varchar(100) COLLATE "default",',
                '  "identity" varchar(255) COLLATE "default",',
                '  "password" char(255) COLLATE "default",',
                '  "modified" timestamp(6) NULL,',
                '  "created" timestamp(6) NULL',
                ')',
                'WITH (OIDS=FALSE);',
                'ALTER TABLE "public"."{0}" OWNER TO "{1}";'
            ].join("\n"),
            me.getName(),
            me.getUser()
        );

    },

    // }}}
    // {{{ getDML

    getDML: function() {

        var me          = this,
            crypto      = require('crypto'),
            shasum      = crypto.createHash('sha512'),
            date        = CLI.Date.format(new Date(), 'Y-m-d H:m:s'),
            f           = CLI.String.format;

        return f(
            [
                'INSERT INTO',
                '  "public"."{0}"',
                'VALUES (',
                '  \'1\',',
                '  \'1\',',
                '  \'administrator\',',
                '  \'{1}\',',
                '  \'{2}\',',
                '\'{3}\',',
                '\'{4}\'',
                ');'
            ].join("\n"),
            me.getName(),
            me.getUser(),
            shasum.update(me.getUser()).digest('hex'),
            date,
            date
        );

    },

    // }}}
    // {{{ getExists

    getExists: function() {

        var me  = this,
            f   = CLI.String.format;

        return f(
            [
                'SELECT',
                '  *',
                'FROM',
                '  pg_catalog.pg_class',
                'WHERE',
                '  relkind = \'r\'',
                'AND',
                '  relname = \'{0}\''
            ].join("\n"),
            me.getName()
        );

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
