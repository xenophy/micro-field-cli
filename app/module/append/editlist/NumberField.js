/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.append.editlist.NumberField

CLI.define('MicroField.module.append.editlist.NumberField', {

    // {{{ extend

    extend: 'MicroField.module.append.editlist.Abstract',

    // }}}
    // {{{ config

    config: {

        // {{{ xtype

        xtype: 'numberfield',

        // }}}
        // {{{ columnType

        columnType: {

            // {{{ mysql

            mysql: 'bigint(20)',

            // }}}
            // {{{ pgsql

            pgsql: 'int8'

            // }}}

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
