/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controler.config.Help

CLI.define('MicroField.controller.config.Help', {

    // {{{ extend

    extend: 'MicroField.Help',

    // }}}
    // {{{ config

    config: {

        // {{{ title

        title: 'microfield config',

        // }}}
        // {{{ desc

        desc: 'Management MicroField CLI configuration.',

        // }}}
        // {{{ opts

        opts: [{
            tag     : '--accessToken',
            text    : 'Sets the access token for MicroField repository'
        }, {
            tag     : '--domain',
            text    : 'Sets the setup domain'
        }, {
            tag     : '--extPath',
            text    : 'Sets the Ext JS SDK directory path'
        }, {
            tag     : '--releasesUrl',
            text    : 'Sets the release url for MicroField repository'
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
