/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.database.Abstract

CLI.define('MicroField.database.Abstract', {

    // {{{ extend

    extend: 'MicroField.Base',

    // }}}
    // {{{ connect

    connect: CLI.emptyFn,

    // }}}
    // {{{ disconnect

    disconnect: CLI.emptyFn,

    // }}}
    // {{{ query

    query: CLI.emptyFn,

    // }}}
    // {{{ createTable

    createTable: CLI.emptyFn,

    // }}}
    // {{{ insertData

    insertData: CLI.emptyFn,

    // }}}
    // {{{ existsTable

    existsTable: CLI.emptyFn,

    // }}}
    // {{{ existsColumn

    existsColumn: CLI.emptyFn,

    // }}}
    // {{{ getColumns

    getColumns: CLI.emptyFn,

    // }}}
    // {{{ addColumn

    addColumn: CLI.emptyFn

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
