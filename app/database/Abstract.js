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
    // {{{ existsTable

    existsTable: CLI.emptyFn

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
