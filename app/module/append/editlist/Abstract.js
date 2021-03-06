/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.append.editlist.Abstract

CLI.define('MicroField.module.append.editlist.Abstract', {

    // {{{ extend

    extend: 'MicroField.Base',

    // }}}
    // {{{ getClientItemCode

    getClientItemCode: function(indent, o) {

        var f = CLI.String.format;

        return f([
            '{',
            '{0}xtype       : \'{1}\',',
            '{0}itemId      : \'{2}\',',
            '{0}labelAlign  : \'{3}\',',
            '{0}name        : \'{4}\',',
            '{0}fieldLabel  : \'{5}\',',
            '{0}width       : {6}',
            '}'
        ].join("\n"),
            indent,
            o.xtype,
            o.itemId,
            o.labelAlign,
            o.name,
            o.fieldLabel,
            o.width
        );

    },

    // }}}
    // {{{ getClientModelCode

    getClientModelCode: function(indent, o) {

        var f = CLI.String.format;

        return f([
            '{1}'
        ].join("\n"),
            indent,
            o.itemId
        );

    },

    // }}}
    // {{{ getClientColumnsCode

    getClientColumnsCode: function(indent, o) {

        var f = CLI.String.format;

        return f([
            '{',
            '{0}text        : \'{1}\',',
            '{0}dataIndex   : \'{1}\',',
            '{0}flex        : {2}',
            '}'
        ].join("\n"),
            indent,
            o.itemId,
            o.flex
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
