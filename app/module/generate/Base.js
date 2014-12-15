/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.generate.Base

CLI.define('MicroField.module.generate.Base', {

    // {{{ extend

    extend: 'MicroField.module.generate.Abstract',

    // }}}
    // {{{ execute

    execute: function(o, callback) {

        var me      = this,
            async   = require('async'),
            path    = require('path'),
            f       = CLI.String.format,
            tpldir  = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), '.microfield', 'tpl', 'Base')),
            destdir = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), 'mods', o.ns, o.dir)),
            skip    = false,
            series  = [],
            text    = '';

        CLI.log(MicroField.app.getTitle());

        series = [

            function(next) {

                me.existsModuleDirectory(o.path, function(exists) {

                    if (exists) {
                        skip = true;
                        me.displayErrors('exists', {modPath: o.path});
                    }

                    next();
                });

            },

            function(next) {

            }

        ];


        // 非同期実行開始
        async.series(series, function() {
            callback();
        });





        /*
            var me          = this,
                format      = String.format,
                args        = Cmd.opts.args(),
                ansi        = Cmd.ansi,
                bold        = ansi.bold,
                command     = args[2],
                ns          = args[3],
                modName     = me.modName,
                sname       = ns.split('/')[1],
                argv        = process.argv,
                optName     = argv[5],
                tpldir, destdir, binddata;

               // タイトル表示
            me.showTitle(false);

            // ファイルディレクトリスキャン＆生成
            tpldir  = format('{0}/tpl/{1}', Cmd.scriptdir, modName);
            destdir = format('{0}/mods/{1}', Cmd.mfdir, ns);

            me.walk(
                tpldir,
                destdir,
                {
                    ns          : ns.split('/')[0],
                    name        : ns.split('/')[1],
                    lns         : ns.split('/')[0].toLowerCase(),
                    lname       : sname.toLowerCase(),
                    prefix      : ns.split('/')[0].toLowerCase(),
                    generator   : Cmd.sign,
                    controllers : 'Main',
                    views       : 'Main',
                    stores      : '',
                    screen      : ns.split('/')[1],
                    sname       : sname.toLowerCase()
                }
            );
         */



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
