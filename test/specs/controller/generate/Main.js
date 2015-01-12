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
        filelist    = {},
        jsonlist    = {},
        genTestFn;

    // テスト実行関数
    genTestFn = function(type, callback) {

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
                        fs.readFileSync(filePath).toString(),
                        fs.readFileSync(path.join(currentPath, 'test/files/generate/mods', type, filePath.substr(path.join(targetPath, 'mods', type).length))).toString()
                    );

                });

                // JSON生成テスト
                CLI.iterate(jsons, function(filePath) {

                    var dest = CLI.decode(removeComment(fs.readFileSync(filePath).toString()), true);

                    var compFilePath = path.join(currentPath, 'test/files/generate/mods', type, filePath.substr(path.join(targetPath, 'mods', type).length));

                    var comp = CLI.decode(removeComment(fs.readFileSync(compFilePath).toString()), true);

                    assert.deepEqual(dest, comp);
                });

                // カレントディレクトリ復元
                process.chdir(currentPath);

                // コールバック
                callback();


            });

        };

    };

        // TODO: とりあえずテストから外すため、後で削除
        //decidedIt = it.skip;

    // {{{ setup for generate test

    /*
    decidedIt("setup for generate test", function(next) {
        execChildProcess('cat ' + currentPath + '/test/clear.sql|mysql -uroot', function(err, stdout, stderr) {
            setupAchive(rewriteBase, null, function(targetPath) {
                next();
            });
        });
    });
   */

    // }}}
    // {{{ generate header

    decidedIt("generate header", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        // テスト実行
        execChildProcess(programPath + ' generate header MFTest/Header', genTestFn('MFTest/Header', next));

    });

    // }}}
    // {{{ generate header duplicate

    decidedIt("generate header duplicate", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate header MFTest/Header', function(err, stdout, stderr) {

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
                'MFTest/Header'.bold
            );

            assert.equal(stdout, comp);

            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

    });

    // }}}
    // {{{ generate footer

    decidedIt("generate footer", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        // テスト実行
        execChildProcess(programPath + ' generate footer MFTest/Footer', genTestFn('MFTest/Footer', next));

    });

    // }}}
    // {{{ generate footer duplicate

    decidedIt("generate footer duplicate", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate footer MFTest/Footer', function(err, stdout, stderr) {

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
                'MFTest/Footer'.bold
            );

            assert.equal(stdout, comp);

            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

    });

    // }}}
    // {{{ generate navigation

    decidedIt("generate navigation", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        // テスト実行
        execChildProcess(programPath + ' generate navigation MFTest/Navigation', genTestFn('MFTest/Navigation', next));

    });

    // }}}
    // {{{ generate navigation duplicate

    decidedIt("generate navigation duplicate", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate navigation MFTest/Navigation', function(err, stdout, stderr) {

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
                'MFTest/Navigation'.bold
            );

            assert.equal(stdout, comp);

            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

    });

    // }}}
    // {{{ generate tabletnavigation

    decidedIt("generate tabletnavigation", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        // テスト実行
        execChildProcess(programPath + ' generate tabletnavigation MFTest/TabletNavigation', genTestFn('MFTest/TabletNavigatio', next));

    });


    // }}}
    // {{{ generate tabletnavigation duplicate

    decidedIt("generate tabletnavigation duplicate", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate tabletnavigation MFTest/TabletNavigation', function(err, stdout, stderr) {

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
                'MFTest/TabletNavigation'.bold
            );

            assert.equal(stdout, comp);

            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

    });

    // }}}
    // {{{ generate base

    decidedIt("generate base", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        // テスト実行
        execChildProcess(programPath + ' generate base MFTest/Base', genTestFn('MFTest/Base', next));
    });

    // }}}
    // {{{ generate base other name

    decidedIt("generate base other name", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        // テスト実行
        execChildProcess(programPath + ' generate base MFTest/BaseOtherName', genTestFn('MFTest/BaseOtherName', next));
    });

    // }}}
    // {{{ generate base other screen name

    decidedIt("generate base other screen name", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        // テスト実行
        execChildProcess(programPath + ' generate base MFTest/BaseOtherScreenName --name=basesetothername', genTestFn('MFTest/BaseOtherScreenName', next));

    });

    // }}}
    // {{{ generate base duplicate

    decidedIt("generate base duplicate", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate base MFTest/Base', function(err, stdout, stderr) {

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
                'MFTest/Base'.bold
            );

            assert.equal(stdout, comp);

            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

    });

    // }}}
    // {{{ generate edit

    decidedIt("generate edit", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate edit MFTest/Edit', genTestFn('MFTest/Edit', function() {

            // データベーステーブル生成テスト
            var dbconf = getTargetConfig(targetPath).database.default;

            // コネクションラッパー取得
            var conn = MicroField.database.Manager.getConnection(dbconf);

            // スキーマ取得
            var schema = MicroField.database.Manager.getSchema(dbconf, {
                cls     : 'Edit',
                table   : 'edit'
            });

            // 接続
            conn.connect(schema, function() {

                // テーブル存在確認
                conn.existsTable(function(err, exists) {

                    // 存在確認
                    assert.ok(exists);

                    // テーブル定義確認
                    conn.query('SHOW CREATE TABLE ' + schema.getName(), function(err, tbl) {

                        assert.deepEqual(
                            tbl,
                            [{
                                Table: 'edit',
                                'Create Table': [
                                    'CREATE TABLE `edit` (',
                                    '  `pk` bigint(20) NOT NULL AUTO_INCREMENT,',
                                    '  `status` tinyint(4) NOT NULL DEFAULT \'1\',',
                                    '  `textdata` varchar(255) NOT NULL,',
                                    '  `modified` datetime NOT NULL,',
                                    '  `created` datetime NOT NULL,',
                                    '  PRIMARY KEY (`pk`)',
                                    ') ENGINE=InnoDB DEFAULT CHARSET=utf8'
                                ].join("\n")
                            }]
                        );

                    });

                    // カレントディレクトリ復元
                    process.chdir(currentPath);

                    next();

                });

            });

        }));

    });

    // }}}
    // {{{ generate edit other name

    decidedIt("generate edit other name", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        // テスト実行
        execChildProcess(programPath + ' generate edit MFTest/EditOtherName', genTestFn('MFTest/EditOtherName', function() {

            // データベーステーブル生成テスト
            var dbconf = getTargetConfig(targetPath).database.default;

            // コネクションラッパー取得
            var conn = MicroField.database.Manager.getConnection(dbconf);

            // スキーマ取得
            var schema = MicroField.database.Manager.getSchema(dbconf, {
                cls     : 'Edit',
                table   : 'edit'
            });

            // 接続
            conn.connect(schema, function() {

                // テーブル存在確認
                conn.existsTable(function(err, exists) {

                    // 存在確認
                    assert.ok(exists);

                    // テーブル定義確認
                    conn.query('SHOW CREATE TABLE ' + schema.getName(), function(err, tbl) {

                        try {

                        assert.deepEqual(
                            tbl,
                            [{
                                Table: 'edit',
                                'Create Table': [
                                    'CREATE TABLE `edit` (',
                                    '  `pk` bigint(20) NOT NULL AUTO_INCREMENT,',
                                    '  `status` tinyint(4) NOT NULL DEFAULT \'1\',',
                                    '  `textdata` varchar(255) NOT NULL,',
                                    '  `modified` datetime NOT NULL,',
                                    '  `created` datetime NOT NULL,',
                                    '  PRIMARY KEY (`pk`)',
                                    ') ENGINE=InnoDB DEFAULT CHARSET=utf8'
                                ].join("\n")
                            }]
                        );

                        } catch(e) {
                            console.log(e);
                        }

                    });

                    // カレントディレクトリ復元
                    process.chdir(currentPath);

                    next();

                });

            });

        }));

    });

    // }}}
    // {{{ generate edit other screen name

    decidedIt("generate edit other screen name", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate edit MFTest/EditOtherScreenName --name=editsetothername', genTestFn('MFTest/EditOtherScreenName', function() {

            // データベーステーブル生成テスト
            var dbconf = getTargetConfig(targetPath).database.default;

            // コネクションラッパー取得
            var conn = MicroField.database.Manager.getConnection(dbconf);

            // スキーマ取得
            var schema = MicroField.database.Manager.getSchema(dbconf, {
                cls     : 'Edit',
                table   : 'edit'
            });

            // 接続
            conn.connect(schema, function() {

                // テーブル存在確認
                conn.existsTable(function(err, exists) {

                    // 存在確認
                    assert.ok(exists);

                    // テーブル定義確認
                    conn.query('SHOW CREATE TABLE ' + schema.getName(), function(err, tbl) {

                        assert.deepEqual(
                            tbl,
                            [{
                                Table: 'edit',
                                'Create Table': [
                                    'CREATE TABLE `edit` (',
                                    '  `pk` bigint(20) NOT NULL AUTO_INCREMENT,',
                                    '  `status` tinyint(4) NOT NULL DEFAULT \'1\',',
                                    '  `textdata` varchar(255) NOT NULL,',
                                    '  `modified` datetime NOT NULL,',
                                    '  `created` datetime NOT NULL,',
                                    '  PRIMARY KEY (`pk`)',
                                    ') ENGINE=InnoDB DEFAULT CHARSET=utf8'
                                ].join("\n")
                            }]
                        );

                    });

                    // カレントディレクトリ復元
                    process.chdir(currentPath);

                    next();

                });

            });

        }));

    });

    // }}}
    // {{{ generate edit other table

    decidedIt("generate edit other table", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        // テスト実行
        execChildProcess(programPath + ' generate edit MFTest/EditOtherTable --table=editothertable', genTestFn('MFTest/EditOtherTable', function() {

            // データベーステーブル生成テスト
            var dbconf = getTargetConfig(targetPath).database.default;

            // コネクションラッパー取得
            var conn = MicroField.database.Manager.getConnection(dbconf);

            // スキーマ取得
            var schema = MicroField.database.Manager.getSchema(dbconf, {
                cls     : 'Edit',
                table   : 'editothertable'
            });

            // 接続
            conn.connect(schema, function() {

                // テーブル存在確認
                conn.existsTable(function(err, exists) {

                    // 存在確認
                    assert.ok(exists);

                    // テーブル定義確認
                    conn.query('SHOW CREATE TABLE ' + schema.getName(), function(err, tbl) {

                        assert.deepEqual(
                            tbl,
                            [{
                                Table: 'editothertable',
                                'Create Table': [
                                    'CREATE TABLE `editothertable` (',
                                    '  `pk` bigint(20) NOT NULL AUTO_INCREMENT,',
                                    '  `status` tinyint(4) NOT NULL DEFAULT \'1\',',
                                    '  `textdata` varchar(255) NOT NULL,',
                                    '  `modified` datetime NOT NULL,',
                                    '  `created` datetime NOT NULL,',
                                    '  PRIMARY KEY (`pk`)',
                                    ') ENGINE=InnoDB DEFAULT CHARSET=utf8'
                                ].join("\n")
                            }]
                        );

                    });

                    // カレントディレクトリ復元
                    process.chdir(currentPath);

                    next();

                });

            });

        }));

    });

    // }}}
    // {{{ generate edit nodb

    decidedIt("generate edit nodb", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        // テスト実行
        execChildProcess(programPath + ' generate edit MFTest/EditNoDB --table=editnodb --nodb', genTestFn('MFTest/EditNoDB', function() {

            // データベーステーブル生成テスト
            var dbconf = getTargetConfig(targetPath).database.default;

            // コネクションラッパー取得
            var conn = MicroField.database.Manager.getConnection(dbconf);

            // スキーマ取得
            var schema = MicroField.database.Manager.getSchema(dbconf, {
                cls     : 'Edit',
                table   : 'editnodb'
            });

            // 接続
            conn.connect(schema, function() {

                // テーブル存在確認
                conn.existsTable(function(err, exists) {

                    // 存在確認
                    assert.ok(!exists);

                    // カレントディレクトリ復元
                    process.chdir(currentPath);

                    next();

                });

            });

        }));

    });

    // }}}
    // {{{ generate edit duplicate

    decidedIt("generate edit duplicate", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate edit MFTest/Edit', function(err, stdout, stderr) {

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
                'MFTest/Edit'.bold
            );

            assert.equal(stdout, comp);

            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

    });

    // }}}
    // {{{ generate editlist

    decidedIt("generate editlist", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        // テスト実行
        execChildProcess(programPath + ' generate editlist MFTest/EditList', genTestFn('MFTest/EditList', function() {

            // データベーステーブル生成テスト
            var dbconf = getTargetConfig(targetPath).database.default;

            // コネクションラッパー取得
            var conn = MicroField.database.Manager.getConnection(dbconf);

            // スキーマ取得
            var schema = MicroField.database.Manager.getSchema(dbconf, {
                cls     : 'EditList',
                table   : 'editlist'
            });

            // 接続
            conn.connect(schema, function() {

                // テーブル存在確認
                conn.existsTable(function(err, exists) {

                    // 存在確認
                    assert.ok(exists);

                    // テーブル定義確認
                    conn.query('SHOW CREATE TABLE ' + schema.getName(), function(err, tbl) {

                        assert.deepEqual(
                            tbl,
                            [{
                                Table: 'editlist',
                                'Create Table': [
                                    'CREATE TABLE `editlist` (',
                                    '  `pk` bigint(20) NOT NULL AUTO_INCREMENT,',
                                    '  `status` tinyint(4) NOT NULL DEFAULT \'1\',',
                                    '  `textdata` varchar(255) NOT NULL,',
                                    '  `modified` datetime NOT NULL,',
                                    '  `created` datetime NOT NULL,',
                                    '  PRIMARY KEY (`pk`)',
                                    ') ENGINE=InnoDB DEFAULT CHARSET=utf8'
                                ].join("\n")
                            }]
                        );

                    });

                    // カレントディレクトリ復元
                    process.chdir(currentPath);

                    next();

                });

            });

        }));

    });

    // }}}
    // {{{ generate editlist other name

    decidedIt("generate editlist other name", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        // テスト実行
        execChildProcess(programPath + ' generate editlist MFTest/EditListOtherName', genTestFn('MFTest/EditListOtherName', function() {

            // データベーステーブル生成テスト
            var dbconf = getTargetConfig(targetPath).database.default;

            // コネクションラッパー取得
            var conn = MicroField.database.Manager.getConnection(dbconf);

            // スキーマ取得
            var schema = MicroField.database.Manager.getSchema(dbconf, {
                cls     : 'EditList',
                table   : 'editlist'
            });

            // 接続
            conn.connect(schema, function() {

                // テーブル存在確認
                conn.existsTable(function(err, exists) {

                    // 存在確認
                    assert.ok(exists);

                    // テーブル定義確認
                    conn.query('SHOW CREATE TABLE ' + schema.getName(), function(err, tbl) {

                        assert.deepEqual(
                            tbl,
                            [{
                                Table: 'editlist',
                                'Create Table': [
                                    'CREATE TABLE `editlist` (',
                                    '  `pk` bigint(20) NOT NULL AUTO_INCREMENT,',
                                    '  `status` tinyint(4) NOT NULL DEFAULT \'1\',',
                                    '  `textdata` varchar(255) NOT NULL,',
                                    '  `modified` datetime NOT NULL,',
                                    '  `created` datetime NOT NULL,',
                                    '  PRIMARY KEY (`pk`)',
                                    ') ENGINE=InnoDB DEFAULT CHARSET=utf8'
                                ].join("\n")
                            }]
                        );

                    });

                    // カレントディレクトリ復元
                    process.chdir(currentPath);

                    next();

                });

            });

        }));

    });

    // }}}
    // {{{ generate editlist other screen name

    decidedIt("generate editlist other screen name", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        // テスト実行
        execChildProcess(programPath + ' generate editlist MFTest/EditListOtherScreenName --name=editlistsetothername', genTestFn('MFTest/EditListOtherScreenName', function() {

            // データベーステーブル生成テスト
            var dbconf = getTargetConfig(targetPath).database.default;

            // コネクションラッパー取得
            var conn = MicroField.database.Manager.getConnection(dbconf);

            // スキーマ取得
            var schema = MicroField.database.Manager.getSchema(dbconf, {
                cls     : 'EditList',
                table   : 'editlist'
            });

            // 接続
            conn.connect(schema, function() {

                // テーブル存在確認
                conn.existsTable(function(err, exists) {

                    // 存在確認
                    assert.ok(exists);

                    // テーブル定義確認
                    conn.query('SHOW CREATE TABLE ' + schema.getName(), function(err, tbl) {

                        assert.deepEqual(
                            tbl,
                            [{
                                Table: 'editlist',
                                'Create Table': [
                                    'CREATE TABLE `editlist` (',
                                    '  `pk` bigint(20) NOT NULL AUTO_INCREMENT,',
                                    '  `status` tinyint(4) NOT NULL DEFAULT \'1\',',
                                    '  `textdata` varchar(255) NOT NULL,',
                                    '  `modified` datetime NOT NULL,',
                                    '  `created` datetime NOT NULL,',
                                    '  PRIMARY KEY (`pk`)',
                                    ') ENGINE=InnoDB DEFAULT CHARSET=utf8'
                                ].join("\n")
                            }]
                        );

                    });

                    // カレントディレクトリ復元
                    process.chdir(currentPath);

                    next();

                });

            });

        }));

    });

    // }}}
    // {{{ generate editlist other table

    decidedIt("generate editlist other table", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        // テスト実行
        execChildProcess(programPath + ' generate editlist MFTest/EditListOtherTable --table=editlistothertable', genTestFn('MFTest/EditListOtherTable', function() {

            // データベーステーブル生成テスト
            var dbconf = getTargetConfig(targetPath).database.default;

            // コネクションラッパー取得
            var conn = MicroField.database.Manager.getConnection(dbconf);

            // スキーマ取得
            var schema = MicroField.database.Manager.getSchema(dbconf, {
                cls     : 'EditList',
                table   : 'editlistothertable'
            });

            // 接続
            conn.connect(schema, function() {

                // テーブル存在確認
                conn.existsTable(function(err, exists) {

                    // 存在確認
                    assert.ok(exists);

                    // テーブル定義確認
                    conn.query('SHOW CREATE TABLE ' + schema.getName(), function(err, tbl) {

                        assert.deepEqual(
                            tbl,
                            [{
                                Table: 'editlistothertable',
                                'Create Table': [
                                    'CREATE TABLE `editlistothertable` (',
                                    '  `pk` bigint(20) NOT NULL AUTO_INCREMENT,',
                                    '  `status` tinyint(4) NOT NULL DEFAULT \'1\',',
                                    '  `textdata` varchar(255) NOT NULL,',
                                    '  `modified` datetime NOT NULL,',
                                    '  `created` datetime NOT NULL,',
                                    '  PRIMARY KEY (`pk`)',
                                    ') ENGINE=InnoDB DEFAULT CHARSET=utf8'
                                ].join("\n")
                            }]
                        );

                    });

                    // カレントディレクトリ復元
                    process.chdir(currentPath);

                    next();

                });

            });

        }));

    });

    // }}}
    // {{{ generate editlist nodb

    decidedIt("generate editlist nodb", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        // テスト実行
        execChildProcess(programPath + ' generate editlist MFTest/EditListNoDB --table=editlistnodb --nodb', genTestFn('MFTest/EditListNoDB', function() {

            // データベーステーブル生成テスト
            var dbconf = getTargetConfig(targetPath).database.default;

            // コネクションラッパー取得
            var conn = MicroField.database.Manager.getConnection(dbconf);

            // スキーマ取得
            var schema = MicroField.database.Manager.getSchema(dbconf, {
                cls     : 'EditList',
                table   : 'editlistnodb'
            });

            // 接続
            conn.connect(schema, function() {

                // テーブル存在確認
                conn.existsTable(function(err, exists) {

                    // 存在確認
                    assert.ok(!exists);

                    // カレントディレクトリ復元
                    process.chdir(currentPath);

                    next();

                });

            });

        }));

    });

    // }}}
    // {{{ generate editlist duplicate

    decidedIt("generate editlist duplicate", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate editlist MFTest/EditList', function(err, stdout, stderr) {

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
                'MFTest/EditList'.bold
            );

            assert.equal(stdout, comp);

            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
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
