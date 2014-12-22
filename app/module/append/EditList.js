/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.append.EditList

CLI.define('MicroField.module.append.EditList', {

    // {{{ extend

    extend: 'MicroField.module.append.Abstract',

    // }}}
    // {{{ config

    config: {

        // {{{ filenames

        filenames: {

            // {{{ items

            items           : 'app/view/edit/Edit.js',

            // }}}
            // {{{ model

            model           : 'app/model/List.js',

            // }}}
            // {{{ columns

            columns         : 'app/view/list/List.js',

            // }}}
            // {{{ serverscript

            serverscript    : 'classes/Lists.php'

            // }}}

        },

        // }}}
        // {{{ fieldTypes

        fieldTypes: [
            'checkboxfield',
            'combobox',
            'datefield',
            'htmleditor',
            'numberfield',
            'textarea',
            'textfield',
            'timefield',
            'triggerfield'
        ]

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
