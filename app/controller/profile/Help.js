/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controler.profile.Help

CLI.define('MicroField.controller.profile.Help', {

    // {{{ extend

    extend: 'MicroField.Help',

    // }}}
    // {{{ config

    config: {

        // {{{ title

        title: 'microfield profile',

        // }}}
        // {{{ desc

        desc: 'This command displays about already exists module status.',

        // }}}
        // {{{ commands

        commands: [{
            tag     : 'list',
            text    : 'Displays module list'
        }],

        // }}}
        // {{{ opts

        opts: [{
            tag     : '--json',
            text    : 'Output json format'
        }],

        // }}}
        // {{{ syntax

        syntax: [{
            text    : 'microfield profile [ModuleName] or "list"'
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
