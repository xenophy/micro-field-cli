/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controler.append.Help

CLI.define('MicroField.controller.append.Help', {

    // {{{ extend

    extend: 'MicroField.Help',

    // }}}
    // {{{ config

    config: {

        // {{{ title

        title: 'microfield append',

        // }}}
        // {{{ desc

        desc: [
            'This command appends a new component to already exists module.',
            '',
            'Fieldtypes'.underline,
            '  * datefield',
            '  * htmleditor',
            '  * numberfield',
            '  * textarea',
            '  * textfield',
            '  * timefield',
            '  * triggerfield'
        ].join("\n"),

        // }}}
        // {{{ syntax

        syntax: [{
            text: [
                'microfield append [fieldtype] [itemid] [target module]',
                '',
                '  Example: microfield append textfield text1 MyApp/Edit'
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
