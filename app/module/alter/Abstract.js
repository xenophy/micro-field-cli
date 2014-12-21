/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.alter.Abstract

CLI.define('MicroField.module.alter.Abstract', {

    // {{{ extend

    extend: 'MicroField.Base',

    // }}}
    // {{{ requires

    requires: [
        'MicroField.database.Manager'
    ],

    // }}}
    // {{{ mixins

    mixins: [
        'CLI.mixin.Ansi'
    ],

    // }}}
    // {{{ config

    config: {

        // {{{ appSettings

        appSettings: {},

        // }}}
        // {{{ classes

        classes: {
            'checkboxfield'     : 'Checkbox',
            'combobox'          : 'Combobox',
            'datefield'         : 'DateField',
            'htmleditor'        : 'HtmlEditor',
            'numberfield'       : 'NumberField',
            'textarea'          : 'TextArea',
            'textfield'         : 'TextField',
            'timefield'         : 'TimeField',
            'triggerfield'      : 'Trigger'
        },

        // }}}
        // {{{ ns

        ns: null,

        // }}}
        // {{{ name

        name: null,

        // }}}
        // {{{ fieldType

        fieldType: null,

        // }}}
        // {{{ fieldName

        fieldName: null,

        // }}}
        // {{{ tplType

        tplType: null,

        // }}}
        // {{{ filenames

        filenames: {}

        // }}}

    },

    // }}}
    // {{{ init

    init: CLI.emptyFn,

    // }}}
    // {{{ append

    append: CLI.emptyFn,

    // }}}
    // {{{ remove

    remove: CLI.emptyFn

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
