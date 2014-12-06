/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.setup.Login

CLI.define('MicroField.setup.Login', {

    // {{{ extend

    extend: 'MicroField.setup.Abstract',

    // }}}
    // {{{ singleton

    singleton: true,

    // }}}
    // {{{ cleanupList

    cleanupList: [
        'login/.sencha',
        'login/app',
        'login/build',
        'login/ext',
        'login/app.js',
        'login/app.json',
        'login/app.json.\$old',
        'login/index.html'
    ],

    // }}}
    // {{{ execute

    execute: function(callback) {

        callback();

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
