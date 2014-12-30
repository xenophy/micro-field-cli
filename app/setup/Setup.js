/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.setup.Setup

CLI.define('MicroField.setup.Setup', {

    // {{{ requires

    requires: [
        'MicroField.app.Environment',
        'MicroField.config.Config',
        'MicroField.database.Manager',
        'MicroField.setup.Main',
        'MicroField.setup.Login'
    ],

    // }}}
    // {{{ mixins

    mixins: [
        'CLI.mixin.Ansi'
    ],

    // }}}
    // {{{ singleton

    singleton: true,

    // }}}
    // {{{ config

    config: {

        // {{{ appSettings

        appSettings: {},

        // }}}
        // {{{ tableStructure

        /*
        tableStructure: {

            // {{{ name

            name: 'users',

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
                default         : 1

                // }}}

            }, {

                // {{{ role

                name            : 'role',
                type            : 'varchar',
                length          : 100,
                notnull         : true

                // }}}

            }, {

                // {{{ identity

                name            : 'identity',
                type            : 'varchar',
                length          : 255,
                notnull         : true

                // }}}

            }, {

                // {{{ password

                name            : 'password',
                type            : 'char',
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
            // {{{ tablse settings

            primary_key         : 'pk',
            charset             : 'utf8',
            engine              : 'InnoDB',
            auto_increment      : 1

            // }}}

        },

        */

        // }}}
        // {{{ userSetups

        userSetups: []

        // }}}

    },

    // }}}
    // {{{ constructor

    constructor: function(config) {

        var me  = this;

        me.initConfig(config);
        me.callParent(arguments);

        // ユーザーセットアップ関数登録メソッド追加
        CLI.apply(global, {

            ModuleSetup: function() {
                me.registUserSetup.apply(me, arguments);
            }

        });

        // MicroField Cmd 互換性対応
        CLI.ns('Cmd');
        CLI.apply(Cmd, {
            setup: global.ModuleSetup
        });

    },

    // }}}
    // {{{ existsSenchaCmd

    existsSenchaCmd: function(callback) {

        var me      = this,
            exec    = require('child_process').exec,
            log     = MicroField.app.log,
            f       = CLI.String.format,
            cmd     = '';

        // コマンド実行
        cmd = 'sencha';

        exec(cmd, function(error, stdout, stderr) {

            if (error) {

                log.error('cannot find Sencha Cmd');
                return;

            }

            callback();

        });

    },

    // }}}
    // {{{ makeDirectories

    makeDirectories: function(callback) {

        var me = this,
            async = require('async'),
            mkdirp = require('mkdirp'),
            fns = [];

        CLI.iterate([
            'resources/images',
            'login/resources/images'
        ], function(t) {

            fns.push((function(t) {

                return function(next) {

                    var target = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), t));

                    mkdirp(target, function (err) {

                        // [INF] made: ********
                        MicroField.app.log.info('made: ' + target);

                        next();
                    });

                }

            })(t));

        });

        // 非同期実行
        async.series(fns, function (err, result) {

            // コールバック
            callback();

        });

    },

    // }}}
    // {{{ parseApplicationSettings

    parseApplicationSettings: function(callback) {

        var me      = this,
            fs      = require('fs'),
            path    = require('path'),
            f       = CLI.String.format,
            target  = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), 'mods/microfield\-sample.json'));

        fs.readFile(target, function(err, data) {
            me.setAppSettings(CLI.decode(MicroField.app.removeComment(data.toString()), true));
            callback();
        });

    },

    // }}}
    // {{{ getInitialDataQuery

    /*
    getInitialDataQuery: function() {

        var me          = this,
            crypto      = require('crypto'),
            shasum      = crypto.createHash('sha512'),
            date        = CLI.Date.format(new Date(), 'Y-m-d H:m:s'),
            f           = CLI.String.format,
            identity    = me.getAppSettings()['database']['default']['user'],
            sql;

        return f([
            'INSERT INTO {0} (',
            '    status,',
            '    role,',
            '    identity,',
            '    password,',
            '    modified,',
            '    created',
            ') VALUES (',
            '    \'{1}\',',
            '    \'{2}\',',
            '    \'{3}\',',
            '    \'{4}\',',
            '    \'{5}\',',
            '    \'{6}\'',
            ')'
        ].join("\n"),
            me.getTableStructure().name,
            1,
            'administrator',
            identity,
            shasum.update(identity).digest('hex'),
            date,
            date
        );

    },
   */

    // }}}
    // {{{ setupTables

    setupTables: function(callback) {

        var me      = this,
            fs      = require('fs'),
            path    = require('path'),
            async   = require('async'),
            f       = CLI.String.format,
            skip    = false,
            fns, dbconf, conn, schema;

        // データベース接続設定
        dbconf = me.getAppSettings()['database']['default'];

        // コネクションラッパー取得
        conn = MicroField.database.Manager.getConnection(dbconf);

        // スキーマ取得
        schema = MicroField.database.Manager.getSchema(dbconf, 'users');

        fns = [

            // 接続
            function(next) {

                if (!skip) {

                    conn.connect(schema, next);

                } else {

                    next();

                }

            },

            // テーブル存在確認
            function(next) {

                if (!skip) {

                    conn.existsTable(function(err, exists) {

                        if (err || exists) {
                            skip = true;
                        }

                        next();

                    });

                } else {

                    next();

                }

            },

            // テーブル生成
            function(next) {

                if (!skip) {

                    conn.createTable(function(err) {

                        if (err) {
                            skip = true;
                        }

                        next();

                    });

                } else {

                    next();

                }

            },

            // 初期データ挿入
            function(next) {

                if (!skip) {

                    conn.insertData(function(err) {

                        if (err) {
                            skip = true;
                        }

                        next();

                    });

                } else {

                    next();

                }

            },

            // 切断
            function(next) {

                conn.disconnect(next);

            }

        ];

        // 非同期処理実行開始
        async.waterfall(fns, function(err) {
            callback();
        });

    },

    // }}}
    // {{{ setupModules

    setupModules: function(callback) {

        var me      = this,
            async   = require('async'),
            fs      = require('fs'),
            path    = require('path'),
            f       = CLI.String.format,
            fns     = [];

        CLI.iterate(me.getAppSettings()['mods'], function(modNs) {

            var target = CLI.resolvePath(
                path.join(
                    MicroField.app.getApplicationDir(),
                    'mods',
                    modNs,
                    'setup',
                    'index.js'
                )
            );

            fns.push((function(target) {

                return function(next) {

                    fs.exists(target, function(exists) {

                        if (exists) {
                            require(target);
                        }

                        next();

                    });

                };

            })(target));

        });

        fns.push(function(next) {

            var fns = [];

            CLI.iterate(me.getUserSetups(), function(fn, i) {

                fns.push(function(callback) {

                    if (fn.length === 0) {
                        fn();

                        // [INF] Execute (Module) module setup.
                        MicroField.app.log.info(f('Executed {0} module setup.', me.getAppSettings()['mods'][i]));

                        callback();
                    } else {
                        fn(function() {

                            // [INF] Execute (Module) module setup.
                            MicroField.app.log.info(f('Executed {0} module setup.', me.getAppSettings()['mods'][i]));

                            callback();
                        });
                    }

                });

            });

            // 非同期実行
            async.series(fns, function (err, result) {

                // コールバック
                next();

            });

        });

        // 非同期実行
        async.series(fns, function (err, result) {

            // コールバック
            callback();

        });

    },

    // }}}
    // {{{ registUserSetup

    registUserSetup: function(fn) {

        var me = this,
            tmp;

        tmp = me.getUserSetups();
        tmp.push(fn);

        me.setUserSetups(tmp);

    },

    // }}}
    // {{{ execute

    execute: function() {

        var me      = this,
            async   = require('async'),
            fs      = require('fs'),
            path    = require('path'),
            f       = CLI.String.format,
            log     = MicroField.app.log,
            bold    = me.ansi.bold,
            cfg     = MicroField.config.Config,
            login   = MicroField.setup.Login,
            main    = MicroField.setup.Main,
            text    = '';

        // タイトル出力
        CLI.log(MicroField.app.getTitle());

        // 非同期処理実行開始
        async.series([

            // senchaコマンド存在確認
            function(next) {
                me.existsSenchaCmd(next);
            },

            // アプリケーションディレクトリでの実行であるかを判定
            function(next) {

                if (!MicroField.app.isApplicationDir()) {

                    log.error('cannot find ' + bold(MicroField.app.getSampleFilename()));
                    return;
                }

                next();

            },

            // Ext JS 存在確認
            function(next) {

                var extPath = cfg.getValues()['extPath'];

                if (!CLI.isDefined(extPath)) {

                    log.error('"' + bold('extPath') + '" config have not been set.');

                    text  = "\n";
                    text += 'Please set the ' + bold('extPath') + ' using folloing command.';
                    text += "\n";
                    text += "\n";
                    text += "  microfield config --extPath=\"[Ext JS Path]\"";
                    text += "\n";

                    CLI.log(text);

                    return;
                }

                fs.exists(CLI.resolvePath(extPath), function(exists) {

                    if (!exists) {

                        log.error('cannot find Ext JS in "' + bold(extPath) + '"');
                        return;

                    }

                    fs.exists(path.resolve(path.join(CLI.resolvePath(extPath), 'src')), function(exists) {

                        if (!exists) {

                            log.error('cannot find Ext JS in "' + bold(extPath) + '"');
                            return;

                        }

                        next();

                    });

                });

            },

            // .htaccess 解析
            function(next) {

                MicroField.app.Environment.getHtaccess(function(data) {

                    // メイン設定
                    main.setUrl(data.url + '/');

                    // ログイン設定
                    login.setUrl(data.url + '/login/');

                    next();
                });

            },

            // microfield-sample.json 解析
            function(next) {
                me.parseApplicationSettings(next);
            },

            // microfield-sample.jsonのコピー
            function(next) {

                MicroField.app.copyFiles([
                    ['mods/microfield\-sample.json', 'mods/microfield.json']
                ], function(src, dest) {

                    // [INF] copied: ***************
                    MicroField.app.log.info(f('copied: {0} to {1}', src, dest));

                }, function(count) {

                    // コールバック
                    next();

                });

            },

            /*
            // ログイン:クリーンアップ
            function(next) {
                login.cleanup.call(login, next);
            },

            // メイン:クリーンアップ
            function(next) {
                main.cleanup.call(main, next);
            },
           */

            // データベーステーブルセットアップ
            function(next) {
                me.setupTables(next);
            },

            /*
            // ログイン:セットアップ実行
            function(next) {
                login.execute.call(login, next);
            },

            // メイン:セットアップ実行
            function(next) {
                main.execute.call(main, next);
            },

            // 必要ディレクトリ作成
            function(next) {
                me.makeDirectories(next);
            },

            // 書き込み権限変更
            function(next) {

                if (!CLI.isWindows) {

                    MicroField.app.changeToWritable([
                        '.htaccess',
                        'app.json',
                        'mods/MicroField/app/Application.js',
                        'mods/MicroField/app/view/center/Center.js',
                        'sass/src/view/main/Main.scss',
                        'login/app.json',
                        'login/sass/src/view/main/Main.scss',
                        'login/mods/MicroField/app/view/main/Main.js',
                        'login/mods/MicroField/app/Application.js',
                        'resources/Readme.md',
                        'resources/favicon.ico',
                        'login/resources/Readme.md',
                        'login/resources/favicon.ico',
                        'resources',
                        'resources/protected',
                        'login/resources',
                        'resources/images',
                        'login/resources/images',
                        'build/production/MicroField/resources',
                        'build/production/MicroField/resources/protected'
                    ], function(item) {

                        // [INF] copied: ***************
                        MicroField.app.log.info(f('chmod: {0}', item));

                    }, function(count) {

                        // コールバック
                        next();

                    });

                } else {

                    // コールバック
                    next();

                }

            },

            // モジュールセットアップ実行
            function(next) {
                me.setupModules(next);
            },

            // ログイン：アクセス初期化
            function(next) {
                login.access4Init.call(login, next);
            },

            // メイン：アクセス初期化
            function(next) {
                main.access4Init.call(main, next);
            },

            // ログイン:リビルド
            function(next) {
                login.buildApplication.call(login, next);
            },

            // メイン:リビルド
            function(next) {
                main.buildApplication.call(main, next);
            }
           */

        ], function (err, result) {

            // console.log("done!");

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
