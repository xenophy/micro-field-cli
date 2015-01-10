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
        //decidedIt = it.skip;

    // {{{ setup for generate test

    decidedIt("setup for generate test", function(next) {
        execChildProcess('cat ' + currentPath + '/test/clear.sql|mysql -uroot', function(err, stdout, stderr) {
            setupAchive(rewriteBase, null, function(targetPath) {
                next();
            });
        });
    });

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
    // {{{ generate base other name

    decidedIt("generate base other name", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate base MFTest/BaseOtherName', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // ファイル配置テスト
            CLI.iterate([
                'mods/MFTest/BaseOtherName/app',
                'mods/MFTest/BaseOtherName/app/view',
                'mods/MFTest/BaseOtherName/app/view/main',
                'mods/MFTest/BaseOtherName/app/view/main/Main.js',
                'mods/MFTest/BaseOtherName/app/view/main/MainController.js',
                'mods/MFTest/BaseOtherName/app/view/main/MainModel.js',
                'mods/MFTest/BaseOtherName/locales',
                'mods/MFTest/BaseOtherName/locales/lang-en.json',
                'mods/MFTest/BaseOtherName/locales/lang-ja.json',
                'mods/MFTest/BaseOtherName/module.json',
                'mods/MFTest/BaseOtherName/resources',
                'mods/MFTest/BaseOtherName/resources/images',
                'mods/MFTest/BaseOtherName/resources/images/Readme.md',
                'mods/MFTest/BaseOtherName/sass',
                'mods/MFTest/BaseOtherName/sass/all.scss'
            ], function(filePath) {
                assert.ok(fs.existsSync(path.join(targetPath, filePath)));
            });

            // JSON生成テスト
            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/BaseOtherName/module.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    screen: 'baseothername',
                    xtype: 'mftest-baseothername',
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
                            path.join(targetPath, 'mods/MFTest/BaseOtherName/locales/lang-en.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.BaseOtherName': {
                        Html: 'This is simple screen example.',
                        Title: 'MFTest.BaseOtherName'
                    }
                }
            );

            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/BaseOtherName/locales/lang-ja.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.BaseOtherName': {
                        Html: 'シンプルなスクリーンの例です。',
                        Title: 'MFTest.BaseOtherName'
                    }
                }
            );

            // カレントディレクトリ復元
            process.chdir(currentPath);

            next();
        });

    });

    // }}}
    // {{{ generate base other screen name

    decidedIt("generate base other screen name", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate base MFTest/BaseOtherScreenName --name=basesetothername', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // ファイル配置テスト
            CLI.iterate([
                'mods/MFTest/BaseOtherScreenName/app',
                'mods/MFTest/BaseOtherScreenName/app/view',
                'mods/MFTest/BaseOtherScreenName/app/view/main',
                'mods/MFTest/BaseOtherScreenName/app/view/main/Main.js',
                'mods/MFTest/BaseOtherScreenName/app/view/main/MainController.js',
                'mods/MFTest/BaseOtherScreenName/app/view/main/MainModel.js',
                'mods/MFTest/BaseOtherScreenName/locales',
                'mods/MFTest/BaseOtherScreenName/locales/lang-en.json',
                'mods/MFTest/BaseOtherScreenName/locales/lang-ja.json',
                'mods/MFTest/BaseOtherScreenName/module.json',
                'mods/MFTest/BaseOtherScreenName/resources',
                'mods/MFTest/BaseOtherScreenName/resources/images',
                'mods/MFTest/BaseOtherScreenName/resources/images/Readme.md',
                'mods/MFTest/BaseOtherScreenName/sass',
                'mods/MFTest/BaseOtherScreenName/sass/all.scss'
            ], function(filePath) {
                assert.ok(fs.existsSync(path.join(targetPath, filePath)));
            });

            // JSON生成テスト
            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/BaseOtherScreenName/module.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    screen: 'basesetothername',
                    xtype: 'mftest-baseotherscreenname',
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
                            path.join(targetPath, 'mods/MFTest/BaseOtherScreenName/locales/lang-en.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.BaseOtherScreenName': {
                        Html: 'This is simple screen example.',
                        Title: 'MFTest.BaseOtherScreenName'
                    }
                }
            );

            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/BaseOtherScreenName/locales/lang-ja.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.BaseOtherScreenName': {
                        Html: 'シンプルなスクリーンの例です。',
                        Title: 'MFTest.BaseOtherScreenName'
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

        });

    });

    // }}}
    // {{{ generate edit other name

    decidedIt("generate edit other name", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate edit MFTest/EditOtherName', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // ファイル配置テスト
            CLI.iterate([
                'mods/MFTest/EditOtherName/api.json',
                'mods/MFTest/EditOtherName/app',
                'mods/MFTest/EditOtherName/app/view',
                'mods/MFTest/EditOtherName/app/view/edit',
                'mods/MFTest/EditOtherName/app/view/edit/Edit.js',
                'mods/MFTest/EditOtherName/app/view/edit/EditController.js',
                'mods/MFTest/EditOtherName/app/view/edit/EditModel.js',
                'mods/MFTest/EditOtherName/app/view/main',
                'mods/MFTest/EditOtherName/app/view/main/Main.js',
                'mods/MFTest/EditOtherName/app/view/main/MainController.js',
                'mods/MFTest/EditOtherName/app/view/main/MainModel.js',
                'mods/MFTest/EditOtherName/classes',
                'mods/MFTest/EditOtherName/classes/Tests.php',
                'mods/MFTest/EditOtherName/classes/Users.php',
                'mods/MFTest/EditOtherName/data.txt',
                'mods/MFTest/EditOtherName/locales',
                'mods/MFTest/EditOtherName/locales/lang-en.json',
                'mods/MFTest/EditOtherName/locales/lang-ja.json',
                'mods/MFTest/EditOtherName/module.json',
                'mods/MFTest/EditOtherName/resources',
                'mods/MFTest/EditOtherName/resources/images',
                'mods/MFTest/EditOtherName/resources/images/Readme.md',
                'mods/MFTest/EditOtherName/sass',
                'mods/MFTest/EditOtherName/sass/all.scss',
                'mods/MFTest/EditOtherName/tests',
                'mods/MFTest/EditOtherName/tests/Operation',
                'mods/MFTest/EditOtherName/tests/Operation/ResetButton.js',
                'mods/MFTest/EditOtherName/tests/Operation/SaveButton.js',
                'mods/MFTest/EditOtherName/tests/Status',
                'mods/MFTest/EditOtherName/tests/Status/ResetButton.js',
                'mods/MFTest/EditOtherName/tests/Status/SaveButton.js'
            ], function(filePath) {
                assert.ok(fs.existsSync(path.join(targetPath, filePath)));
            });

            // JSON生成テスト
            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/EditOtherName/api.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    MFTest_EditOtherName_Users: {
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
                    MFTest_EditOtherName_Tests: {
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
                            path.join(targetPath, 'mods/MFTest/EditOtherName/locales/lang-en.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.EditOtherName': {
                        Title: 'MFTest.EditOtherName',
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
                            path.join(targetPath, 'mods/MFTest/EditOtherName/locales/lang-ja.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.EditOtherName': {
                        Title: 'MFTest.EditOtherName',
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
                            path.join(targetPath, 'mods/MFTest/EditOtherName/module.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    screen: 'editothername',
                    xtype: 'mftest-editothername',
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

        });

    });

    // }}}
    // {{{ generate edit other screen name

    decidedIt("generate edit other screen name", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate edit MFTest/EditOtherScreenName --name=editsetothername', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // ファイル配置テスト
            CLI.iterate([
                'mods/MFTest/EditOtherScreenName/api.json',
                'mods/MFTest/EditOtherScreenName/app',
                'mods/MFTest/EditOtherScreenName/app/view',
                'mods/MFTest/EditOtherScreenName/app/view/edit',
                'mods/MFTest/EditOtherScreenName/app/view/edit/Edit.js',
                'mods/MFTest/EditOtherScreenName/app/view/edit/EditController.js',
                'mods/MFTest/EditOtherScreenName/app/view/edit/EditModel.js',
                'mods/MFTest/EditOtherScreenName/app/view/main',
                'mods/MFTest/EditOtherScreenName/app/view/main/Main.js',
                'mods/MFTest/EditOtherScreenName/app/view/main/MainController.js',
                'mods/MFTest/EditOtherScreenName/app/view/main/MainModel.js',
                'mods/MFTest/EditOtherScreenName/classes',
                'mods/MFTest/EditOtherScreenName/classes/Tests.php',
                'mods/MFTest/EditOtherScreenName/classes/Users.php',
                'mods/MFTest/EditOtherScreenName/data.txt',
                'mods/MFTest/EditOtherScreenName/locales',
                'mods/MFTest/EditOtherScreenName/locales/lang-en.json',
                'mods/MFTest/EditOtherScreenName/locales/lang-ja.json',
                'mods/MFTest/EditOtherScreenName/module.json',
                'mods/MFTest/EditOtherScreenName/resources',
                'mods/MFTest/EditOtherScreenName/resources/images',
                'mods/MFTest/EditOtherScreenName/resources/images/Readme.md',
                'mods/MFTest/EditOtherScreenName/sass',
                'mods/MFTest/EditOtherScreenName/sass/all.scss',
                'mods/MFTest/EditOtherScreenName/tests',
                'mods/MFTest/EditOtherScreenName/tests/Operation',
                'mods/MFTest/EditOtherScreenName/tests/Operation/ResetButton.js',
                'mods/MFTest/EditOtherScreenName/tests/Operation/SaveButton.js',
                'mods/MFTest/EditOtherScreenName/tests/Status',
                'mods/MFTest/EditOtherScreenName/tests/Status/ResetButton.js',
                'mods/MFTest/EditOtherScreenName/tests/Status/SaveButton.js'
            ], function(filePath) {
                assert.ok(fs.existsSync(path.join(targetPath, filePath)));
            });

            // JSON生成テスト
            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/EditOtherScreenName/api.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    MFTest_EditOtherScreenName_Users: {
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
                    MFTest_EditOtherScreenName_Tests: {
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
                            path.join(targetPath, 'mods/MFTest/EditOtherScreenName/locales/lang-en.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.EditOtherScreenName': {
                        Title: 'MFTest.EditOtherScreenName',
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
                            path.join(targetPath, 'mods/MFTest/EditOtherScreenName/locales/lang-ja.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.EditOtherScreenName': {
                        Title: 'MFTest.EditOtherScreenName',
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
                            path.join(targetPath, 'mods/MFTest/EditOtherScreenName/module.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    screen: 'editsetothername',
                    xtype: 'mftest-editotherscreenname',
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

        });

    });

    // }}}
    // {{{ generate edit other table

    decidedIt("generate edit other table", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate edit MFTest/EditOtherTable --table=editothertable', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // ファイル配置テスト
            CLI.iterate([
                'mods/MFTest/EditOtherTable/api.json',
                'mods/MFTest/EditOtherTable/app',
                'mods/MFTest/EditOtherTable/app/view',
                'mods/MFTest/EditOtherTable/app/view/edit',
                'mods/MFTest/EditOtherTable/app/view/edit/Edit.js',
                'mods/MFTest/EditOtherTable/app/view/edit/EditController.js',
                'mods/MFTest/EditOtherTable/app/view/edit/EditModel.js',
                'mods/MFTest/EditOtherTable/app/view/main',
                'mods/MFTest/EditOtherTable/app/view/main/Main.js',
                'mods/MFTest/EditOtherTable/app/view/main/MainController.js',
                'mods/MFTest/EditOtherTable/app/view/main/MainModel.js',
                'mods/MFTest/EditOtherTable/classes',
                'mods/MFTest/EditOtherTable/classes/Tests.php',
                'mods/MFTest/EditOtherTable/classes/Users.php',
                'mods/MFTest/EditOtherTable/data.txt',
                'mods/MFTest/EditOtherTable/locales',
                'mods/MFTest/EditOtherTable/locales/lang-en.json',
                'mods/MFTest/EditOtherTable/locales/lang-ja.json',
                'mods/MFTest/EditOtherTable/module.json',
                'mods/MFTest/EditOtherTable/resources',
                'mods/MFTest/EditOtherTable/resources/images',
                'mods/MFTest/EditOtherTable/resources/images/Readme.md',
                'mods/MFTest/EditOtherTable/sass',
                'mods/MFTest/EditOtherTable/sass/all.scss',
                'mods/MFTest/EditOtherTable/tests',
                'mods/MFTest/EditOtherTable/tests/Operation',
                'mods/MFTest/EditOtherTable/tests/Operation/ResetButton.js',
                'mods/MFTest/EditOtherTable/tests/Operation/SaveButton.js',
                'mods/MFTest/EditOtherTable/tests/Status',
                'mods/MFTest/EditOtherTable/tests/Status/ResetButton.js',
                'mods/MFTest/EditOtherTable/tests/Status/SaveButton.js'
            ], function(filePath) {
                assert.ok(fs.existsSync(path.join(targetPath, filePath)));
            });

            // JSON生成テスト
            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/EditOtherTable/api.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    MFTest_EditOtherTable_Users: {
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
                    MFTest_EditOtherTable_Tests: {
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
                            path.join(targetPath, 'mods/MFTest/EditOtherTable/locales/lang-en.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.EditOtherTable': {
                        Title: 'MFTest.EditOtherTable',
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
                            path.join(targetPath, 'mods/MFTest/EditOtherTable/locales/lang-ja.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.EditOtherTable': {
                        Title: 'MFTest.EditOtherTable',
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
                            path.join(targetPath, 'mods/MFTest/EditOtherTable/module.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    screen: 'editothertable',
                    xtype: 'mftest-editothertable',
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

        });

    });

    // }}}
    // {{{ generate edit nodb

    decidedIt("generate edit nodb", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate edit MFTest/EditNoDB --table=editnodb --nodb', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // ファイル配置テスト
            CLI.iterate([
                'mods/MFTest/EditNoDB/api.json',
                'mods/MFTest/EditNoDB/app',
                'mods/MFTest/EditNoDB/app/view',
                'mods/MFTest/EditNoDB/app/view/edit',
                'mods/MFTest/EditNoDB/app/view/edit/Edit.js',
                'mods/MFTest/EditNoDB/app/view/edit/EditController.js',
                'mods/MFTest/EditNoDB/app/view/edit/EditModel.js',
                'mods/MFTest/EditNoDB/app/view/main',
                'mods/MFTest/EditNoDB/app/view/main/Main.js',
                'mods/MFTest/EditNoDB/app/view/main/MainController.js',
                'mods/MFTest/EditNoDB/app/view/main/MainModel.js',
                'mods/MFTest/EditNoDB/classes',
                'mods/MFTest/EditNoDB/classes/Tests.php',
                'mods/MFTest/EditNoDB/classes/Users.php',
                'mods/MFTest/EditNoDB/data.txt',
                'mods/MFTest/EditNoDB/locales',
                'mods/MFTest/EditNoDB/locales/lang-en.json',
                'mods/MFTest/EditNoDB/locales/lang-ja.json',
                'mods/MFTest/EditNoDB/module.json',
                'mods/MFTest/EditNoDB/resources',
                'mods/MFTest/EditNoDB/resources/images',
                'mods/MFTest/EditNoDB/resources/images/Readme.md',
                'mods/MFTest/EditNoDB/sass',
                'mods/MFTest/EditNoDB/sass/all.scss',
                'mods/MFTest/EditNoDB/tests',
                'mods/MFTest/EditNoDB/tests/Operation',
                'mods/MFTest/EditNoDB/tests/Operation/ResetButton.js',
                'mods/MFTest/EditNoDB/tests/Operation/SaveButton.js',
                'mods/MFTest/EditNoDB/tests/Status',
                'mods/MFTest/EditNoDB/tests/Status/ResetButton.js',
                'mods/MFTest/EditNoDB/tests/Status/SaveButton.js'
            ], function(filePath) {
                assert.ok(fs.existsSync(path.join(targetPath, filePath)));
            });

            // JSON生成テスト
            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/EditNoDB/api.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    MFTest_EditNoDB_Users: {
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
                    MFTest_EditNoDB_Tests: {
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
                            path.join(targetPath, 'mods/MFTest/EditNoDB/locales/lang-en.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.EditNoDB': {
                        Title: 'MFTest.EditNoDB',
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
                            path.join(targetPath, 'mods/MFTest/EditNoDB/locales/lang-ja.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.EditNoDB': {
                        Title: 'MFTest.EditNoDB',
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
                            path.join(targetPath, 'mods/MFTest/EditNoDB/module.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    screen: 'editnodb',
                    xtype: 'mftest-editnodb',
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

        });

    });

    // }}}
    // {{{ generate editlist other name

    decidedIt("generate editlist other name", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate editlist MFTest/EditListOtherName', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // ファイル配置テスト
            CLI.iterate([
                'mods/MFTest/EditListOtherName/api.json',
                'mods/MFTest/EditListOtherName/app',
                'mods/MFTest/EditListOtherName/app/controller',
                'mods/MFTest/EditListOtherName/app/controller/Main.js',
                'mods/MFTest/EditListOtherName/app/model',
                'mods/MFTest/EditListOtherName/app/model/List.js',
                'mods/MFTest/EditListOtherName/app/store',
                'mods/MFTest/EditListOtherName/app/store/Lists.js',
                'mods/MFTest/EditListOtherName/app/view',
                'mods/MFTest/EditListOtherName/app/view/edit',
                'mods/MFTest/EditListOtherName/app/view/edit/Edit.js',
                'mods/MFTest/EditListOtherName/app/view/edit/EditController.js',
                'mods/MFTest/EditListOtherName/app/view/edit/EditModel.js',
                'mods/MFTest/EditListOtherName/app/view/list',
                'mods/MFTest/EditListOtherName/app/view/list/List.js',
                'mods/MFTest/EditListOtherName/app/view/list/ListController.js',
                'mods/MFTest/EditListOtherName/app/view/list/ListModel.js',
                'mods/MFTest/EditListOtherName/app/view/main',
                'mods/MFTest/EditListOtherName/app/view/main/Main.js',
                'mods/MFTest/EditListOtherName/app/view/main/MainController.js',
                'mods/MFTest/EditListOtherName/app/view/main/MainModel.js',
                'mods/MFTest/EditListOtherName/classes',
                'mods/MFTest/EditListOtherName/classes/Lists.php',
                'mods/MFTest/EditListOtherName/classes/Tests.php',
                'mods/MFTest/EditListOtherName/locales',
                'mods/MFTest/EditListOtherName/locales/lang-en.json',
                'mods/MFTest/EditListOtherName/locales/lang-ja.json',
                'mods/MFTest/EditListOtherName/module.json',
                'mods/MFTest/EditListOtherName/resources',
                'mods/MFTest/EditListOtherName/resources/images',
                'mods/MFTest/EditListOtherName/resources/images/Readme.md',
                'mods/MFTest/EditListOtherName/sass',
                'mods/MFTest/EditListOtherName/sass/all.scss',
                'mods/MFTest/EditListOtherName/tests',
                'mods/MFTest/EditListOtherName/tests/data.txt',
                'mods/MFTest/EditListOtherName/tests/Edit Screen',
                'mods/MFTest/EditListOtherName/tests/Edit Screen/Operation',
                'mods/MFTest/EditListOtherName/tests/Edit Screen/Operation/CancelButton.js',
                'mods/MFTest/EditListOtherName/tests/Edit Screen/Operation/Confirm Cancel Message',
                'mods/MFTest/EditListOtherName/tests/Edit Screen/Operation/Confirm Cancel Message/NoButton.js',
                'mods/MFTest/EditListOtherName/tests/Edit Screen/Operation/Confirm Cancel Message/YesButton.js',
                'mods/MFTest/EditListOtherName/tests/Edit Screen/Operation/Confirm Remove Message',
                'mods/MFTest/EditListOtherName/tests/Edit Screen/Operation/Confirm Remove Message/NoButton.js',
                'mods/MFTest/EditListOtherName/tests/Edit Screen/Operation/Confirm Remove Message/YesButton.js',
                'mods/MFTest/EditListOtherName/tests/Edit Screen/Operation/RemoveButton.js',
                'mods/MFTest/EditListOtherName/tests/Edit Screen/Operation/ResetButton.js',
                'mods/MFTest/EditListOtherName/tests/Edit Screen/Operation/SaveButton.js',
                'mods/MFTest/EditListOtherName/tests/Edit Screen/Status',
                'mods/MFTest/EditListOtherName/tests/Edit Screen/Status/CancelButton.js',
                'mods/MFTest/EditListOtherName/tests/Edit Screen/Status/RemoveButton.js',
                'mods/MFTest/EditListOtherName/tests/Edit Screen/Status/ResetButton.js',
                'mods/MFTest/EditListOtherName/tests/Edit Screen/Status/SaveButton.js',
                'mods/MFTest/EditListOtherName/tests/List Screen',
                'mods/MFTest/EditListOtherName/tests/List Screen/Operation',
                'mods/MFTest/EditListOtherName/tests/List Screen/Operation/EditButton.js',
                'mods/MFTest/EditListOtherName/tests/List Screen/Operation/NewButton.js',
                'mods/MFTest/EditListOtherName/tests/List Screen/Operation/Paging Toolbar',
                'mods/MFTest/EditListOtherName/tests/List Screen/Operation/Paging Toolbar/FirstButton.js',
                'mods/MFTest/EditListOtherName/tests/List Screen/Operation/Paging Toolbar/LastButton.js',
                'mods/MFTest/EditListOtherName/tests/List Screen/Operation/Paging Toolbar/NextButton.js',
                'mods/MFTest/EditListOtherName/tests/List Screen/Operation/Paging Toolbar/NumberField.js',
                'mods/MFTest/EditListOtherName/tests/List Screen/Operation/Paging Toolbar/PrevButton.js',
                'mods/MFTest/EditListOtherName/tests/List Screen/Operation/Paging Toolbar/RefreshButton.js',
                'mods/MFTest/EditListOtherName/tests/List Screen/Operation/RefreshButton.js',
                'mods/MFTest/EditListOtherName/tests/List Screen/Operation/RemoveButton.js',
                'mods/MFTest/EditListOtherName/tests/List Screen/Operation/Search Field',
                'mods/MFTest/EditListOtherName/tests/List Screen/Operation/Search Field/Edit.js',
                'mods/MFTest/EditListOtherName/tests/List Screen/Operation/Search Field/Paging.js',
                'mods/MFTest/EditListOtherName/tests/List Screen/Operation/Search Field/Remove.js',
                'mods/MFTest/EditListOtherName/tests/List Screen/Operation/Search Field/Search.js',
                'mods/MFTest/EditListOtherName/tests/List Screen/Status',
                'mods/MFTest/EditListOtherName/tests/List Screen/Status/EditButton.js',
                'mods/MFTest/EditListOtherName/tests/List Screen/Status/NewButton.js',
                'mods/MFTest/EditListOtherName/tests/List Screen/Status/Paging Toolbar',
                'mods/MFTest/EditListOtherName/tests/List Screen/Status/Paging Toolbar/FirstButton.js',
                'mods/MFTest/EditListOtherName/tests/List Screen/Status/Paging Toolbar/LastButton.js',
                'mods/MFTest/EditListOtherName/tests/List Screen/Status/Paging Toolbar/NextButton.js',
                'mods/MFTest/EditListOtherName/tests/List Screen/Status/Paging Toolbar/PrevButton.js',
                'mods/MFTest/EditListOtherName/tests/List Screen/Status/Paging Toolbar/RefreshButton.js',
                'mods/MFTest/EditListOtherName/tests/List Screen/Status/RefreshButton.js',
                'mods/MFTest/EditListOtherName/tests/List Screen/Status/RemoveButton.js',
                'mods/MFTest/EditListOtherName/tests/New Screen',
                'mods/MFTest/EditListOtherName/tests/New Screen/Operation',
                'mods/MFTest/EditListOtherName/tests/New Screen/Operation/CancelButton.js',
                'mods/MFTest/EditListOtherName/tests/New Screen/Operation/Confirm Cancel Message',
                'mods/MFTest/EditListOtherName/tests/New Screen/Operation/Confirm Cancel Message/NoButton.js',
                'mods/MFTest/EditListOtherName/tests/New Screen/Operation/Confirm Cancel Message/YesButton.js',
                'mods/MFTest/EditListOtherName/tests/New Screen/Operation/RemoveButton.js',
                'mods/MFTest/EditListOtherName/tests/New Screen/Operation/ResetButton.js',
                'mods/MFTest/EditListOtherName/tests/New Screen/Operation/SaveButton.js',
                'mods/MFTest/EditListOtherName/tests/New Screen/Status',
                'mods/MFTest/EditListOtherName/tests/New Screen/Status/CancelButton.js',
                'mods/MFTest/EditListOtherName/tests/New Screen/Status/RemoveButton.js',
                'mods/MFTest/EditListOtherName/tests/New Screen/Status/ResetButton.js',
                'mods/MFTest/EditListOtherName/tests/New Screen/Status/SaveButton.js'
            ], function(filePath) {
                assert.ok(fs.existsSync(path.join(targetPath, filePath)));
            });

            // JSON生成テスト
            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/EditListOtherName/api.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    MFTest_EditListOtherName_Lists: {
                        tests: {
                            getRoles: 'MFTest_EditListOtherName_Tests.getRoles',
                            getGrid: 'MFTest_EditListOtherName_Tests.getGrid',
                            readData: 'MFTest_EditListOtherName_Tests.readData',
                            updateData: 'MFTest_EditListOtherName_Tests.updateData',
                            removeData: 'MFTest_EditListOtherName_Tests.removeData' },
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
                    MFTest_EditListOtherName_Tests: {
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
                            path.join(targetPath, 'mods/MFTest/EditListOtherName/locales/lang-en.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.EditListOtherName': {
                        'Please enter textdata': 'Please enter textdata.',
                        Title: 'MFTest.EditListOtherName',
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
                            path.join(targetPath, 'mods/MFTest/EditListOtherName/locales/lang-ja.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.EditListOtherName': {
                        'Please enter textdata': 'テキストを入力してください。',
                        Title: 'MFTest.EditListOtherName',
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
                            path.join(targetPath, 'mods/MFTest/EditListOtherName/module.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    screen: 'editlistothername',
                    xtype: 'mftest-editlistothername',
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

        });

    });

    // }}}
    // {{{ generate editlist other screen name

    decidedIt("generate editlist other screen name", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate editlist MFTest/EditListOtherScreenName --name=editlistsetothername', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // ファイル配置テスト
            CLI.iterate([
                'mods/MFTest/EditListOtherScreenName/api.json',
                'mods/MFTest/EditListOtherScreenName/app',
                'mods/MFTest/EditListOtherScreenName/app/controller',
                'mods/MFTest/EditListOtherScreenName/app/controller/Main.js',
                'mods/MFTest/EditListOtherScreenName/app/model',
                'mods/MFTest/EditListOtherScreenName/app/model/List.js',
                'mods/MFTest/EditListOtherScreenName/app/store',
                'mods/MFTest/EditListOtherScreenName/app/store/Lists.js',
                'mods/MFTest/EditListOtherScreenName/app/view',
                'mods/MFTest/EditListOtherScreenName/app/view/edit',
                'mods/MFTest/EditListOtherScreenName/app/view/edit/Edit.js',
                'mods/MFTest/EditListOtherScreenName/app/view/edit/EditController.js',
                'mods/MFTest/EditListOtherScreenName/app/view/edit/EditModel.js',
                'mods/MFTest/EditListOtherScreenName/app/view/list',
                'mods/MFTest/EditListOtherScreenName/app/view/list/List.js',
                'mods/MFTest/EditListOtherScreenName/app/view/list/ListController.js',
                'mods/MFTest/EditListOtherScreenName/app/view/list/ListModel.js',
                'mods/MFTest/EditListOtherScreenName/app/view/main',
                'mods/MFTest/EditListOtherScreenName/app/view/main/Main.js',
                'mods/MFTest/EditListOtherScreenName/app/view/main/MainController.js',
                'mods/MFTest/EditListOtherScreenName/app/view/main/MainModel.js',
                'mods/MFTest/EditListOtherScreenName/classes',
                'mods/MFTest/EditListOtherScreenName/classes/Lists.php',
                'mods/MFTest/EditListOtherScreenName/classes/Tests.php',
                'mods/MFTest/EditListOtherScreenName/locales',
                'mods/MFTest/EditListOtherScreenName/locales/lang-en.json',
                'mods/MFTest/EditListOtherScreenName/locales/lang-ja.json',
                'mods/MFTest/EditListOtherScreenName/module.json',
                'mods/MFTest/EditListOtherScreenName/resources',
                'mods/MFTest/EditListOtherScreenName/resources/images',
                'mods/MFTest/EditListOtherScreenName/resources/images/Readme.md',
                'mods/MFTest/EditListOtherScreenName/sass',
                'mods/MFTest/EditListOtherScreenName/sass/all.scss',
                'mods/MFTest/EditListOtherScreenName/tests',
                'mods/MFTest/EditListOtherScreenName/tests/data.txt',
                'mods/MFTest/EditListOtherScreenName/tests/Edit Screen',
                'mods/MFTest/EditListOtherScreenName/tests/Edit Screen/Operation',
                'mods/MFTest/EditListOtherScreenName/tests/Edit Screen/Operation/CancelButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/Edit Screen/Operation/Confirm Cancel Message',
                'mods/MFTest/EditListOtherScreenName/tests/Edit Screen/Operation/Confirm Cancel Message/NoButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/Edit Screen/Operation/Confirm Cancel Message/YesButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/Edit Screen/Operation/Confirm Remove Message',
                'mods/MFTest/EditListOtherScreenName/tests/Edit Screen/Operation/Confirm Remove Message/NoButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/Edit Screen/Operation/Confirm Remove Message/YesButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/Edit Screen/Operation/RemoveButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/Edit Screen/Operation/ResetButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/Edit Screen/Operation/SaveButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/Edit Screen/Status',
                'mods/MFTest/EditListOtherScreenName/tests/Edit Screen/Status/CancelButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/Edit Screen/Status/RemoveButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/Edit Screen/Status/ResetButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/Edit Screen/Status/SaveButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Operation',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Operation/EditButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Operation/NewButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Operation/Paging Toolbar',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Operation/Paging Toolbar/FirstButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Operation/Paging Toolbar/LastButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Operation/Paging Toolbar/NextButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Operation/Paging Toolbar/NumberField.js',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Operation/Paging Toolbar/PrevButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Operation/Paging Toolbar/RefreshButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Operation/RefreshButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Operation/RemoveButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Operation/Search Field',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Operation/Search Field/Edit.js',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Operation/Search Field/Paging.js',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Operation/Search Field/Remove.js',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Operation/Search Field/Search.js',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Status',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Status/EditButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Status/NewButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Status/Paging Toolbar',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Status/Paging Toolbar/FirstButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Status/Paging Toolbar/LastButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Status/Paging Toolbar/NextButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Status/Paging Toolbar/PrevButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Status/Paging Toolbar/RefreshButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Status/RefreshButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/List Screen/Status/RemoveButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/New Screen',
                'mods/MFTest/EditListOtherScreenName/tests/New Screen/Operation',
                'mods/MFTest/EditListOtherScreenName/tests/New Screen/Operation/CancelButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/New Screen/Operation/Confirm Cancel Message',
                'mods/MFTest/EditListOtherScreenName/tests/New Screen/Operation/Confirm Cancel Message/NoButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/New Screen/Operation/Confirm Cancel Message/YesButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/New Screen/Operation/RemoveButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/New Screen/Operation/ResetButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/New Screen/Operation/SaveButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/New Screen/Status',
                'mods/MFTest/EditListOtherScreenName/tests/New Screen/Status/CancelButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/New Screen/Status/RemoveButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/New Screen/Status/ResetButton.js',
                'mods/MFTest/EditListOtherScreenName/tests/New Screen/Status/SaveButton.js'
            ], function(filePath) {
                assert.ok(fs.existsSync(path.join(targetPath, filePath)));
            });

            // JSON生成テスト
            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/EditListOtherScreenName/api.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    MFTest_EditListOtherScreenName_Lists: {
                        tests: {
                            getRoles: 'MFTest_EditListOtherScreenName_Tests.getRoles',
                            getGrid: 'MFTest_EditListOtherScreenName_Tests.getGrid',
                            readData: 'MFTest_EditListOtherScreenName_Tests.readData',
                            updateData: 'MFTest_EditListOtherScreenName_Tests.updateData',
                            removeData: 'MFTest_EditListOtherScreenName_Tests.removeData' },
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
                    MFTest_EditListOtherScreenName_Tests: {
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
                            path.join(targetPath, 'mods/MFTest/EditListOtherScreenName/locales/lang-en.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.EditListOtherScreenName': {
                        'Please enter textdata': 'Please enter textdata.',
                        Title: 'MFTest.EditListOtherScreenName',
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
                            path.join(targetPath, 'mods/MFTest/EditListOtherScreenName/locales/lang-ja.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.EditListOtherScreenName': {
                        'Please enter textdata': 'テキストを入力してください。',
                        Title: 'MFTest.EditListOtherScreenName',
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
                            path.join(targetPath, 'mods/MFTest/EditListOtherScreenName/module.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    screen: 'editlistsetothername',
                    xtype: 'mftest-editlistotherscreenname',
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

        });

    });

    // }}}
    // {{{ generate editlist other table

    decidedIt("generate editlist other table", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate editlist MFTest/EditListOtherTable --table=editlistothertable', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // ファイル配置テスト
            CLI.iterate([
                'mods/MFTest/EditListOtherTable/api.json',
                'mods/MFTest/EditListOtherTable/app',
                'mods/MFTest/EditListOtherTable/app/controller',
                'mods/MFTest/EditListOtherTable/app/controller/Main.js',
                'mods/MFTest/EditListOtherTable/app/model',
                'mods/MFTest/EditListOtherTable/app/model/List.js',
                'mods/MFTest/EditListOtherTable/app/store',
                'mods/MFTest/EditListOtherTable/app/store/Lists.js',
                'mods/MFTest/EditListOtherTable/app/view',
                'mods/MFTest/EditListOtherTable/app/view/edit',
                'mods/MFTest/EditListOtherTable/app/view/edit/Edit.js',
                'mods/MFTest/EditListOtherTable/app/view/edit/EditController.js',
                'mods/MFTest/EditListOtherTable/app/view/edit/EditModel.js',
                'mods/MFTest/EditListOtherTable/app/view/list',
                'mods/MFTest/EditListOtherTable/app/view/list/List.js',
                'mods/MFTest/EditListOtherTable/app/view/list/ListController.js',
                'mods/MFTest/EditListOtherTable/app/view/list/ListModel.js',
                'mods/MFTest/EditListOtherTable/app/view/main',
                'mods/MFTest/EditListOtherTable/app/view/main/Main.js',
                'mods/MFTest/EditListOtherTable/app/view/main/MainController.js',
                'mods/MFTest/EditListOtherTable/app/view/main/MainModel.js',
                'mods/MFTest/EditListOtherTable/classes',
                'mods/MFTest/EditListOtherTable/classes/Lists.php',
                'mods/MFTest/EditListOtherTable/classes/Tests.php',
                'mods/MFTest/EditListOtherTable/locales',
                'mods/MFTest/EditListOtherTable/locales/lang-en.json',
                'mods/MFTest/EditListOtherTable/locales/lang-ja.json',
                'mods/MFTest/EditListOtherTable/module.json',
                'mods/MFTest/EditListOtherTable/resources',
                'mods/MFTest/EditListOtherTable/resources/images',
                'mods/MFTest/EditListOtherTable/resources/images/Readme.md',
                'mods/MFTest/EditListOtherTable/sass',
                'mods/MFTest/EditListOtherTable/sass/all.scss',
                'mods/MFTest/EditListOtherTable/tests',
                'mods/MFTest/EditListOtherTable/tests/data.txt',
                'mods/MFTest/EditListOtherTable/tests/Edit Screen',
                'mods/MFTest/EditListOtherTable/tests/Edit Screen/Operation',
                'mods/MFTest/EditListOtherTable/tests/Edit Screen/Operation/CancelButton.js',
                'mods/MFTest/EditListOtherTable/tests/Edit Screen/Operation/Confirm Cancel Message',
                'mods/MFTest/EditListOtherTable/tests/Edit Screen/Operation/Confirm Cancel Message/NoButton.js',
                'mods/MFTest/EditListOtherTable/tests/Edit Screen/Operation/Confirm Cancel Message/YesButton.js',
                'mods/MFTest/EditListOtherTable/tests/Edit Screen/Operation/Confirm Remove Message',
                'mods/MFTest/EditListOtherTable/tests/Edit Screen/Operation/Confirm Remove Message/NoButton.js',
                'mods/MFTest/EditListOtherTable/tests/Edit Screen/Operation/Confirm Remove Message/YesButton.js',
                'mods/MFTest/EditListOtherTable/tests/Edit Screen/Operation/RemoveButton.js',
                'mods/MFTest/EditListOtherTable/tests/Edit Screen/Operation/ResetButton.js',
                'mods/MFTest/EditListOtherTable/tests/Edit Screen/Operation/SaveButton.js',
                'mods/MFTest/EditListOtherTable/tests/Edit Screen/Status',
                'mods/MFTest/EditListOtherTable/tests/Edit Screen/Status/CancelButton.js',
                'mods/MFTest/EditListOtherTable/tests/Edit Screen/Status/RemoveButton.js',
                'mods/MFTest/EditListOtherTable/tests/Edit Screen/Status/ResetButton.js',
                'mods/MFTest/EditListOtherTable/tests/Edit Screen/Status/SaveButton.js',
                'mods/MFTest/EditListOtherTable/tests/List Screen',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Operation',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Operation/EditButton.js',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Operation/NewButton.js',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Operation/Paging Toolbar',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Operation/Paging Toolbar/FirstButton.js',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Operation/Paging Toolbar/LastButton.js',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Operation/Paging Toolbar/NextButton.js',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Operation/Paging Toolbar/NumberField.js',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Operation/Paging Toolbar/PrevButton.js',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Operation/Paging Toolbar/RefreshButton.js',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Operation/RefreshButton.js',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Operation/RemoveButton.js',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Operation/Search Field',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Operation/Search Field/Edit.js',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Operation/Search Field/Paging.js',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Operation/Search Field/Remove.js',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Operation/Search Field/Search.js',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Status',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Status/EditButton.js',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Status/NewButton.js',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Status/Paging Toolbar',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Status/Paging Toolbar/FirstButton.js',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Status/Paging Toolbar/LastButton.js',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Status/Paging Toolbar/NextButton.js',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Status/Paging Toolbar/PrevButton.js',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Status/Paging Toolbar/RefreshButton.js',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Status/RefreshButton.js',
                'mods/MFTest/EditListOtherTable/tests/List Screen/Status/RemoveButton.js',
                'mods/MFTest/EditListOtherTable/tests/New Screen',
                'mods/MFTest/EditListOtherTable/tests/New Screen/Operation',
                'mods/MFTest/EditListOtherTable/tests/New Screen/Operation/CancelButton.js',
                'mods/MFTest/EditListOtherTable/tests/New Screen/Operation/Confirm Cancel Message',
                'mods/MFTest/EditListOtherTable/tests/New Screen/Operation/Confirm Cancel Message/NoButton.js',
                'mods/MFTest/EditListOtherTable/tests/New Screen/Operation/Confirm Cancel Message/YesButton.js',
                'mods/MFTest/EditListOtherTable/tests/New Screen/Operation/RemoveButton.js',
                'mods/MFTest/EditListOtherTable/tests/New Screen/Operation/ResetButton.js',
                'mods/MFTest/EditListOtherTable/tests/New Screen/Operation/SaveButton.js',
                'mods/MFTest/EditListOtherTable/tests/New Screen/Status',
                'mods/MFTest/EditListOtherTable/tests/New Screen/Status/CancelButton.js',
                'mods/MFTest/EditListOtherTable/tests/New Screen/Status/RemoveButton.js',
                'mods/MFTest/EditListOtherTable/tests/New Screen/Status/ResetButton.js',
                'mods/MFTest/EditListOtherTable/tests/New Screen/Status/SaveButton.js'
            ], function(filePath) {
                assert.ok(fs.existsSync(path.join(targetPath, filePath)));
            });

            // JSON生成テスト
            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/EditListOtherTable/api.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    MFTest_EditListOtherTable_Lists: {
                        tests: {
                            getRoles: 'MFTest_EditListOtherTable_Tests.getRoles',
                            getGrid: 'MFTest_EditListOtherTable_Tests.getGrid',
                            readData: 'MFTest_EditListOtherTable_Tests.readData',
                            updateData: 'MFTest_EditListOtherTable_Tests.updateData',
                            removeData: 'MFTest_EditListOtherTable_Tests.removeData' },
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
                    MFTest_EditListOtherTable_Tests: {
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
                            path.join(targetPath, 'mods/MFTest/EditListOtherTable/locales/lang-en.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.EditListOtherTable': {
                        'Please enter textdata': 'Please enter textdata.',
                        Title: 'MFTest.EditListOtherTable',
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
                            path.join(targetPath, 'mods/MFTest/EditListOtherTable/locales/lang-ja.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.EditListOtherTable': {
                        'Please enter textdata': 'テキストを入力してください。',
                        Title: 'MFTest.EditListOtherTable',
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
                            path.join(targetPath, 'mods/MFTest/EditListOtherTable/module.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    screen: 'editlistothertable',
                    xtype: 'mftest-editlistothertable',
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

        });

    });

    // }}}
    // {{{ generate editlist nodb

    decidedIt("generate editlist nodb", function(next) {

        // 作業ディレクトリへ移動
        process.chdir(targetPath);

        execChildProcess(programPath + ' generate editlist MFTest/EditListNoDB --table=editlistnodb --nodb', function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            // ファイル配置テスト
            CLI.iterate([
                'mods/MFTest/EditListNoDB/api.json',
                'mods/MFTest/EditListNoDB/app',
                'mods/MFTest/EditListNoDB/app/controller',
                'mods/MFTest/EditListNoDB/app/controller/Main.js',
                'mods/MFTest/EditListNoDB/app/model',
                'mods/MFTest/EditListNoDB/app/model/List.js',
                'mods/MFTest/EditListNoDB/app/store',
                'mods/MFTest/EditListNoDB/app/store/Lists.js',
                'mods/MFTest/EditListNoDB/app/view',
                'mods/MFTest/EditListNoDB/app/view/edit',
                'mods/MFTest/EditListNoDB/app/view/edit/Edit.js',
                'mods/MFTest/EditListNoDB/app/view/edit/EditController.js',
                'mods/MFTest/EditListNoDB/app/view/edit/EditModel.js',
                'mods/MFTest/EditListNoDB/app/view/list',
                'mods/MFTest/EditListNoDB/app/view/list/List.js',
                'mods/MFTest/EditListNoDB/app/view/list/ListController.js',
                'mods/MFTest/EditListNoDB/app/view/list/ListModel.js',
                'mods/MFTest/EditListNoDB/app/view/main',
                'mods/MFTest/EditListNoDB/app/view/main/Main.js',
                'mods/MFTest/EditListNoDB/app/view/main/MainController.js',
                'mods/MFTest/EditListNoDB/app/view/main/MainModel.js',
                'mods/MFTest/EditListNoDB/classes',
                'mods/MFTest/EditListNoDB/classes/Lists.php',
                'mods/MFTest/EditListNoDB/classes/Tests.php',
                'mods/MFTest/EditListNoDB/locales',
                'mods/MFTest/EditListNoDB/locales/lang-en.json',
                'mods/MFTest/EditListNoDB/locales/lang-ja.json',
                'mods/MFTest/EditListNoDB/module.json',
                'mods/MFTest/EditListNoDB/resources',
                'mods/MFTest/EditListNoDB/resources/images',
                'mods/MFTest/EditListNoDB/resources/images/Readme.md',
                'mods/MFTest/EditListNoDB/sass',
                'mods/MFTest/EditListNoDB/sass/all.scss',
                'mods/MFTest/EditListNoDB/tests',
                'mods/MFTest/EditListNoDB/tests/data.txt',
                'mods/MFTest/EditListNoDB/tests/Edit Screen',
                'mods/MFTest/EditListNoDB/tests/Edit Screen/Operation',
                'mods/MFTest/EditListNoDB/tests/Edit Screen/Operation/CancelButton.js',
                'mods/MFTest/EditListNoDB/tests/Edit Screen/Operation/Confirm Cancel Message',
                'mods/MFTest/EditListNoDB/tests/Edit Screen/Operation/Confirm Cancel Message/NoButton.js',
                'mods/MFTest/EditListNoDB/tests/Edit Screen/Operation/Confirm Cancel Message/YesButton.js',
                'mods/MFTest/EditListNoDB/tests/Edit Screen/Operation/Confirm Remove Message',
                'mods/MFTest/EditListNoDB/tests/Edit Screen/Operation/Confirm Remove Message/NoButton.js',
                'mods/MFTest/EditListNoDB/tests/Edit Screen/Operation/Confirm Remove Message/YesButton.js',
                'mods/MFTest/EditListNoDB/tests/Edit Screen/Operation/RemoveButton.js',
                'mods/MFTest/EditListNoDB/tests/Edit Screen/Operation/ResetButton.js',
                'mods/MFTest/EditListNoDB/tests/Edit Screen/Operation/SaveButton.js',
                'mods/MFTest/EditListNoDB/tests/Edit Screen/Status',
                'mods/MFTest/EditListNoDB/tests/Edit Screen/Status/CancelButton.js',
                'mods/MFTest/EditListNoDB/tests/Edit Screen/Status/RemoveButton.js',
                'mods/MFTest/EditListNoDB/tests/Edit Screen/Status/ResetButton.js',
                'mods/MFTest/EditListNoDB/tests/Edit Screen/Status/SaveButton.js',
                'mods/MFTest/EditListNoDB/tests/List Screen',
                'mods/MFTest/EditListNoDB/tests/List Screen/Operation',
                'mods/MFTest/EditListNoDB/tests/List Screen/Operation/EditButton.js',
                'mods/MFTest/EditListNoDB/tests/List Screen/Operation/NewButton.js',
                'mods/MFTest/EditListNoDB/tests/List Screen/Operation/Paging Toolbar',
                'mods/MFTest/EditListNoDB/tests/List Screen/Operation/Paging Toolbar/FirstButton.js',
                'mods/MFTest/EditListNoDB/tests/List Screen/Operation/Paging Toolbar/LastButton.js',
                'mods/MFTest/EditListNoDB/tests/List Screen/Operation/Paging Toolbar/NextButton.js',
                'mods/MFTest/EditListNoDB/tests/List Screen/Operation/Paging Toolbar/NumberField.js',
                'mods/MFTest/EditListNoDB/tests/List Screen/Operation/Paging Toolbar/PrevButton.js',
                'mods/MFTest/EditListNoDB/tests/List Screen/Operation/Paging Toolbar/RefreshButton.js',
                'mods/MFTest/EditListNoDB/tests/List Screen/Operation/RefreshButton.js',
                'mods/MFTest/EditListNoDB/tests/List Screen/Operation/RemoveButton.js',
                'mods/MFTest/EditListNoDB/tests/List Screen/Operation/Search Field',
                'mods/MFTest/EditListNoDB/tests/List Screen/Operation/Search Field/Edit.js',
                'mods/MFTest/EditListNoDB/tests/List Screen/Operation/Search Field/Paging.js',
                'mods/MFTest/EditListNoDB/tests/List Screen/Operation/Search Field/Remove.js',
                'mods/MFTest/EditListNoDB/tests/List Screen/Operation/Search Field/Search.js',
                'mods/MFTest/EditListNoDB/tests/List Screen/Status',
                'mods/MFTest/EditListNoDB/tests/List Screen/Status/EditButton.js',
                'mods/MFTest/EditListNoDB/tests/List Screen/Status/NewButton.js',
                'mods/MFTest/EditListNoDB/tests/List Screen/Status/Paging Toolbar',
                'mods/MFTest/EditListNoDB/tests/List Screen/Status/Paging Toolbar/FirstButton.js',
                'mods/MFTest/EditListNoDB/tests/List Screen/Status/Paging Toolbar/LastButton.js',
                'mods/MFTest/EditListNoDB/tests/List Screen/Status/Paging Toolbar/NextButton.js',
                'mods/MFTest/EditListNoDB/tests/List Screen/Status/Paging Toolbar/PrevButton.js',
                'mods/MFTest/EditListNoDB/tests/List Screen/Status/Paging Toolbar/RefreshButton.js',
                'mods/MFTest/EditListNoDB/tests/List Screen/Status/RefreshButton.js',
                'mods/MFTest/EditListNoDB/tests/List Screen/Status/RemoveButton.js',
                'mods/MFTest/EditListNoDB/tests/New Screen',
                'mods/MFTest/EditListNoDB/tests/New Screen/Operation',
                'mods/MFTest/EditListNoDB/tests/New Screen/Operation/CancelButton.js',
                'mods/MFTest/EditListNoDB/tests/New Screen/Operation/Confirm Cancel Message',
                'mods/MFTest/EditListNoDB/tests/New Screen/Operation/Confirm Cancel Message/NoButton.js',
                'mods/MFTest/EditListNoDB/tests/New Screen/Operation/Confirm Cancel Message/YesButton.js',
                'mods/MFTest/EditListNoDB/tests/New Screen/Operation/RemoveButton.js',
                'mods/MFTest/EditListNoDB/tests/New Screen/Operation/ResetButton.js',
                'mods/MFTest/EditListNoDB/tests/New Screen/Operation/SaveButton.js',
                'mods/MFTest/EditListNoDB/tests/New Screen/Status',
                'mods/MFTest/EditListNoDB/tests/New Screen/Status/CancelButton.js',
                'mods/MFTest/EditListNoDB/tests/New Screen/Status/RemoveButton.js',
                'mods/MFTest/EditListNoDB/tests/New Screen/Status/ResetButton.js',
                'mods/MFTest/EditListNoDB/tests/New Screen/Status/SaveButton.js'
            ], function(filePath) {
                assert.ok(fs.existsSync(path.join(targetPath, filePath)));
            });

            // JSON生成テスト
            assert.deepEqual(
                CLI.decode(
                    removeComment(
                        fs.readFileSync(
                            path.join(targetPath, 'mods/MFTest/EditListNoDB/api.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    MFTest_EditListNoDB_Lists: {
                        tests: {
                            getRoles: 'MFTest_EditListNoDB_Tests.getRoles',
                            getGrid: 'MFTest_EditListNoDB_Tests.getGrid',
                            readData: 'MFTest_EditListNoDB_Tests.readData',
                            updateData: 'MFTest_EditListNoDB_Tests.updateData',
                            removeData: 'MFTest_EditListNoDB_Tests.removeData' },
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
                    MFTest_EditListNoDB_Tests: {
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
                            path.join(targetPath, 'mods/MFTest/EditListNoDB/locales/lang-en.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.EditListNoDB': {
                        'Please enter textdata': 'Please enter textdata.',
                        Title: 'MFTest.EditListNoDB',
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
                            path.join(targetPath, 'mods/MFTest/EditListNoDB/locales/lang-ja.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    'MFTest.EditListNoDB': {
                        'Please enter textdata': 'テキストを入力してください。',
                        Title: 'MFTest.EditListNoDB',
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
                            path.join(targetPath, 'mods/MFTest/EditListNoDB/module.json')
                        ).toString()
                    ),
                    true
                ),
                {
                    screen: 'editlistnodb',
                    xtype: 'mftest-editlistnodb',
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
