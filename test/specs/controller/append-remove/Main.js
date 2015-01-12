/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * This file is part of MicroField CLI
 */

// {{{ helper

require('../../../helper.js');

// }}}
// {{{ microfield append/remove

describe("microfield append/remove", function() {

    var cfg         = getMicroFieldConfig(),
        rewriteBase = 'micro-field-cli-test-append-remove',
        targetPath  = getTargetPath(rewriteBase),
        decidedIt   = ((!cfg || !cfg.releasesUrl || !cfg.accessToken) ? it.skip : it),
        replaceRegexWS, genTestFn, fieldTests, tests;


    // TODO: とりあえずテストから外すため、後で削除
    //decidedIt = it.skip;

    replaceRegexWS = function(str) {

        if (CLI.isArray(str)) {

            CLI.iterate(str, function(line, num) {
                str[num] = preg_quote(line);
            });

            str = str.join("[\\s\\S]*?");
        } else {
            str = preg_quote(str);
        }

        return str.replace(/ +/g, "[\\s\\S]*?");
    };

    genTestFn = function(type, fieldType, callback) {

        var done = function() {

            // カレントディレクトリ復元
            process.chdir(currentPath);

            // コールバック
            callback();

        };

        return function(err, stdout, stderr) {

            assert.equal(err, null);
            assert.equal(stderr, '');

            CLI.iterate(fieldTests[type][fieldType], function(item) {
                assert.ok(removeComment(fs.readFileSync(item.file).toString()).match(new RegExp(item.regex)));
            });

            // カレントディレクトリ復元
            process.chdir(currentPath);

            // コールバック実行
            done();

        };

    };

    fieldTests = {

        // {{{ for edit

        'MFTest/Edit': {

            // {{{ datefield

            'datefield': [{
                // itemsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/Edit/app/view/edit/Edit.js'),
                regex   : replaceRegexWS([
                    "Ext.define(",
                    "    'MFTest.Edit.view.edit.Edit' , {",
                    "        items : [",
                    "        {",
                    "            xtype : 'datefield' ,",
                    "            itemId : 'field1' ,",
                    "            labelAlign : 'top' ,",
                    "            name : 'field1' ,",
                    "            fieldLabel : 'field1' ,",
                    "            width : 300",
                    "        }",
                    ");"
                ])
            }, {
                // $fieldsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/Edit/classes/Users.php'),
                regex   : replaceRegexWS([
                    "class MFTest_Edit_Users extends EditEdit {",
                    "    public $fields = array(",
                    "        'field1'",
                    "    ) ;",
                    "}"
                ])
            }],

            // }}}
            // {{{ htmleditor

            'htmleditor': [{
                // itemsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/Edit/app/view/edit/Edit.js'),
                regex   : replaceRegexWS([
                    "Ext.define( 'MFTest.Edit.view.edit.Edit' , {",
                    "    items : [",
                    "    {",
                    "        xtype : 'htmleditor' ,",
                    "        itemId : 'field2' ,",
                    "        labelAlign : 'top' ,",
                    "        name : 'field2' ,",
                    "        fieldLabel : 'field2' ,",
                    "        width : 300",
                    "    }",
                    ");"
                ])
            }, {
                // $fieldsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/Edit/classes/Users.php'),
                regex   : replaceRegexWS([
                    "class MFTest_Edit_Users extends EditEdit {",
                    "    public $fields = array(",
                    "        'field2'",
                    "    ) ;",
                    "}"
                ])
            }],

            // }}}
            // {{{ numberfield

            'numberfield': [{
                // itemsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/Edit/app/view/edit/Edit.js'),
                regex   : replaceRegexWS([
                    "Ext.define( 'MFTest.Edit.view.edit.Edit' , {",
                    "    items : [",
                    "    {",
                    "        xtype : 'numberfield' ,",
                    "        itemId : 'field3' ,",
                    "        labelAlign : 'top' ,",
                    "        name : 'field3' ,",
                    "        fieldLabel : 'field3' ,",
                    "        width : 300",
                    "    }",
                    ");"
                ])
            }, {
                // $fieldsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/Edit/classes/Users.php'),
                regex   : replaceRegexWS([
                    "class MFTest_Edit_Users extends EditEdit {",
                    "    public $fields = array(",
                    "    'field3'",
                    "    ) ;",
                    "}"
                ])
            }],

            // }}}
            // {{{ textarea

            'textarea': [{
                // itemsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/Edit/app/view/edit/Edit.js'),
                regex   : replaceRegexWS([
                    "Ext.define( 'MFTest.Edit.view.edit.Edit' , {",
                    "    items : [",
                    "    {",
                    "        xtype : 'textareafield' ,",
                    "        itemId : 'field4' ,",
                    "        labelAlign : 'top' ,",
                    "        name : 'field4' ,",
                    "        fieldLabel : 'field4' ,",
                    "        width : 300",
                    "    }",
                    ");"
                ])
            }, {
                // $fieldsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/Edit/classes/Users.php'),
                regex   : replaceRegexWS([
                    "class MFTest_Edit_Users extends EditEdit {",
                    "    public $fields = array(",
                    "        'field4'",
                    "    ) ;",
                    "}"
                ])
            }],

            // }}}
            // {{{ textfield

            'textfield': [{
                // itemsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/Edit/app/view/edit/Edit.js'),
                regex   : replaceRegexWS([
                    "Ext.define( 'MFTest.Edit.view.edit.Edit' , {",
                    "    items : [",
                    "    {",
                    "        xtype : 'textfield' ,",
                    "        itemId : 'field5' ,",
                    "        labelAlign : 'top' ,",
                    "        name : 'field5' ,",
                    "        fieldLabel : 'field5' ,",
                    "        width : 300",
                    "    }",
                    ");"
                ])
            }, {
                // $fieldsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/Edit/classes/Users.php'),
                regex   : replaceRegexWS([
                    "class MFTest_Edit_Users extends EditEdit {",
                    "    public $fields = array(",
                    "        'field5'",
                    "    ) ;",
                    "}"
                ])
            }],

            // }}}
            // {{{ timefield

            'timefield': [{
                // itemsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/Edit/app/view/edit/Edit.js'),
                regex   : replaceRegexWS([
                    "Ext.define( 'MFTest.Edit.view.edit.Edit' , {",
                    "    items : [",
                    "    {",
                    "        xtype : 'timefield' ,",
                    "        itemId : 'field6' ,",
                    "        labelAlign : 'top' ,",
                    "        name : 'field6' ,",
                    "        fieldLabel : 'field6' ,",
                    "        width : 300",
                    "    }",
                    ");"
                ])
            }, {
                // $fieldsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/Edit/classes/Users.php'),
                regex   : replaceRegexWS([
                    "class MFTest_Edit_Users extends EditEdit {",
                    "    public $fields = array(",
                    "        'field6'",
                    "    ) ;",
                    "}"
                ])
            }],

            // }}}
            // {{{ triggerfield

            'triggerfield': [{
                // itemsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/Edit/app/view/edit/Edit.js'),
                regex   : replaceRegexWS([
                    "Ext.define( 'MFTest.Edit.view.edit.Edit' , {",
                    "    items : [",
                    "    {",
                    "        xtype : 'triggerfield' ,",
                    "        itemId : 'field7' ,",
                    "        labelAlign : 'top' ,",
                    "        name : 'field7' ,",
                    "        fieldLabel : 'field7' ,",
                    "        width : 300",
                    "    }",
                    ");"
                ])
            }, {
                // $fieldsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/Edit/classes/Users.php'),
                regex   : replaceRegexWS([
                    "class MFTest_Edit_Users extends EditEdit {",
                    "    public $fields = array(",
                    "        'field7'",
                    "    ) ;",
                    "}"
                ])
            }]

            // }}}

        },

        // }}}
        // {{{ for editlist

        'MFTest/EditList': {

            // {{{ datefield

            'datefield': [{
                // itemsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/app/view/edit/Edit.js'),
                regex   : replaceRegexWS([
                    "Ext.define(",
                    "    'MFTest.EditList.view.edit.Edit' , {",
                    "        items : [",
                    "        {",
                    "            xtype : 'datefield' ,",
                    "            itemId : 'field1' ,",
                    "            labelAlign : 'top' ,",
                    "            name : 'field1' ,",
                    "            fieldLabel : 'field1' ,",
                    "            width : 300",
                    "        }",
                    ");"
                ])
            }, {
                // $fieldsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/classes/Lists.php'),
                regex   : replaceRegexWS([
                    "class MFTest_EditList_Lists extends EditList {",
                    "    public $fields = array(",
                    "        'field1'",
                    "    ) ;",
                    "}"
                ])
            }],

            // }}}
            // {{{ htmleditor

            'htmleditor': [{
                // itemsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/app/view/edit/Edit.js'),
                regex   : replaceRegexWS([
                    "Ext.define( 'MFTest.EditList.view.edit.Edit' , {",
                    "    items : [",
                    "    {",
                    "        xtype : 'htmleditor' ,",
                    "        itemId : 'field2' ,",
                    "        labelAlign : 'top' ,",
                    "        name : 'field2' ,",
                    "        fieldLabel : 'field2' ,",
                    "        width : 300",
                    "    }",
                    ");"
                ])
            }, {
                // $fieldsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/classes/Lists.php'),
                regex   : replaceRegexWS([
                    "class MFTest_EditList_Lists extends EditList {",
                    "    public $fields = array(",
                    "        'field2'",
                    "    ) ;",
                    "}"
                ])
            }],

            // }}}
            // {{{ numberfield

            'numberfield': [{
                // itemsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/app/view/edit/Edit.js'),
                regex   : replaceRegexWS([
                    "Ext.define( 'MFTest.EditList.view.edit.Edit' , {",
                    "    items : [",
                    "    {",
                    "        xtype : 'numberfield' ,",
                    "        itemId : 'field3' ,",
                    "        labelAlign : 'top' ,",
                    "        name : 'field3' ,",
                    "        fieldLabel : 'field3' ,",
                    "        width : 300",
                    "    }",
                    ");"
                ])
            }, {
                // $fieldsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/classes/Lists.php'),
                regex   : replaceRegexWS([
                    "class MFTest_EditList_Lists extends EditList {",
                    "    public $fields = array(",
                    "    'field3'",
                    "    ) ;",
                    "}"
                ])
            }],

            // }}}
            // {{{ textarea

            'textarea': [{
                // itemsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/app/view/edit/Edit.js'),
                regex   : replaceRegexWS([
                    "Ext.define( 'MFTest.EditList.view.edit.Edit' , {",
                    "    items : [",
                    "    {",
                    "        xtype : 'textareafield' ,",
                    "        itemId : 'field4' ,",
                    "        labelAlign : 'top' ,",
                    "        name : 'field4' ,",
                    "        fieldLabel : 'field4' ,",
                    "        width : 300",
                    "    }",
                    ");"
                ])
            }, {
                // $fieldsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/classes/Lists.php'),
                regex   : replaceRegexWS([
                    "class MFTest_EditList_Lists extends EditList {",
                    "    public $fields = array(",
                    "        'field4'",
                    "    ) ;",
                    "}"
                ])
            }],

            // }}}
            // {{{ textfield

            'textfield': [{
                // itemsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/app/view/edit/Edit.js'),
                regex   : replaceRegexWS([
                    "Ext.define( 'MFTest.EditList.view.edit.Edit' , {",
                    "    items : [",
                    "    {",
                    "        xtype : 'textfield' ,",
                    "        itemId : 'field5' ,",
                    "        labelAlign : 'top' ,",
                    "        name : 'field5' ,",
                    "        fieldLabel : 'field5' ,",
                    "        width : 300",
                    "    }",
                    ");"
                ])
            }, {
                // $fieldsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/classes/Lists.php'),
                regex   : replaceRegexWS([
                    "class MFTest_EditList_Lists extends EditList {",
                    "    public $fields = array(",
                    "        'field5'",
                    "    ) ;",
                    "}"
                ])
            }],

            // }}}
            // {{{ timefield

            'timefield': [{
                // itemsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/app/view/edit/Edit.js'),
                regex   : replaceRegexWS([
                    "Ext.define( 'MFTest.EditList.view.edit.Edit' , {",
                    "    items : [",
                    "    {",
                    "        xtype : 'timefield' ,",
                    "        itemId : 'field6' ,",
                    "        labelAlign : 'top' ,",
                    "        name : 'field6' ,",
                    "        fieldLabel : 'field6' ,",
                    "        width : 300",
                    "    }",
                    ");"
                ])
            }, {
                // $fieldsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/classes/Lists.php'),
                regex   : replaceRegexWS([
                    "class MFTest_EditList_Lists extends EditList {",
                    "    public $fields = array(",
                    "        'field6'",
                    "    ) ;",
                    "}"
                ])
            }],

            // }}}
            // {{{ triggerfield

            'triggerfield': [{
                // itemsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/app/view/edit/Edit.js'),
                regex   : replaceRegexWS([
                    "Ext.define( 'MFTest.EditList.view.edit.Edit' , {",
                    "    items : [",
                    "    {",
                    "        xtype : 'triggerfield' ,",
                    "        itemId : 'field7' ,",
                    "        labelAlign : 'top' ,",
                    "        name : 'field7' ,",
                    "        fieldLabel : 'field7' ,",
                    "        width : 300",
                    "    }",
                    ");"
                ])
            }, {
                // $fieldsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/classes/Lists.php'),
                regex   : replaceRegexWS([
                    "class MFTest_EditList_Lists extends EditList {",
                    "    public $fields = array(",
                    "        'field7'",
                    "    ) ;",
                    "}"
                ])
            }]

            // }}}

        }

        // }}}

    };

    tests = {
        'append fields for edit': {
            'datefield': {
                cmd     : programPath + ' append datefield field1 MFTest/Edit',
                type    : 'MFTest/Edit'
            },
            'htmleditor': {
                cmd     : programPath + ' append htmleditor field2 MFTest/Edit',
                type    : 'MFTest/Edit'
            },
            'numberfield': {
                cmd     : programPath + ' append numberfield field3 MFTest/Edit',
                type    : 'MFTest/Edit'
            },
            'textarea': {
                cmd     : programPath + ' append textarea field4 MFTest/Edit',
                type    : 'MFTest/Edit'
            },
            'textfield': {
                cmd     : programPath + ' append textfield field5 MFTest/Edit',
                type    : 'MFTest/Edit'
            },
            'timefield': {
                cmd     : programPath + ' append timefield field6 MFTest/Edit',
                type    : 'MFTest/Edit'
            },
            'triggerfield': {
                cmd     : programPath + ' append triggerfield field7 MFTest/Edit',
                type    : 'MFTest/Edit'
            }
        },
        'append fields for editlist': {
            'datefield': {
                cmd     : programPath + ' append datefield field1 MFTest/EditList',
                type    : 'MFTest/EditList'
            },
            'htmleditor': {
                cmd     : programPath + ' append htmleditor field2 MFTest/EditList',
                type    : 'MFTest/EditList'
            },
            'numberfield': {
                cmd     : programPath + ' append numberfield field3 MFTest/EditList',
                type    : 'MFTest/EditList'
            },
            'textarea': {
                cmd     : programPath + ' append textarea field4 MFTest/EditList',
                type    : 'MFTest/EditList'
            },
            'textfield': {
                cmd     : programPath + ' append textfield field5 MFTest/EditList',
                type    : 'MFTest/EditList'
            },
            'timefield': {
                cmd     : programPath + ' append timefield field6 MFTest/EditList',
                type    : 'MFTest/EditList'
            },
            'triggerfield': {
                cmd     : programPath + ' append triggerfield field7 MFTest/EditList',
                type    : 'MFTest/EditList'
            }
        }
    };

    // {{{ setup for append test

    /*
    decidedIt("setup for append test", function(next) {
        execChildProcess('cat ' + currentPath + '/test/clear.sql|mysql -uroot', function(err, stdout, stderr) {
            setupAchive(rewriteBase, null, function(targetPath) {
                process.chdir(targetPath);
                execChildProcess(programPath + ' generate edit MFTest/Edit', function(err, stdout, stderr) {
                    execChildProcess(programPath + ' generate editlist MFTest/EditList', function(err, stdout, stderr) {
                        process.chdir(currentPath);
                        next();
                    });
                });
            });
        });
    });
   */

    // }}}
    // {{{ define for tests

    CLI.iterate(tests, function(title, items) {

        describe(title, function() {

            CLI.iterate(items, function(fieldType, value) {

                decidedIt(fieldType, function(next) {

                    // 作業ディレクトリへ移動
                    process.chdir(targetPath);

                    // テスト実行
                    execChildProcess(value.cmd, genTestFn(value.type, fieldType, next));

                });

            });

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
