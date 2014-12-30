/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.database.schema.Abstract

CLI.define('MicroField.database.schema.Abstract', {

    // {{{ constructor

    constructor: function(config) {

        var me  = this;

        me.initConfig(config);
        me.callParent(arguments);

        // テーブル名設定
        me.setName(CLI.getClassName(me).split('.').pop().toLowerCase());

        // ユーザー名設定
        me.setUser(config.user);

        // データベース名設定
        me.setDatabase(config.database);

    },

    // }}}
    // {{{ config

    config: {

        // {{{ name

        name: '',

        // }}}
        // {{{ user

        user: '',

        // }}}
        // {{{ database

        database: ''

        // }}}

    },

    // }}}
    // {{{ getDDL

    getDDL: CLI.emptyFn,

    // }}}
    // {{{ getDML

    getDML: CLI.emptyFn,

    // }}}
    // {{{ getExists

    getExists: CLI.emptyFn

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
