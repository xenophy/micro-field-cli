/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.setup.Main

CLI.define('MicroField.setup.Main', {

    // {{{ extend

    extend: 'MicroField.setup.Abstract',

    // }}}
    // {{{ singleton

    singleton: true,

    // }}}
    // {{{ cleanupList

    cleanupList: [
        '.sencha',
        'app',
        'build',
        'ext',
        'app.js',
        'app.json',
        'app.json.\$old',
        'index.html'
    ],

    // }}}
    // {{{ targetDir

    targetDir: '',

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
