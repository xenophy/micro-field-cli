/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com

generated by MicroField CLI v0.8.0 date: 2015/01/14 03:01:56
*/

/**
 * MFTest.EditListOtherTable.store.Lists
 *
 */
Ext.define('MFTest.EditListOtherTable.store.Lists', {

    // {{{ extend

    extend: 'Ext.data.Store',

    // }}}
    // {{{ alias

    alias: 'store.mftest-editlistothertable-lists',

    // }}}
    // {{{ model

    model: 'MFTest.EditListOtherTable.model.List',

    // }}}
    // {{{ remotefilter

    remoteFilter: true,

    // }}}
    // {{{ remoteSort

    remoteSort: true,

    // }}}
    // {{{ pageSize

    pageSize: 100,

    // }}}
    // {{{ proxy

    proxy: {

        // {{{ type

        type: 'direct',

        // }}}
        // {{{ directFn

        directFn: 'MicroField.rpc.MFTest.EditListOtherTable.Lists.getGrid',

        // }}}
        // {{{ reader

        reader: {

            // {{{ type

            type: 'json',

            // }}}
            // {{{ rootProperty

            rootProperty: 'items',

            // }}}
            // {{{ totalProperty

            totalProperty: 'total'

            // }}}

        }

        // }}}

    }

    // }}}

});

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
