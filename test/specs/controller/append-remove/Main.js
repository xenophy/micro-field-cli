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
        replaceRegexWS, genAppendTestFn, genRemoveTestFn, fieldTests, dbTests, tests;


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

        str = str.replace(/ +/g, "[\\s\\S]*?");
        str = str.replace(/(\[\\s\\S\]\*\?)+/g, "[\\s\\S]*?");

        return str;

    };

    genAppendTestFn = function(type, fieldType, callback) {

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

            // データベースフィールド
            if (dbTests[type][fieldType]) {

                var t = dbTests[type][fieldType];

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
                        assert.ok(exists);

                        // フィールド定義確認
                        conn.query('SHOW COLUMNS FROM ' + schema.getName(), function(err, result) {

                            var fieldExists = false;

                            CLI.iterate(result, function(item) {

                                if(item.Field == t.fieldName) {
                                    fieldExists = true;
                                }

                            });

                            assert.ok(fieldExists);

                            done();

                        });

                    });

                });

            } else {

                done();

            }

        };

    };

    genRemoveTestFn = function(type, fieldType, callback) {

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

                var src = removeComment(fs.readFileSync(item.file).toString());

                try {
                    var tmp = removeComment(fs.readFileSync(item.file).toString()).match(new RegExp(item.regex));
                } catch(e) {
                    console.log(e);
                }
                assert.equal(removeComment(fs.readFileSync(item.file).toString()).match(new RegExp(item.regex)), null);
            });

            // データベースフィールド
            if (dbTests[type][fieldType]) {

                var t = dbTests[type][fieldType];

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
                        assert.ok(exists);

                        // フィールド定義確認
                        conn.query('SHOW COLUMNS FROM ' + schema.getName(), function(err, result) {

                            var fieldExists = false;

                            CLI.iterate(result, function(item) {

                                if(item.Field == t.fieldName) {
                                    fieldExists = true;
                                }

                            });

                            assert.ok(!fieldExists);

                            done();

                        });

                    });

                });

            } else {

                done();

            }

        };

    }

    dbTests = {
        'MFTest/Edit': {
            'datefield': {
                schema: {
                    cls     : 'Edit',
                    table   : 'edit'
                },
                fieldName   : 'field1'
            },
            'htmleditor': {
                schema: {
                    cls     : 'Edit',
                    table   : 'edit'
                },
                fieldName   : 'field2'
            },
            'numberfield': {
                schema: {
                    cls     : 'Edit',
                    table   : 'edit'
                },
                fieldName   : 'field3'
            },
            'textarea': {
                schema: {
                    cls     : 'Edit',
                    table   : 'edit'
                },
                fieldName   : 'field4'
            },
            'textfield': {
                schema: {
                    cls     : 'Edit',
                    table   : 'edit'
                },
                fieldName   : 'field5'
            },
            'timefield': {
                schema: {
                    cls     : 'Edit',
                    table   : 'edit'
                },
                fieldName   : 'field6'
            },
            'triggerfield': {
                schema: {
                    cls     : 'Edit',
                    table   : 'edit'
                },
                fieldName   : 'field7'
            }
        },
        'MFTest/EditList': {
            'datefield': {
                schema: {
                    cls     : 'EditList',
                    table   : 'editlist'
                },
                fieldName   : 'field1'
            },
            'htmleditor': {
                schema: {
                    cls     : 'EditList',
                    table   : 'editlist'
                },
                fieldName   : 'field2'
            },
            'numberfield': {
                schema: {
                    cls     : 'EditList',
                    table   : 'editlist'
                },
                fieldName   : 'field3'
            },
            'textarea': {
                schema: {
                    cls     : 'EditList',
                    table   : 'editlist'
                },
                fieldName   : 'field4'
            },
            'textfield': {
                schema: {
                    cls     : 'EditList',
                    table   : 'editlist'
                },
                fieldName   : 'field5'
            },
            'timefield': {
                schema: {
                    cls     : 'EditList',
                    table   : 'editlist'
                },
                fieldName   : 'field6'
            },
            'triggerfield': {
                schema: {
                    cls     : 'EditList',
                    table   : 'editlist'
                },
                fieldName   : 'field7'
            }
        }
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
                // fieldsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/app/model/List.js'),
                regex   : replaceRegexWS([
                    "Ext.define(",
                    "    'MFTest.EditList.model.List' , {",
                    "        fields : [",
                    "            \"field1\" ,",
                    "        ]",
                    ");"
                ])
            }, {
                // columnsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/app/view/list/List.js'),
                regex   : replaceRegexWS([
                    "Ext.define(",
                    "    'MFTest.EditList.view.list.List' , {",
                    "        columns : [",
                    "        {",
                    "            text : 'field1' ,",
                    "            dataIndex : 'field1' ,",
                    "            flex : 1",
                    "        }",
                    "        ]",
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
                // fieldsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/app/model/List.js'),
                regex   : replaceRegexWS([
                    "Ext.define(",
                    "    'MFTest.EditList.model.List' , {",
                    "        fields : [",
                    "            \"field2\" ,",
                    "        ]",
                    ");"
                ])
            }, {
                // columnsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/app/view/list/List.js'),
                regex   : replaceRegexWS([
                    "Ext.define(",
                    "    'MFTest.EditList.view.list.List' , {",
                    "        columns : [",
                    "        {",
                    "            text : 'field2' ,",
                    "            dataIndex : 'field2' ,",
                    "            flex : 1",
                    "        }",
                    "        ]",
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
                // fieldsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/app/model/List.js'),
                regex   : replaceRegexWS([
                    "Ext.define(",
                    "    'MFTest.EditList.model.List' , {",
                    "        fields : [",
                    "            \"field3\" ,",
                    "        ]",
                    ");"
                ])
            }, {
                // columnsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/app/view/list/List.js'),
                regex   : replaceRegexWS([
                    "Ext.define(",
                    "    'MFTest.EditList.view.list.List' , {",
                    "        columns : [",
                    "        {",
                    "            text : 'field3' ,",
                    "            dataIndex : 'field3' ,",
                    "            flex : 1",
                    "        }",
                    "        ]",
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
                // fieldsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/app/model/List.js'),
                regex   : replaceRegexWS([
                    "Ext.define(",
                    "    'MFTest.EditList.model.List' , {",
                    "        fields : [",
                    "            \"field4\" ,",
                    "        ]",
                    ");"
                ])
            }, {
                // columnsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/app/view/list/List.js'),
                regex   : replaceRegexWS([
                    "Ext.define(",
                    "    'MFTest.EditList.view.list.List' , {",
                    "        columns : [",
                    "        {",
                    "            text : 'field4' ,",
                    "            dataIndex : 'field4' ,",
                    "            flex : 1",
                    "        }",
                    "        ]",
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
                // fieldsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/app/model/List.js'),
                regex   : replaceRegexWS([
                    "Ext.define(",
                    "    'MFTest.EditList.model.List' , {",
                    "        fields : [",
                    "            \"field5\" ,",
                    "        ]",
                    ");"
                ])
            }, {
                // columnsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/app/view/list/List.js'),
                regex   : replaceRegexWS([
                    "Ext.define(",
                    "    'MFTest.EditList.view.list.List' , {",
                    "        columns : [",
                    "        {",
                    "            text : 'field5' ,",
                    "            dataIndex : 'field5' ,",
                    "            flex : 1",
                    "        }",
                    "        ]",
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
                // fieldsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/app/model/List.js'),
                regex   : replaceRegexWS([
                    "Ext.define(",
                    "    'MFTest.EditList.model.List' , {",
                    "        fields : [",
                    "            \"field6\" ,",
                    "        ]",
                    ");"
                ])
            }, {
                // columnsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/app/view/list/List.js'),
                regex   : replaceRegexWS([
                    "Ext.define(",
                    "    'MFTest.EditList.view.list.List' , {",
                    "        columns : [",
                    "        {",
                    "            text : 'field6' ,",
                    "            dataIndex : 'field6' ,",
                    "            flex : 1",
                    "        }",
                    "        ]",
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
                // fieldsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/app/model/List.js'),
                regex   : replaceRegexWS([
                    "Ext.define(",
                    "    'MFTest.EditList.model.List' , {",
                    "        fields : [",
                    "            \"field7\" ,",
                    "        ]",
                    ");"
                ])
            }, {
                // columnsへのフィールド追加確認
                file    : path.join(targetPath, 'mods/MFTest/EditList/app/view/list/List.js'),
                regex   : replaceRegexWS([
                    "Ext.define(",
                    "    'MFTest.EditList.view.list.List' , {",
                    "        columns : [",
                    "        {",
                    "            text : 'field7' ,",
                    "            dataIndex : 'field7' ,",
                    "            flex : 1",
                    "        }",
                    "        ]",
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
                type    : 'MFTest/Edit',
                gen     : genAppendTestFn
            },
            'htmleditor': {
                cmd     : programPath + ' append htmleditor field2 MFTest/Edit',
                type    : 'MFTest/Edit',
                gen     : genAppendTestFn
            },
            'numberfield': {
                cmd     : programPath + ' append numberfield field3 MFTest/Edit',
                type    : 'MFTest/Edit',
                gen     : genAppendTestFn
            },
            'textarea': {
                cmd     : programPath + ' append textarea field4 MFTest/Edit',
                type    : 'MFTest/Edit',
                gen     : genAppendTestFn
            },
            'textfield': {
                cmd     : programPath + ' append textfield field5 MFTest/Edit',
                type    : 'MFTest/Edit',
                gen     : genAppendTestFn
            },
            'timefield': {
                cmd     : programPath + ' append timefield field6 MFTest/Edit',
                type    : 'MFTest/Edit',
                gen     : genAppendTestFn
            },
            'triggerfield': {
                cmd     : programPath + ' append triggerfield field7 MFTest/Edit',
                type    : 'MFTest/Edit',
                gen     : genAppendTestFn
            }
        },
        'remove fields for edit': {
            'datefield': {
                cmd     : programPath + ' remove field1 MFTest/Edit',
                type    : 'MFTest/Edit',
                gen     : genRemoveTestFn
            },
            'htmleditor': {
                cmd     : programPath + ' remove field2 MFTest/Edit',
                type    : 'MFTest/Edit',
                gen     : genRemoveTestFn
            },
            'numberfield': {
                cmd     : programPath + ' remove field3 MFTest/Edit',
                type    : 'MFTest/Edit',
                gen     : genRemoveTestFn
            },
            'textarea': {
                cmd     : programPath + ' remove field4 MFTest/Edit',
                type    : 'MFTest/Edit',
                gen     : genRemoveTestFn
            },
            'textfield': {
                cmd     : programPath + ' remove field5 MFTest/Edit',
                type    : 'MFTest/Edit',
                gen     : genRemoveTestFn
            },
            'timefield': {
                cmd     : programPath + ' remove field6 MFTest/Edit',
                type    : 'MFTest/Edit',
                gen     : genRemoveTestFn
            },
            'triggerfield': {
                cmd     : programPath + ' remove field7 MFTest/Edit',
                type    : 'MFTest/Edit',
                gen     : genRemoveTestFn
            }
        },
        'append fields for editlist': {
            'datefield': {
                cmd     : programPath + ' append datefield field1 MFTest/EditList',
                type    : 'MFTest/EditList',
                gen     : genAppendTestFn
            },
            'htmleditor': {
                cmd     : programPath + ' append htmleditor field2 MFTest/EditList',
                type    : 'MFTest/EditList',
                gen     : genAppendTestFn
            },
            'numberfield': {
                cmd     : programPath + ' append numberfield field3 MFTest/EditList',
                type    : 'MFTest/EditList',
                gen     : genAppendTestFn
            },
            'textarea': {
                cmd     : programPath + ' append textarea field4 MFTest/EditList',
                type    : 'MFTest/EditList',
                gen     : genAppendTestFn
            },
            'textfield': {
                cmd     : programPath + ' append textfield field5 MFTest/EditList',
                type    : 'MFTest/EditList',
                gen     : genAppendTestFn
            },
            'timefield': {
                cmd     : programPath + ' append timefield field6 MFTest/EditList',
                type    : 'MFTest/EditList',
                gen     : genAppendTestFn
            },
            'triggerfield': {
                cmd     : programPath + ' append triggerfield field7 MFTest/EditList',
                type    : 'MFTest/EditList',
                gen     : genAppendTestFn
            }
        },
        'remove fields for editlist': {
            'datefield': {
                cmd     : programPath + ' remove field1 MFTest/EditList',
                type    : 'MFTest/EditList',
                gen     : genRemoveTestFn
            },
            'htmleditor': {
                cmd     : programPath + ' remove field2 MFTest/EditList',
                type    : 'MFTest/EditList',
                gen     : genRemoveTestFn
            },
            'numberfield': {
                cmd     : programPath + ' remove field3 MFTest/EditList',
                type    : 'MFTest/EditList',
                gen     : genRemoveTestFn
            },
            'textarea': {
                cmd     : programPath + ' remove field4 MFTest/EditList',
                type    : 'MFTest/EditList',
                gen     : genRemoveTestFn
            },
            'textfield': {
                cmd     : programPath + ' remove field5 MFTest/EditList',
                type    : 'MFTest/EditList',
                gen     : genRemoveTestFn
            },
            'timefield': {
                cmd     : programPath + ' remove field6 MFTest/EditList',
                type    : 'MFTest/EditList',
                gen     : genRemoveTestFn
            },
            'triggerfield': {
                cmd     : programPath + ' remove field7 MFTest/EditList',
                type    : 'MFTest/EditList',
                gen     : genRemoveTestFn
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
                    execChildProcess(value.cmd, value.gen(value.type, fieldType, next));

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
