/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.append.edit.NumberField

CLI.define('MicroField.module.append.edit.NumberField', {

    // {{{ extend

    extend: 'MicroField.module.append.edit.Abstract',

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
