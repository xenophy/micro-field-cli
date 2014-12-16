/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.generate.Base

CLI.define('MicroField.module.generate.Base', {

    // {{{ extend

    extend: 'MicroField.module.generate.Abstract',

    // }}}
    // {{{ execute

    execute: function(o, callback) {

        var me          = this,
            ECT         = require('ect'),
            async       = require('async'),
            fs          = require('fs'),
            path        = require('path'),
            recursive   = require('recursive-readdir');
            f           = CLI.String.format,
            tpldir      = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), '.microfield', 'tpl', 'Base')),
            destdir     = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), 'mods', o.ns, o.dir)),
            skip        = false,
            series      = [],
            data        = {},
            text        = '';

        // テンプレート適用データ作成
        data = CLI.apply(o, {
            lns         : o.ns.toLowerCase(),
            lname       : o.name.toLowerCase(),
            generator   : MicroField.app.getSign()
        });

        // タイトル出力
        CLI.log(MicroField.app.getTitle());

        series = [

            // {{{ 出力ディレクトリ存在確認

            function(next) {

                me.existsModuleDirectory(o.path, function(exists) {

                    if (exists) {
                        skip = true;
                        me.displayErrors('exists', {modPath: o.path});
                    }

                    next();
                });

            },

            // }}}
            // {{{ テンプレートディレクトリのファイルスキャン

            function(next) {

                if (!skip) {

                    recursive(tpldir, function (err, files) {

                        var items = [];

                        CLI.iterate(files, function(src) {
                            src = path.relative(MicroField.app.getApplicationDir(), src);
                            items.push([src, path.relative(MicroField.app.getApplicationDir(), path.join(destdir, path.relative(tpldir, src)))]);
                        });

                        // ファイルコピー
                        MicroField.app.copyFiles(items, function(src, dest) {

                            // [INF] copied: ***************
                            MicroField.app.log.info('copied: ' + src);

                        }, function(count) {

                            next();

                        });

                    });

                }

            },

            // }}}
            // {{{ 置換処理

            function(next) {

                if (!skip) {

                    recursive(destdir, function (err, files) {

                        var renderer = ECT({ root : '/' }),
                            writers = [];

                        CLI.iterate(files, function(filename) {

                            writers.push((function(text) {

                                return function(cb) {

                                    fs.writeFile(filename, text, function() {

                                        cb();

                                    });

                                };

                            })(renderer.render(filename, data || {})));


                        });

                        // 非同期実行開始
                        async.series(writers, function() {
                            next();
                        });

                    });

                }

            }

            // }}}

        ];

        // 非同期実行開始
        async.series(series, function() {
            callback();
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
