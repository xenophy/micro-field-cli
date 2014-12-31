/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.database.schema.pgsql.Edit

CLI.define('MicroField.database.schema.pgsql.Edit', {

    // {{{ extend

    extend: 'MicroField.database.schema.Abstract',

    // }}}
    // {{{ constructor

    constructor: function(config) {

        var me  = this;

        me.initConfig(config);
        me.callParent(arguments);

        // テーブル名設定
        me.setName(config.table);

    },

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
                'CREATE SEQUENCE "public"."{0}_pk_seq" INCREMENT 1 START 1 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;',
                'ALTER TABLE "public"."{0}_pk_seq" OWNER TO "postgres";',
                '',
                '-- ----------------------------',
                '--  Table structure for {0}',
                '-- ----------------------------',
                'DROP TABLE IF EXISTS "public"."{0}";',
                'CREATE TABLE "public"."{0}" (',
                '	"pk" int8 NOT NULL DEFAULT nextval(\'{0}_pk_seq\'::regclass),',
                '	"status" int2 DEFAULT 1,',
                '	"textdata" varchar(255) COLLATE "default",',
                '	"modified" timestamp(6) NULL,',
                '	"created" timestamp(6) NULL',
                ')',
                'WITH (OIDS=FALSE);',
                'ALTER TABLE "public"."{0}" OWNER TO "{1}";',
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
            me.getDatabase(),
            me.getName()
        );

    },

    // }}}
    // {{{ getColumns

    getColumns: function(fieldName) {

        var me  = this,
            f   = CLI.String.format;

        return f(
            [
                'SELECT',
                '  *',
                'FROM',
                '  information_schema.columns',
                'WHERE',
                '  table_catalog=\'{0}\'',
                'AND',
                '  table_name=\'{1}\'',
                'ORDER BY',
                '  ordinal_position;'
            ].join("\n"),
            me.getDatabase(),
            me.getName()
        );

    },

    // }}}
    // {{{ addColumn

    addColumn: function(fieldName, fieldType, afterField) {

        var me  = this,
            f   = CLI.String.format;

        return f(
            [
                'ALTER TABLE',
                '    {0}',
                'ADD COLUMN',
                '    {1} {2}',
//                'AFTER',
//                '    \'{3}\''
            ].join("\n"),
            me.getName(),
            fieldName,
            fieldType,
            afterField
        );

    },

    // }}}
    // {{{ removeColumn

    removeColumn: function(fieldName) {

        var me  = this,
            f   = CLI.String.format;

        return f(
            [
                'ALTER TABLE',
                '    {0}',
                'DROP COLUMN',
                '    {1}',
            ].join("\n"),
            me.getName(),
            fieldName
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
