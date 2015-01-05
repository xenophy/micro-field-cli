/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controler.hash.Help

CLI.define('MicroField.controller.hash.Help', {

    // {{{ extend

    extend: 'MicroField.Help',

    // }}}
    // {{{ config

    config: {

        // {{{ title

        title: 'microfield hash',

        // }}}
        // {{{ desc

        desc: [
            'This category contains various commands for hash genetation.',
            'To hash needs string.'
        ],

        // }}}
        // {{{ syntax

        syntax: [{
            text: [
                'microfield hash --target=[filepath] --secret=[secret]'
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
