/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.database.schema.mysql.EditList

CLI.define('MicroField.database.schema.mysql.EditList', {

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
                '--  Table structure for `{0}`',
                '-- ----------------------------',
                'CREATE TABLE `{0}` (',
                '  `pk` bigint(20) NOT NULL AUTO_INCREMENT,',
                '  `status` tinyint(4) NOT NULL DEFAULT \'1\',',
                '  `textdata` varchar(255) NOT NULL,',
                '  `modified` datetime NOT NULL,',
                '  `created` datetime NOT NULL,',
                '  PRIMARY KEY (`pk`)',
                ') ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;',
            ].join("\n"),
            me.getName()
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
                'SHOW TABLES',
                'FROM',
                '  `{0}`',
                'LIKE',
                '  \'{1}\''
            ].join("\n"),
            me.getDatabase(),
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
