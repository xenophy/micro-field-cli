/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.database.schema.mysql.Users

CLI.define('MicroField.database.schema.mysql.Users', {

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
                '--  Table structure for `users`',
                '-- ----------------------------',
                'CREATE TABLE `{0}` (',
                '  `pk` bigint(20) NOT NULL AUTO_INCREMENT,',
                '  `status` tinyint(4) NOT NULL DEFAULT \'1\',',
                '  `role` varchar(100) NOT NULL,',
                '  `identity` varchar(255) NOT NULL,',
                '  `password` char(255) NOT NULL,',
                '  `modified` datetime NOT NULL,',
                '  `created` datetime NOT NULL,',
                '  PRIMARY KEY (`pk`)',
                ') ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;',
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
                'INSERT INTO',
                '  `{0}`',
                'VALUES (',
                '  \'1\',',
                '  \'1\',',
                '  \'administrator\',',
                '  \'{1}\',',
                '  \'{2}\',',
                '  \'{3}\',',
                '  \'{4}\'',
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
