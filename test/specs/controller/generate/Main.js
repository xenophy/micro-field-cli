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
        decidedIt   = ((!cfg || !cfg.releasesUrl || !cfg.accessToken) ? it.skip : it);

        // TODO: とりあえずテストから外すため、後で削除
//        decidedIt = it.skip;

        // TODO: オプション指定のテスト追加

    // {{{ setup for generate test

    /*
    decidedIt("setup for generate test", function(next) {
        setupAchive(rewriteBase, null, function(targetPath) {
            next();
        });
    });
   */


    // }}}
    // {{{ generate header

    decidedIt("generate header", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate header MFTest/Header', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // ファイル配置テスト
            CLI.iterate([
                'mods/MFTest/Header/module.json',
                'mods/MFTest/Header/app/view/main/Main.js',
                'mods/MFTest/Header/app/view/main/MainController.js',
                'mods/MFTest/Header/app/view/main/MainModel.js',
                'mods/MFTest/Header/locales/lang-en.json',
                'mods/MFTest/Header/locales/lang-ja.json',
                'mods/MFTest/Header/resources/images/Readme.md',
                'mods/MFTest/Header/sass/all.scss',
                'mods/MFTest/Header/sass/button.scss'
            ], function(filePath) {
                assert.ok(fs.existsSync(path.join(targetPath, filePath)));
            });

            // JSON生成テスト
            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/Header/module.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    controllers: [],
                    views: [
                        'main.Main',
                        'main.MainController',
                        'main.MainModel'
                    ],
                    stores: [],
                    styles: []
                }
            );

            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/Header/locales/lang-en.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.Header': {
                        Locale: 'Languages',
                        Logout: 'Logout',
                        MyPage: 'MyPage',
                        Title: 'MFTest.Header',
                        MessageBox: 'MessageBox',
                        'Changes saved successfully': 'Changes saved successfully.',
                        'Are you sure you want to do that?': 'Are you sure you want to do that?',
                        'Please enter your address': 'Please enter your address:',
                        locale: {
                            English: 'English',
                            Japanese: 'Japanase'
                        }
                    }
                }
            );

            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/Header/locales/lang-ja.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.Header': {
                        Locale: '言語',
                        Logout: 'ログアウト',
                        MyPage: 'マイページ',
                        Title: 'MFTest.Header',
                        MessageBox: 'メッセージボックス',
                        'Changes saved successfully': '変更の保存に成功しました。',
                        'Are you sure you want to do that?': '本当に、よろしいですか?',
                        'Please enter your address': '住所を入力してください。',
                        locale: {
                            English: '英語',
                            Japanese: '日本語'
                        }
                    }
                }
            );

            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

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

        execChildProcess(programPath + ' generate footer MFTest/Footer', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // ファイル配置テスト
            CLI.iterate([
                'mods/MFTest/Footer/module.json',
                'mods/MFTest/Footer/app/view/main/Main.js',
                'mods/MFTest/Footer/app/view/main/MainController.js',
                'mods/MFTest/Footer/app/view/main/MainModel.js',
                'mods/MFTest/Footer/locales/lang-en.json',
                'mods/MFTest/Footer/locales/lang-ja.json',
                'mods/MFTest/Footer/resources/images/Readme.md',
                'mods/MFTest/Footer/sass/all.scss'
            ], function(filePath) {
                assert.ok(fs.existsSync(path.join(targetPath, filePath)));
            });

            // JSON生成テスト
            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/Footer/module.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    controllers: [],
                    views: [
                        'main.Main',
                        'main.MainController',
                        'main.MainModel'
                    ],
                    stores: [],
                    styles: []
                }
            );

            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/Footer/locales/lang-en.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.Footer': {}
                }
            );

            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/Footer/locales/lang-ja.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.Footer': {}
                }
            );

            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

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

        execChildProcess(programPath + ' generate navigation MFTest/Navigation', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // ファイル配置テスト
            CLI.iterate([
                'mods/MFTest/Navigation/api.json',
                'mods/MFTest/Navigation/module.json',
                'mods/MFTest/Navigation/navigation.json',
                'mods/MFTest/Navigation/app/store/Tree.js',
                'mods/MFTest/Navigation/app/view/main/Main.js',
                'mods/MFTest/Navigation/app/view/main/MainController.js',
                'mods/MFTest/Navigation/app/view/main/MainModel.js',
                'mods/MFTest/Navigation/classes/Filter.php',
                'mods/MFTest/Navigation/classes/Tree.php',
                'mods/MFTest/Navigation/locales/lang-en.json',
                'mods/MFTest/Navigation/locales/lang-ja.json',
                'mods/MFTest/Navigation/resources/images/Readme.md',
                'mods/MFTest/Navigation/sass/all.scss',
                'mods/MFTest/Navigation/sass/tree.scss'
            ], function(filePath) {
                assert.ok(fs.existsSync(path.join(targetPath, filePath)));
            });

            // JSON生成テスト
            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/Navigation/api.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    MFTest_Navigation_Tree: {
                        before: {
                            User: 'isLogin',
                            MFTest_Navigation_Filter: 'doNothing'
                        },
                        methods: {
                            readData: { len: 1 }
                        }
                    }
                }
            );

            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/Navigation/module.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    controllers: [],
                    views: [
                        'main.Main',
                        'main.MainController',
                        'main.MainModel'
                    ],
                    stores: [
                        'Tree'
                    ],
                    styles: []
                }
            );

            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/Navigation/navigation.json')
                        ).toString()
                    ),
                    true
                ),
                [{
                    id: 'MFTest.Dashboard',
                    text: 'MFTest.Navigation:texts.Dashboard',
                    href: '#dashboard'
                }, {
                    id: 'MFTest.System',
                    text: 'MFTest.Navigation:categories.System',
                    expanded: true,
                    children: [{
                        id: 'MFTest.System.Account',
                        text: 'MFTest.Navigation:texts.Account',
                        href: '#account'
                    }, {
                        id: 'MFTest.System.MyPage',
                        text: 'MFTest.Navigation:texts.MyPage',
                        href: '#mypage'
                    }]
                }]
            );

            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/Navigation/locales/lang-en.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.Navigation': {
                        Title: 'Navigation',
                        categories: {
                            System: 'System'
                        },
                        texts: {
                            Dashboard: 'Dashboard',
                            Account: 'Account Manager',
                            MyPage: 'MyPage'
                        }
                    }
                }
            );

            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/Navigation/locales/lang-ja.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.Navigation': {
                        Title: 'ナビゲーション',
                        categories: {
                            System: 'システム'
                        },
                        texts: {
                            Dashboard: 'ダッシュボード',
                            Account: 'アカウント管理',
                            MyPage: 'マイページ'
                        }
                    }
                }
            );

            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

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

        execChildProcess(programPath + ' generate tabletnavigation MFTest/TabletNavigation', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // ファイル配置テスト
            CLI.iterate([
                'mods/MFTest/TabletNavigation/api.json',
                'mods/MFTest/TabletNavigation/module.json',
                'mods/MFTest/TabletNavigation/navigation.json',
                'mods/MFTest/TabletNavigation/app/view/main/Main.js',
                'mods/MFTest/TabletNavigation/app/view/main/MainController.js',
                'mods/MFTest/TabletNavigation/app/view/main/MainModel.js',
                'mods/MFTest/TabletNavigation/classes/Menu.php',
                'mods/MFTest/TabletNavigation/locales/lang-en.json',
                'mods/MFTest/TabletNavigation/locales/lang-ja.json',
                'mods/MFTest/TabletNavigation/resources/images/Readme.md',
                'mods/MFTest/TabletNavigation/sass/all.scss',
                'mods/MFTest/TabletNavigation/sass/button.scss'
            ], function(filePath) {
                assert.ok(fs.existsSync(path.join(targetPath, filePath)));
            });

            // JSON生成テスト
            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/TabletNavigation/api.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    MFTest_TabletNavigation_Menu: {
                        before: {
                            User: 'isLogin'
                        },
                        methods: {
                            readData: {
                                len: 0
                            }
                        }
                    }
                }
            );

            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/TabletNavigation/module.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    controllers: [],
                    views: [
                        'main.Main',
                        'main.MainController',
                        'main.MainModel'
                    ],
                    styles: []
                }
            );

            /*
            // TODO: テンプレート側の見直し(http:// の記述)
            //       MicroField SDK v1.5.1にて本体の修正、見直しが完了してから
            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/TabletNavigation/navigation.json')
                        ).toString()
                    ),
                    true
                ),
                [{
                    id: 'MFTest.Dashboard',
                    text: 'MFTest.Navigation:texts.Dashboard',
                    href: '#dashboard',
                    width: 150,
                    role: 0
                }, {
                    id: 'MFTest.Docs',
                    text: 'MFTest.TabletNavigation:texts.Docs',
                    href: 'http:\/\/xenophy.github.io\/MicroField\/',
                    width: 150,
                    role: 0
                }, {
                    id: 'MFTest.System',
                    text: 'MFTest.Navigation:categories.System',
                    width: 150,
                    role: 0,
                    children: [{
                        id: 'MFTest.System.Account',
                        text: 'MFTest.Navigation:texts.Account',
                        href: '#account',
                        role: 99
                    }, {
                        id: 'MFTest.System.MyPage',
                        text: 'MFTest.Navigation:texts.MyPage',
                        href: '#mypage',
                        role: 0
                    }]
                }]
            );
           */

            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/TabletNavigation/locales/lang-en.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.TabletNavigation': {
                        Title: 'TabletNavigation',
                        categories: {
                            System: 'System'
                        },
                        texts: {
                            Dashboard: 'Dashboard',
                            Docs: 'API Documentation',
                            Account: 'Account Manager',
                            MyPage: 'MyPage'
                        }
                    }
                }
            );

            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/TabletNavigation/locales/lang-ja.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.TabletNavigation': {
                        Title: 'TabletNavigation',
                        categories: {
                            System: 'システム'
                        },
                        texts: {
                            Dashboard: 'ダッシュボード',
                            Docs: 'API ドキュメント',
                            Account: 'アカウント管理',
                            MyPage: 'マイページ'
                        }
                    }
                }
            );

            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

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

        execChildProcess(programPath + ' generate base MFTest/Base', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // ファイル配置テスト
            CLI.iterate([
                'mods/MFTest/Base/module.json',
                'mods/MFTest/Base/app/view/main/Main.js',
                'mods/MFTest/Base/app/view/main/MainController.js',
                'mods/MFTest/Base/app/view/main/MainModel.js',
                'mods/MFTest/Base/locales/lang-en.json',
                'mods/MFTest/Base/locales/lang-ja.json',
                'mods/MFTest/Base/resources/images/Readme.md',
                'mods/MFTest/Base/sass/all.scss'
            ], function(filePath) {
                assert.ok(fs.existsSync(path.join(targetPath, filePath)));
            });

            // JSON生成テスト
            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/Base/module.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    screen: 'base',
                    xtype: 'mftest-base',
                    controllers: [],
                    views: [
                        'main.Main',
                        'main.MainController',
                        'main.MainModel'
                    ],
                    stores: [],
                    styles: []
                }
            );

            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/Base/locales/lang-en.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.Base': {
                        Html: 'This is simple screen example.',
                        Title: 'MFTest.Base'
                    }
                }
            );

            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/Base/locales/lang-ja.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.Base': {
                        Html: 'シンプルなスクリーンの例です。',
                        Title: 'MFTest.Base'
                    }
                }
            );

            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

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

        execChildProcess(programPath + ' generate edit MFTest/Edit', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // Editテンプレート生成テスト


            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

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

        execChildProcess(programPath + ' generate editlist MFTest/EditList', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // EditListテンプレート生成テスト



            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

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
