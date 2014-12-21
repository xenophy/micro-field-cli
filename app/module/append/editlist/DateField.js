/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.append.editlist.DateField

CLI.define('MicroField.module.append.editlist.DateField', {

    // {{{ extend

    extend: 'MicroField.module.append.editlist.Abstract',

    // }}}
    // {{{ config

    config: {

        // {{{ xtype

        xtype: 'datefield',

        // }}}
        // {{{ columnType

        columnType: {

            mysql: 'varchar(255)'

        }

        // }}}

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
