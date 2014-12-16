/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.generate.Header

CLI.define('MicroField.module.generate.Header', {

    // {{{ extend

    extend: 'MicroField.module.generate.Abstract',

    // }}}
    // {{{ execute

    execute: function(o, callback) {

        var me          = this,
            async       = require('async'),
            skip        = false,
            series      = [],
            data        = {};

        // テンプレート適用データ作成
        data = CLI.apply(o, {
            lns         : o.ns.toLowerCase(),
            lname       : o.name.toLowerCase(),
            sname       : o.sname.toLowerCase(),
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

                    me.copyTemplates(me.getTplDirectory(), me.getDestDirectory(o), function() {
                        next();
                    });

                }

            },

            // }}}
            // {{{ 置換処理

            function(next) {

                if (!skip) {

                    me.replaceTemplates(me.getDestDirectory(o), data, function() {
                        next();
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
