/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.remove.EditList

CLI.define('MicroField.module.remove.EditList', {

    // {{{ extend

    extend: 'MicroField.module.remove.Abstract',

    // }}}
    // {{{ config

    config: {

        // {{{ filenames

        filenames: {

            // {{{ items

            items           : 'app/view/edit/Edit.js',

            // }}}
            // {{{ modul

            model           : 'app/model/List.js',

            // }}}
            // {{{ columns

            columns         : 'app/view/list/List.js',

            // }}}
            // {{{ serverscript

            serverscript    : 'classes/Lists.php'

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
