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
                'mods/MFTest/Header/app',
                'mods/MFTest/Header/app/view',
                'mods/MFTest/Header/app/view/main',
                'mods/MFTest/Header/app/view/main/Main.js',
                'mods/MFTest/Header/app/view/main/MainController.js',
                'mods/MFTest/Header/app/view/main/MainModel.js',
                'mods/MFTest/Header/locales',
                'mods/MFTest/Header/locales/lang-en.json',
                'mods/MFTest/Header/locales/lang-ja.json',
                'mods/MFTest/Header/module.json',
                'mods/MFTest/Header/resources',
                'mods/MFTest/Header/resources/images',
                'mods/MFTest/Header/resources/images/Readme.md',
                'mods/MFTest/Header/sass',
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
                'mods/MFTest/Footer/app',
                'mods/MFTest/Footer/app/view',
                'mods/MFTest/Footer/app/view/main',
                'mods/MFTest/Footer/app/view/main/Main.js',
                'mods/MFTest/Footer/app/view/main/MainController.js',
                'mods/MFTest/Footer/app/view/main/MainModel.js',
                'mods/MFTest/Footer/locales',
                'mods/MFTest/Footer/locales/lang-en.json',
                'mods/MFTest/Footer/locales/lang-ja.json',
                'mods/MFTest/Footer/module.json',
                'mods/MFTest/Footer/resources',
                'mods/MFTest/Footer/resources/images',
                'mods/MFTest/Footer/resources/images/Readme.md',
                'mods/MFTest/Footer/sass',
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
                'mods/MFTest/Navigation/app',
                'mods/MFTest/Navigation/app/store',
                'mods/MFTest/Navigation/app/store/Tree.js',
                'mods/MFTest/Navigation/app/view',
                'mods/MFTest/Navigation/app/view/main',
                'mods/MFTest/Navigation/app/view/main/Main.js',
                'mods/MFTest/Navigation/app/view/main/MainController.js',
                'mods/MFTest/Navigation/app/view/main/MainModel.js',
                'mods/MFTest/Navigation/classes',
                'mods/MFTest/Navigation/classes/Filter.php',
                'mods/MFTest/Navigation/classes/Tree.php',
                'mods/MFTest/Navigation/locales',
                'mods/MFTest/Navigation/locales/lang-en.json',
                'mods/MFTest/Navigation/locales/lang-ja.json',
                'mods/MFTest/Navigation/module.json',
                'mods/MFTest/Navigation/navigation.json',
                'mods/MFTest/Navigation/resources',
                'mods/MFTest/Navigation/resources/images',
                'mods/MFTest/Navigation/resources/images/Readme.md',
                'mods/MFTest/Navigation/sass',
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
                'mods/MFTest/TabletNavigation/app',
                'mods/MFTest/TabletNavigation/app/view',
                'mods/MFTest/TabletNavigation/app/view/main',
                'mods/MFTest/TabletNavigation/app/view/main/Main.js',
                'mods/MFTest/TabletNavigation/app/view/main/MainController.js',
                'mods/MFTest/TabletNavigation/app/view/main/MainModel.js',
                'mods/MFTest/TabletNavigation/classes',
                'mods/MFTest/TabletNavigation/classes/Menu.php',
                'mods/MFTest/TabletNavigation/locales',
                'mods/MFTest/TabletNavigation/locales/lang-en.json',
                'mods/MFTest/TabletNavigation/locales/lang-ja.json',
                'mods/MFTest/TabletNavigation/module.json',
                'mods/MFTest/TabletNavigation/navigation.json',
                'mods/MFTest/TabletNavigation/resources',
                'mods/MFTest/TabletNavigation/resources/images',
                'mods/MFTest/TabletNavigation/resources/images/Readme.md',
                'mods/MFTest/TabletNavigation/sass',
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
                'mods/MFTest/Base/app',
                'mods/MFTest/Base/app/view',
                'mods/MFTest/Base/app/view/main',
                'mods/MFTest/Base/app/view/main/Main.js',
                'mods/MFTest/Base/app/view/main/MainController.js',
                'mods/MFTest/Base/app/view/main/MainModel.js',
                'mods/MFTest/Base/locales',
                'mods/MFTest/Base/locales/lang-en.json',
                'mods/MFTest/Base/locales/lang-ja.json',
                'mods/MFTest/Base/module.json',
                'mods/MFTest/Base/resources',
                'mods/MFTest/Base/resources/images',
                'mods/MFTest/Base/resources/images/Readme.md',
                'mods/MFTest/Base/sass',
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

            // ファイル配置テスト
            CLI.iterate([
                'mods/MFTest/Edit/api.json',
                'mods/MFTest/Edit/app',
                'mods/MFTest/Edit/app/view',
                'mods/MFTest/Edit/app/view/edit',
                'mods/MFTest/Edit/app/view/edit/Edit.js',
                'mods/MFTest/Edit/app/view/edit/EditController.js',
                'mods/MFTest/Edit/app/view/edit/EditModel.js',
                'mods/MFTest/Edit/app/view/main',
                'mods/MFTest/Edit/app/view/main/Main.js',
                'mods/MFTest/Edit/app/view/main/MainController.js',
                'mods/MFTest/Edit/app/view/main/MainModel.js',
                'mods/MFTest/Edit/classes',
                'mods/MFTest/Edit/classes/Tests.php',
                'mods/MFTest/Edit/classes/Users.php',
                'mods/MFTest/Edit/data.txt',
                'mods/MFTest/Edit/locales',
                'mods/MFTest/Edit/locales/lang-en.json',
                'mods/MFTest/Edit/locales/lang-ja.json',
                'mods/MFTest/Edit/module.json',
                'mods/MFTest/Edit/resources',
                'mods/MFTest/Edit/resources/images',
                'mods/MFTest/Edit/resources/images/Readme.md',
                'mods/MFTest/Edit/sass',
                'mods/MFTest/Edit/sass/all.scss',
                'mods/MFTest/Edit/tests',
                'mods/MFTest/Edit/tests/Operation',
                'mods/MFTest/Edit/tests/Operation/ResetButton.js',
                'mods/MFTest/Edit/tests/Operation/SaveButton.js',
                'mods/MFTest/Edit/tests/Status',
                'mods/MFTest/Edit/tests/Status/ResetButton.js',
                'mods/MFTest/Edit/tests/Status/SaveButton.js'
            ], function(filePath) {
                assert.ok(fs.existsSync(path.join(targetPath, filePath)));
            });

            // JSON生成テスト
            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/Edit/api.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    MFTest_Edit_Users: {
                        before: {
                            User: 'isLogin'
                        },
                        methods: {
                            readData: {
                                len: 0
                            },
                            updateData: {
                                formHandler: true,
                                len: 1
                            }
                        }
                    },
                    MFTest_Edit_Tests: {
                        before: {
                            User: 'isLogin'
                        },
                        methods: {
                            testSetUp: {
                                len: 0
                            },
                            testTearDown: {
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
                            path.join(targetPath, 'mods/MFTest/Edit/locales/lang-en.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.Edit': {
                        Title: 'MFTest.Edit',
                        'Please enter textdata': 'Please enter textdata.',
                        field: {
                            Text: 'Text'
                        }
                    }
                }
            );

            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/Edit/locales/lang-ja.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.Edit': {
                        Title: 'MFTest.Edit',
                        'Please enter textdata': 'テキストを入力してください。',
                        field: {
                            Text: 'テキスト'
                        }
                    }
                }
            );

            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/Edit/module.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    screen: 'edit',
                    xtype: 'mftest-edit',
                    controllers: [],
                    views: [
                        'main.Main',
                        'main.MainController',
                        'main.MainModel'
                    ],
                    stores: [],
                    styles: [],
                    test: {
                        fieldName: 'textdatatextfield',
                        columnName: 'textdata',
                        dummyText: 'dummy text',
                        modifiedText: 'modified text'
                    }
                }
            );

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

            // ファイル配置テスト
            CLI.iterate([
                'mods/MFTest/EditList/api.json',
                'mods/MFTest/EditList/app',
                'mods/MFTest/EditList/app/controller',
                'mods/MFTest/EditList/app/controller/Main.js',
                'mods/MFTest/EditList/app/model',
                'mods/MFTest/EditList/app/model/List.js',
                'mods/MFTest/EditList/app/store',
                'mods/MFTest/EditList/app/store/Lists.js',
                'mods/MFTest/EditList/app/view',
                'mods/MFTest/EditList/app/view/edit',
                'mods/MFTest/EditList/app/view/edit/Edit.js',
                'mods/MFTest/EditList/app/view/edit/EditController.js',
                'mods/MFTest/EditList/app/view/edit/EditModel.js',
                'mods/MFTest/EditList/app/view/list',
                'mods/MFTest/EditList/app/view/list/List.js',
                'mods/MFTest/EditList/app/view/list/ListController.js',
                'mods/MFTest/EditList/app/view/list/ListModel.js',
                'mods/MFTest/EditList/app/view/main',
                'mods/MFTest/EditList/app/view/main/Main.js',
                'mods/MFTest/EditList/app/view/main/MainController.js',
                'mods/MFTest/EditList/app/view/main/MainModel.js',
                'mods/MFTest/EditList/classes',
                'mods/MFTest/EditList/classes/Lists.php',
                'mods/MFTest/EditList/classes/Tests.php',
                'mods/MFTest/EditList/locales',
                'mods/MFTest/EditList/locales/lang-en.json',
                'mods/MFTest/EditList/locales/lang-ja.json',
                'mods/MFTest/EditList/module.json',
                'mods/MFTest/EditList/resources',
                'mods/MFTest/EditList/resources/images',
                'mods/MFTest/EditList/resources/images/Readme.md',
                'mods/MFTest/EditList/sass',
                'mods/MFTest/EditList/sass/all.scss',
                'mods/MFTest/EditList/tests',
                'mods/MFTest/EditList/tests/data.txt',
                'mods/MFTest/EditList/tests/Edit Screen',
                'mods/MFTest/EditList/tests/Edit Screen/Operation',
                'mods/MFTest/EditList/tests/Edit Screen/Operation/CancelButton.js',
                'mods/MFTest/EditList/tests/Edit Screen/Operation/Confirm Cancel Message',
                'mods/MFTest/EditList/tests/Edit Screen/Operation/Confirm Cancel Message/NoButton.js',
                'mods/MFTest/EditList/tests/Edit Screen/Operation/Confirm Cancel Message/YesButton.js',
                'mods/MFTest/EditList/tests/Edit Screen/Operation/Confirm Remove Message',
                'mods/MFTest/EditList/tests/Edit Screen/Operation/Confirm Remove Message/NoButton.js',
                'mods/MFTest/EditList/tests/Edit Screen/Operation/Confirm Remove Message/YesButton.js',
                'mods/MFTest/EditList/tests/Edit Screen/Operation/RemoveButton.js',
                'mods/MFTest/EditList/tests/Edit Screen/Operation/ResetButton.js',
                'mods/MFTest/EditList/tests/Edit Screen/Operation/SaveButton.js',
                'mods/MFTest/EditList/tests/Edit Screen/Status',
                'mods/MFTest/EditList/tests/Edit Screen/Status/CancelButton.js',
                'mods/MFTest/EditList/tests/Edit Screen/Status/RemoveButton.js',
                'mods/MFTest/EditList/tests/Edit Screen/Status/ResetButton.js',
                'mods/MFTest/EditList/tests/Edit Screen/Status/SaveButton.js',
                'mods/MFTest/EditList/tests/List Screen',
                'mods/MFTest/EditList/tests/List Screen/Operation',
                'mods/MFTest/EditList/tests/List Screen/Operation/EditButton.js',
                'mods/MFTest/EditList/tests/List Screen/Operation/NewButton.js',
                'mods/MFTest/EditList/tests/List Screen/Operation/Paging Toolbar',
                'mods/MFTest/EditList/tests/List Screen/Operation/Paging Toolbar/FirstButton.js',
                'mods/MFTest/EditList/tests/List Screen/Operation/Paging Toolbar/LastButton.js',
                'mods/MFTest/EditList/tests/List Screen/Operation/Paging Toolbar/NextButton.js',
                'mods/MFTest/EditList/tests/List Screen/Operation/Paging Toolbar/NumberField.js',
                'mods/MFTest/EditList/tests/List Screen/Operation/Paging Toolbar/PrevButton.js',
                'mods/MFTest/EditList/tests/List Screen/Operation/Paging Toolbar/RefreshButton.js',
                'mods/MFTest/EditList/tests/List Screen/Operation/RefreshButton.js',
                'mods/MFTest/EditList/tests/List Screen/Operation/RemoveButton.js',
                'mods/MFTest/EditList/tests/List Screen/Operation/Search Field',
                'mods/MFTest/EditList/tests/List Screen/Operation/Search Field/Edit.js',
                'mods/MFTest/EditList/tests/List Screen/Operation/Search Field/Paging.js',
                'mods/MFTest/EditList/tests/List Screen/Operation/Search Field/Remove.js',
                'mods/MFTest/EditList/tests/List Screen/Operation/Search Field/Search.js',
                'mods/MFTest/EditList/tests/List Screen/Status',
                'mods/MFTest/EditList/tests/List Screen/Status/EditButton.js',
                'mods/MFTest/EditList/tests/List Screen/Status/NewButton.js',
                'mods/MFTest/EditList/tests/List Screen/Status/Paging Toolbar',
                'mods/MFTest/EditList/tests/List Screen/Status/Paging Toolbar/FirstButton.js',
                'mods/MFTest/EditList/tests/List Screen/Status/Paging Toolbar/LastButton.js',
                'mods/MFTest/EditList/tests/List Screen/Status/Paging Toolbar/NextButton.js',
                'mods/MFTest/EditList/tests/List Screen/Status/Paging Toolbar/PrevButton.js',
                'mods/MFTest/EditList/tests/List Screen/Status/Paging Toolbar/RefreshButton.js',
                'mods/MFTest/EditList/tests/List Screen/Status/RefreshButton.js',
                'mods/MFTest/EditList/tests/List Screen/Status/RemoveButton.js',
                'mods/MFTest/EditList/tests/New Screen',
                'mods/MFTest/EditList/tests/New Screen/Operation',
                'mods/MFTest/EditList/tests/New Screen/Operation/CancelButton.js',
                'mods/MFTest/EditList/tests/New Screen/Operation/Confirm Cancel Message',
                'mods/MFTest/EditList/tests/New Screen/Operation/Confirm Cancel Message/NoButton.js',
                'mods/MFTest/EditList/tests/New Screen/Operation/Confirm Cancel Message/YesButton.js',
                'mods/MFTest/EditList/tests/New Screen/Operation/RemoveButton.js',
                'mods/MFTest/EditList/tests/New Screen/Operation/ResetButton.js',
                'mods/MFTest/EditList/tests/New Screen/Operation/SaveButton.js',
                'mods/MFTest/EditList/tests/New Screen/Status',
                'mods/MFTest/EditList/tests/New Screen/Status/CancelButton.js',
                'mods/MFTest/EditList/tests/New Screen/Status/RemoveButton.js',
                'mods/MFTest/EditList/tests/New Screen/Status/ResetButton.js',
                'mods/MFTest/EditList/tests/New Screen/Status/SaveButton.js'
            ], function(filePath) {
                assert.ok(fs.existsSync(path.join(targetPath, filePath)));
            });

            // JSON生成テスト
            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/EditList/api.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    MFTest_EditList_Lists: {
                        tests: {
                            getRoles: 'MFTest_EditList_Tests.getRoles',
                            getGrid: 'MFTest_EditList_Tests.getGrid',
                            readData: 'MFTest_EditList_Tests.readData',
                            updateData: 'MFTest_EditList_Tests.updateData',
                            removeData: 'MFTest_EditList_Tests.removeData' },
                            before: {
                                User: 'isLogin'
                            },
                            methods: {
                                getRoles: {
                                    len: 0
                                },
                                getGrid: {
                                    len: 1
                                },
                                readData: {
                                    len: 1
                                },
                                updateData: {
                                    formHandler: true,
                                    len: 1
                                },
                                removeData: {
                                    len: 1
                                }
                            }
                    },
                    MFTest_EditList_Tests: {
                        before: {
                            User: 'isLogin'
                        },
                        methods: {
                            testSetUp: {
                                len: 0
                            },
                            testTearDown: {
                                len: 0
                            },
                            insertTestData: {
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
                            path.join(targetPath, 'mods/MFTest/EditList/locales/lang-en.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.EditList': {
                        'Please enter textdata': 'Please enter textdata.',
                        Title: 'MFTest.EditList',
                        column: {
                            Textdata: 'Textdata'
                        },
                        field: {
                            Textdata: 'Textdata'
                        }
                    }
                }
            );

            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/EditList/locales/lang-ja.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.EditList': {
                        'Please enter textdata': 'テキストを入力してください。',
                        Title: 'MFTest.EditList',
                        column: {
                            Textdata: 'テキスト'
                        },
                        field: {
                            Textdata: 'テキスト'
                        }
                    }
                }
            );

            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/EditList/module.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    screen: 'editlist',
                    xtype: 'mftest-editlist',
                    controllers: [
                        'Main'
                    ],
                    views: [
                        'main.Main',
                        'main.MainController',
                        'main.MainModel'
                    ],
                    stores: [
                        'Lists'
                    ],
                    styles: [],
                    test: {
                        fieldName: 'textdatatextfield',
                        columnName: 'textdata',
                        dummyText: 'dummy text',
                        modifiedText: 'modified text'
                    }
                }
            );

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
