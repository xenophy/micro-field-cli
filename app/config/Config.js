/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.config.Config

CLI.define('MicroField.config.Config', {

    // {{{ singleton

    singleton: true,

    // }}}
    // {{{ extend

    extend: 'CLI.util.Config',

    // }}}
    // {{{ config

    config: {

        // {{{ params

        params: [
            'accessToken',
            'releasesUrl',
            'archiveUrl'
        ],

        // }}}
        // {{{ filename

        filename: '.microfieldclicfg.json'

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
