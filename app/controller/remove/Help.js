/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controler.remove.Help

CLI.define('MicroField.controller.remove.Help', {

    // {{{ extend

    extend: 'MicroField.Help',

    // }}}
    // {{{ config

    config: {

        // {{{ title

        title: 'microfield remove',

        // }}}
        // {{{ desc

        desc: 'This command removes a exists component in already exists module.',

        // }}}
        // {{{ syntax

        syntax: [{
            text: [
                'microfield remove [itemid] [target module]',
                '',
                '  Example: microfield remove text1 MyApp/Edit'
            ].join("\n")
        }]

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
