/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controller.get.siesta-extjs.Main

CLI.define('MicroField.controller.get.siesta-extjs.Main', {

    // {{{ extend

    extend: 'MicroField.controller.Controller',

    // }}}
    // {{{ mixins

    mixins: [
        'CLI.mixin.Ansi',
        'CLI.mixin.Progress'
    ],

    // }}}
    // {{{ config

    config: {

        // {{{ url

        url: 'http://cdn.sencha.com/ext/gpl/ext-4.2.0-gpl.zip',

        // }}}

    },

    // }}}
    // {{{ run

    run: function() {

        var me      = this,
            request = require('request'),
            bar;

        request.get(

            me.getUrl(),

            function (error, response, body) {

                // TODO: bodyを保存

                // TODO: zip展開




            }

        ).on('data', function(chunk) {

            bar.tick(chunk.length);

        }).on('response', function(res) {

            bar = me.progress('  ' + me.colors.green('Downloading Ext JS from CDN') + ' [:bar] :percent :etas', {
                complete: '=',
                incomplete: ' ',
                width: 20,
                total: parseInt(res.headers['content-length'], 10)
            });

        });

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
