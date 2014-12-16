/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.generate.EditList

CLI.define('MicroField.module.generate.EditList', {

    // {{{ extend

    extend: 'MicroField.module.generate.Abstract',

    // }}}
    // {{{ config

    config: {

        // {{{ tableStructure

        tableStructure: {

            // {{{ name

            name: 'editlist',

            // }}}
            // {{{ fields

            fields: [{

                // {{{ pk

                name            : 'pk',
                type            : 'bigint',
                length          : 20,
                notnull         : true,
                auto_increment  : true

                // }}}

            }, {

                // {{{ status

                name            : 'status',
                type            : 'tinyint',
                length          : 4,
                notnull         : true,
                'default'       : 1

                // }}}

            }, {

                // {{{ textdata

                name            : 'textdata',
                type            : 'varchar',
                length          : 255,
                notnull         : true

                // }}}

            }, {

                // {{{ modified

                name            : 'modified',
                type            : 'datetime',
                notnull         : true

                // }}}

            }, {

                // {{{ created

                name            : 'created',
                type            : 'datetime',
                notnull         : true

                // }}}

            }],

            // }}}

            primary_key         : 'pk',
            charset             : 'utf8',
            engine              : 'InnoDB',
            auto_increment      : 1

        }

        // }}}

    },

    // }}}
    // {{{ execute

    execute: function(o, callback) {

        var me      = this,
            async   = require('async'),
            skip    = false,
            series  = [];

        // タイトル出力
        CLI.log(MicroField.app.getTitle());

        series = [

            // {{{ アプリケーション設定取得

            function(next) {

                MicroField.app.getSettings(function(settings) {
                    me.setAppSettings(settings);
                    next();
                });

            },

            // }}}
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

                    me.replaceTemplates(me.getDestDirectory(o), me.getData(o), function() {
                        next();
                    });

                }

            },

            // }}}
            // {{{ テーブルセットアップ

            function(next) {

                // TODO: --nodb でスキップ
                if (!skip) {

                    me.setupTables(function() {
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

    },

    // }}}
    // {{{ getInitialDataQuery

    getInitialDataQuery: function() {

        /*
        var me          = this,
            fs          = Cmd.fs,
         scriptdir   = Cmd.scriptdir,
        format      = String.format,
        modName     = me.modName,
        tpldir      = format('{0}/tpl/{1}', scriptdir, modName),
        date        = Ext.util.Format.date(new Date(), 'yyyy-mm-dd HH:mm:ss'),
        sql         = [];

        // SQL生成
        Ext.iterate(fs.readFileSync(format('{0}/tests/data.txt', tpldir)).toString().split("\n"), function(item, i) {
            if (item) {
                sql.push(format('({0}, \'{1}\', \'{2}\', \'{3}\')', 1, Ext.util.Format.trim(item), date, date));
            }
        });

        return format('INSERT INTO {0} (status, textdata, modified, created) VALUES ', tableName) + sql.join(",\n") + ';';
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
