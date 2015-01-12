/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * This file is part of MicroField CLI
 */

// {{{ helper

require('../../../helper.js');

// }}}
// {{{ microfield generate

describe("microfield generate", function() {

    var cfg         = getMicroFieldConfig(),
        rewriteBase = 'micro-field-cli-test-generate',
        targetPath  = getTargetPath(rewriteBase),
        decidedIt   = ((!cfg || !cfg.releasesUrl || !cfg.accessToken) ? it.skip : it),
        genTestFn, genDuplicateTestFn, dbTests, tests;

    // TODO: とりあえずテストから外すため、後で削除
    decidedIt = it.skip;

    // テスト実行関数
    genTestFn = function(type, callback) {

        var done = function() {

            // カレントディレクトリ復元
            process.chdir(currentPath);

            // コールバック
            callback();

        };

        return function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // テスト対象ファイル一覧取得
            var walk = function(dir, done) {
                var results = [];
                fs.readdir(dir, function(err, list) {
                    if (err) return done(err);
                    var i = 0;
                    (function next() {
                        var file = list[i++];
                        if (!file) return done(null, results);
                        file = dir + '/' + file;
                        fs.stat(file, function(err, stat) {
                            if (stat && stat.isDirectory()) {
                                walk(file, function(err, res) {
                                    results = results.concat(res);
                                    next();
                                });
                            } else {
                                results.push(file);
                                next();
                            }
                        });
                    })();
                });
            };

            walk(path.join(currentPath, 'test/files/generate/mods', type), function(err, results) {

                var files = [], jsons = [];

                // テスト対象パスへ変換
                CLI.iterate(results, function(filePath, num) {

                    filePath = filePath.substr(path.resolve(filePath, path.join(currentPath, 'test/files/generate/mods', type)).length);

                    var tmp = path.join(targetPath, 'mods', type, filePath);

                    files.push(tmp);

                    if (path.extname(tmp) === '.json') {
                        jsons.push(tmp);
                    }

                });

                // ファイル配置テスト
                CLI.iterate(files, function(filePath) {

                    // 存在確認
                    assert.ok(fs.existsSync(filePath));

                    // ファイルの内容テスト
                    assert.equal(
                        removeComment(fs.readFileSync(filePath).toString()),
                        removeComment(fs.readFileSync(path.join(currentPath, 'test/files/generate/mods', type, filePath.substr(path.join(targetPath, 'mods', type).length))).toString())
                    );

                });

                // JSON生成テスト
                CLI.iterate(jsons, function(filePath) {

                    var dest = CLI.decode(removeComment(fs.readFileSync(filePath).toString()), true);

                    var compFilePath = path.join(currentPath, 'test/files/generate/mods', type, filePath.substr(path.join(targetPath, 'mods', type).length));

                    var comp = CLI.decode(removeComment(fs.readFileSync(compFilePath).toString()), true);

                    assert.deepEqual(dest, comp);
                });

                // データベーステーブルテスト
                if (dbTests[type]) {

                    var t = dbTests[type];

                    // データベーステーブル生成テスト
                    var dbconf = getTargetConfig(targetPath).database.default;

                    // コネクションラッパー取得
                    var conn = MicroField.database.Manager.getConnection(dbconf);

                    // スキーマ取得
                    var schema = MicroField.database.Manager.getSchema(dbconf, t.schema);

                    // 接続
                    conn.connect(schema, function() {

                        // テーブル存在確認
                        conn.existsTable(function(err, exists) {

                            // 存在確認
                            if (t.exists) {

                                assert.ok(exists);

                                // テーブル定義確認
                                conn.query('SHOW CREATE TABLE ' + schema.getName(), function(err, tbl) {

                                    assert.deepEqual(
                                        tbl,
                                        [{
                                            Table: t.tableName,
                                            'Create Table': t.ddl
                                        }]
                                    );

                                    done();

                                });


                            } else {
                                assert.ok(!exists);

                                done();
                            }

                        });

                    });

                } else {

                    done();

                }

            });

        };

    };

    genDuplicateTestFn = function(type, callback) {

        return function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // 重複エラーテスト
            var comp = [
                'MicroField CLI v{0}'.bold,
                '',
                '{1} Could not generate "{2}" directory, that is already exists.',
                ''
            ].join("\n");

            comp = CLI.String.format(
                comp,
                MicroField.manifest.version,
                '[ERR]'.red.bold,
                type.bold
            );

            assert.equal(stdout, comp);

            // カレントディレクトリ復元
            process.chdir(currentPath);

            // コールバック
            callback();

        };

    };

    dbTests = {
        'MFTest/Edit': {
            exists      : true,
            tableName   : 'edit',
            schema: {
                cls     : 'Edit',
                table   : 'edit'
            },
            ddl         : [
                'CREATE TABLE `edit` (',
                '  `pk` bigint(20) NOT NULL AUTO_INCREMENT,',
                '  `status` tinyint(4) NOT NULL DEFAULT \'1\',',
                '  `textdata` varchar(255) NOT NULL,',
                '  `modified` datetime NOT NULL,',
                '  `created` datetime NOT NULL,',
                '  PRIMARY KEY (`pk`)',
                ') ENGINE=InnoDB DEFAULT CHARSET=utf8'
            ].join("\n")
        },
        'MFTest/EditOtherName': {
            exists      : true,
            tableName   : 'edit',
            schema: {
                cls     : 'Edit',
                table   : 'edit'
            },
            ddl         : [
                'CREATE TABLE `edit` (',
                '  `pk` bigint(20) NOT NULL AUTO_INCREMENT,',
                '  `status` tinyint(4) NOT NULL DEFAULT \'1\',',
                '  `textdata` varchar(255) NOT NULL,',
                '  `modified` datetime NOT NULL,',
                '  `created` datetime NOT NULL,',
                '  PRIMARY KEY (`pk`)',
                ') ENGINE=InnoDB DEFAULT CHARSET=utf8'
            ].join("\n")
        },
        'MFTest/EditOtherScreenName': {
            exists      : true,
            tableName   : 'edit',
            schema: {
                cls     : 'Edit',
                table   : 'edit'
            },
            ddl         : [
                'CREATE TABLE `edit` (',
                '  `pk` bigint(20) NOT NULL AUTO_INCREMENT,',
                '  `status` tinyint(4) NOT NULL DEFAULT \'1\',',
                '  `textdata` varchar(255) NOT NULL,',
                '  `modified` datetime NOT NULL,',
                '  `created` datetime NOT NULL,',
                '  PRIMARY KEY (`pk`)',
                ') ENGINE=InnoDB DEFAULT CHARSET=utf8'
            ].join("\n")
        },
        'MFTest/EditOtherTable': {
            exists      : true,
            tableName   : 'editothertable',
            schema: {
                cls     : 'Edit',
                table   : 'editothertable'
            },
            ddl         : [
                'CREATE TABLE `editothertable` (',
                '  `pk` bigint(20) NOT NULL AUTO_INCREMENT,',
                '  `status` tinyint(4) NOT NULL DEFAULT \'1\',',
                '  `textdata` varchar(255) NOT NULL,',
                '  `modified` datetime NOT NULL,',
                '  `created` datetime NOT NULL,',
                '  PRIMARY KEY (`pk`)',
                ') ENGINE=InnoDB DEFAULT CHARSET=utf8'
            ].join("\n")
        },
        'MFTest/EditNoDB': {
            exists      : false,
            tableName   : 'editnodb',
            schema: {
                cls     : 'Edit',
                table   : 'editnodb'
            }
        },
        'MFTest/EditList': {
            exists      : true,
            tableName   : 'editlist',
            schema: {
                cls     : 'EditList',
                table   : 'editlist'
            },
            ddl         : [
                'CREATE TABLE `editlist` (',
                '  `pk` bigint(20) NOT NULL AUTO_INCREMENT,',
                '  `status` tinyint(4) NOT NULL DEFAULT \'1\',',
                '  `textdata` varchar(255) NOT NULL,',
                '  `modified` datetime NOT NULL,',
                '  `created` datetime NOT NULL,',
                '  PRIMARY KEY (`pk`)',
                ') ENGINE=InnoDB DEFAULT CHARSET=utf8'
            ].join("\n")
        },
        'MFTest/EditListOtherName': {
            exists      : true,
            tableName   : 'editlist',
            schema: {
                cls     : 'EditList',
                table   : 'editlist'
            },
            ddl         : [
                'CREATE TABLE `editlist` (',
                '  `pk` bigint(20) NOT NULL AUTO_INCREMENT,',
                '  `status` tinyint(4) NOT NULL DEFAULT \'1\',',
                '  `textdata` varchar(255) NOT NULL,',
                '  `modified` datetime NOT NULL,',
                '  `created` datetime NOT NULL,',
                '  PRIMARY KEY (`pk`)',
                ') ENGINE=InnoDB DEFAULT CHARSET=utf8'
            ].join("\n")
        },
        'MFTest/EditListOtherScreenName': {
            exists      : true,
            tableName   : 'editlist',
            schema: {
                cls     : 'EditList',
                table   : 'editlist'
            },
            ddl         : [
                'CREATE TABLE `editlist` (',
                '  `pk` bigint(20) NOT NULL AUTO_INCREMENT,',
                '  `status` tinyint(4) NOT NULL DEFAULT \'1\',',
                '  `textdata` varchar(255) NOT NULL,',
                '  `modified` datetime NOT NULL,',
                '  `created` datetime NOT NULL,',
                '  PRIMARY KEY (`pk`)',
                ') ENGINE=InnoDB DEFAULT CHARSET=utf8'
            ].join("\n")
        },
        'MFTest/EditListOtherTable': {
            exists      : true,
            tableName   : 'editlistothertable',
            schema: {
                cls     : 'EditList',
                table   : 'editlistothertable'
            },
            ddl         : [
                'CREATE TABLE `editlistothertable` (',
                '  `pk` bigint(20) NOT NULL AUTO_INCREMENT,',
                '  `status` tinyint(4) NOT NULL DEFAULT \'1\',',
                '  `textdata` varchar(255) NOT NULL,',
                '  `modified` datetime NOT NULL,',
                '  `created` datetime NOT NULL,',
                '  PRIMARY KEY (`pk`)',
                ') ENGINE=InnoDB DEFAULT CHARSET=utf8'
            ].join("\n")
        },
        'MFTest/EditListNoDB': {
            exists      : false,
            tableName   : 'editlistnodb',
            schema: {
                cls     : 'Edit',
                table   : 'editlistnodb'
            }
        }
    };

    tests = {
        'generate header': {
            cmd     : programPath + ' generate header MFTest/Header',
            type    : 'MFTest/Header',
            gen     : genTestFn
        },
        'generate header duplicate': {
            cmd     : programPath + ' generate header MFTest/Header',
            type    : 'MFTest/Header',
            gen     : genDuplicateTestFn
        },
        'generate footer': {
            cmd     : programPath + ' generate footer MFTest/Footer',
            type    : 'MFTest/Footer',
            gen     : genTestFn
        },
        'generate footer duplicate': {
            cmd     : programPath + ' generate footer MFTest/Footer',
            type    : 'MFTest/Footer',
            gen     : genDuplicateTestFn
        },
        'generate navigation': {
            cmd     : programPath + ' generate navigation MFTest/Navigation',
            type    : 'MFTest/Navigation',
            gen     : genTestFn
        },
        'generate navigation duplicate': {
            cmd     : programPath + ' generate footer MFTest/Navigation',
            type    : 'MFTest/Navigation',
            gen     : genDuplicateTestFn
        },
        'generate tabletnavigation': {
            cmd     : programPath + ' generate navigation MFTest/TabletNavigation',
            type    : 'MFTest/TabletNavigation',
            gen     : genTestFn
        },
        'generate tabletnavigation duplicate': {
            cmd     : programPath + ' generate footer MFTest/TabletNavigation',
            type    : 'MFTest/TabletNavigation',
            gen     : genDuplicateTestFn
        },
        'generate base': {
            cmd     : programPath + ' generate base MFTest/Base',
            type    : 'MFTest/Base',
            gen     : genTestFn
        },
        'generate base other name': {
            cmd     : programPath + ' generate base MFTest/BaseOtherName',
            type    : 'MFTest/BaseOtherName',
            gen     : genTestFn
        },
        'generate base other screen name': {
            cmd     : programPath + ' generate base MFTest/BaseOtherScreenName --name=basesetothername',
            type    : 'MFTest/BaseOtherScreenName',
            gen     : genTestFn
        },
        'generate base duplicate': {
            cmd     : programPath + ' generate base MFTest/Base',
            type    : 'MFTest/Base',
            gen     : genDuplicateTestFn
        },
        'generate edit': {
            cmd     : programPath + ' generate edit MFTest/Edit',
            type    : 'MFTest/Edit',
            gen     : genTestFn
        },
        'generate edit other name': {
            cmd     : programPath + ' generate edit MFTest/EditOtherName',
            type    : 'MFTest/EditOtherName',
            gen     : genTestFn
        },
        'generate edit other screen name': {
            cmd     : programPath + ' generate edit MFTest/EditOtherScreenName --name=editsetothername',
            type    : 'MFTest/EditOtherScreenName',
            gen     : genTestFn
        },
        'generate edit other table': {
            cmd     : programPath + ' generate edit MFTest/EditOtherTable --table=editothertable',
            type    : 'MFTest/EditOtherTable',
            gen     : genTestFn
        },
        'generate edit nodb': {
            cmd     : programPath + ' generate edit MFTest/EditNoDB --table=editnodb --nodb',
            type    : 'MFTest/EditNoDB',
            gen     : genTestFn
        },
        'generate edit duplicate': {
            cmd     : programPath + ' generate edit MFTest/Edit',
            type    : 'MFTest/Edit',
            gen     : genDuplicateTestFn
        },
        'generate editlist': {
            cmd     : programPath + ' generate editlist MFTest/EditList',
            type    : 'MFTest/EditList',
            gen     : genTestFn
        },
        'generate editlist other name': {
            cmd     : programPath + ' generate editlist MFTest/EditListOtherName',
            type    : 'MFTest/EditListOtherName',
            gen     : genTestFn
        },
        'generate editlist other screen name': {
            cmd     : programPath + ' generate editlist MFTest/EditListOtherScreenName --name=editlistsetothername',
            type    : 'MFTest/EditListOtherScreenName',
            gen     : genTestFn
        },
        'generate editlist other table': {
            cmd     : programPath + ' generate editlist MFTest/EditListOtherTable --table=editlistothertable',
            type    : 'MFTest/EditListOtherTable',
            gen     : genTestFn
        },
        'generate editlist nodb': {
            cmd     : programPath + ' generate editlist MFTest/EditListNoDB --table=editlistnodb --nodb',
            type    : 'MFTest/EditListNoDB',
            gen     : genTestFn
        },
        'generate editlist duplicate': {
            cmd     : programPath + ' generate editlist MFTest/EditList',
            type    : 'MFTest/EditList',
            gen     : genDuplicateTestFn
        }
    };

    // {{{ setup for generate test

    decidedIt("setup for generate test", function(next) {
        execChildProcess('cat ' + currentPath + '/test/clear.sql|mysql -uroot', function(err, stdout, stderr) {
            setupAchive(rewriteBase, null, function(targetPath) {
                next();
            });
        });
    });

    // }}}
    // {{{ define for tests

    CLI.iterate(tests, function(key, value) {

        decidedIt(key, function(next) {

            // 作業ディレクトリへ移動
            process.chdir(targetPath);

            // テスト実行
            execChildProcess(value.cmd, value.gen(value.type, next));

        });

    });

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
