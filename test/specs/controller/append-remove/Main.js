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
        genTestFn, fieldTests, tests;


    // TODO: とりあえずテストから外すため、後で削除
    //decidedIt = it.skip;

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
        'MFTest/Edit': {
            'datefield': [{
                file    : path.join(targetPath, 'mods/MFTest/Edit/app/view/edit/Edit.js'),
                regex   : CLI.String.format([
                    "Ext\.define\({0}'MFTest\.Edit\.view\.edit\.Edit'{0},{0}{",
                    "{0}items{0}:{0}[",
                    "{0}{",
                    "{0}xtype{0}:{0}'datefield'{0},",
                    "{0}itemId{0}:{0}'field1'{0},",
                    "{0}labelAlign{0}:{0}'top'{0},",
                    "{0}name{0}:{0}'field1'{0},",
                    "{0}fieldLabel{0}:{0}'field1'{0},",
                    "{0}width{0}:{0}300",
                    "{0}}",
                    "{0}\);"
                ].join(""), "[\\s\\S]*?")
            }, {
                file    : path.join(targetPath, 'mods/MFTest/Edit/classes/Users.php'),
                regex   : CLI.String.format([
                    "class{0}MFTest_Edit_Users{0}extends{0}EditEdit{0}{",
                    "{0}public{0}\\$fields{0}={0}array\\(",
                    "{0}'field1'",
                    "{0}\\){0};",
                    "{0}}"
                ].join(""), "[\\s\\S]*?")
            }],
            'htmleditor': [{
                file    : path.join(targetPath, 'mods/MFTest/Edit/app/view/edit/Edit.js'),
                regex   : CLI.String.format([
                    "Ext\.define\({0}'MFTest\.Edit\.view\.edit\.Edit'{0},{0}{",
                    "{0}items{0}:{0}[",
                    "{0}{",
                    "{0}xtype{0}:{0}'htmleditor'{0},",
                    "{0}itemId{0}:{0}'field2'{0},",
                    "{0}labelAlign{0}:{0}'top'{0},",
                    "{0}name{0}:{0}'field2'{0},",
                    "{0}fieldLabel{0}:{0}'field2'{0},",
                    "{0}width{0}:{0}300",
                    "{0}}",
                    "{0}\);"
                ].join(""), "[\\s\\S]*?")
            }, {
                file    : path.join(targetPath, 'mods/MFTest/Edit/classes/Users.php'),
                regex   : CLI.String.format([
                    "class{0}MFTest_Edit_Users{0}extends{0}EditEdit{0}{",
                    "{0}public{0}\\$fields{0}={0}array\\(",
                    "{0}'field2'",
                    "{0}\\){0};",
                    "{0}}"
                ].join(""), "[\\s\\S]*?")
            }],
            'numberfield': [{
                file    : path.join(targetPath, 'mods/MFTest/Edit/app/view/edit/Edit.js'),
                regex   : CLI.String.format([
                    "Ext\.define\({0}'MFTest\.Edit\.view\.edit\.Edit'{0},{0}{",
                    "{0}items{0}:{0}[",
                    "{0}{",
                    "{0}xtype{0}:{0}'numberfield'{0},",
                    "{0}itemId{0}:{0}'field3'{0},",
                    "{0}labelAlign{0}:{0}'top'{0},",
                    "{0}name{0}:{0}'field3'{0},",
                    "{0}fieldLabel{0}:{0}'field3'{0},",
                    "{0}width{0}:{0}300",
                    "{0}}",
                    "{0}\);"
                ].join(""), "[\\s\\S]*?")
            }, {
                file    : path.join(targetPath, 'mods/MFTest/Edit/classes/Users.php'),
                regex   : CLI.String.format([
                    "class{0}MFTest_Edit_Users{0}extends{0}EditEdit{0}{",
                    "{0}public{0}\\$fields{0}={0}array\\(",
                    "{0}'field3'",
                    "{0}\\){0};",
                    "{0}}"
                ].join(""), "[\\s\\S]*?")
            }],
            'textarea': [{
                file    : path.join(targetPath, 'mods/MFTest/Edit/app/view/edit/Edit.js'),
                regex   : CLI.String.format([
                    "Ext\.define\({0}'MFTest\.Edit\.view\.edit\.Edit'{0},{0}{",
                    "{0}items{0}:{0}[",
                    "{0}{",
                    "{0}xtype{0}:{0}'textareafield'{0},",
                    "{0}itemId{0}:{0}'field4'{0},",
                    "{0}labelAlign{0}:{0}'top'{0},",
                    "{0}name{0}:{0}'field4'{0},",
                    "{0}fieldLabel{0}:{0}'field4'{0},",
                    "{0}width{0}:{0}300",
                    "{0}}",
                    "{0}\);"
                ].join(""), "[\\s\\S]*?")
            }, {
                file    : path.join(targetPath, 'mods/MFTest/Edit/classes/Users.php'),
                regex   : CLI.String.format([
                    "class{0}MFTest_Edit_Users{0}extends{0}EditEdit{0}{",
                    "{0}public{0}\\$fields{0}={0}array\\(",
                    "{0}'field4'",
                    "{0}\\){0};",
                    "{0}}"
                ].join(""), "[\\s\\S]*?")
            }],
            'textfield': [{
                file    : path.join(targetPath, 'mods/MFTest/Edit/app/view/edit/Edit.js'),
                regex   : CLI.String.format([
                    "Ext\.define\({0}'MFTest\.Edit\.view\.edit\.Edit'{0},{0}{",
                    "{0}items{0}:{0}[",
                    "{0}{",
                    "{0}xtype{0}:{0}'textfield'{0},",
                    "{0}itemId{0}:{0}'field5'{0},",
                    "{0}labelAlign{0}:{0}'top'{0},",
                    "{0}name{0}:{0}'field5'{0},",
                    "{0}fieldLabel{0}:{0}'field5'{0},",
                    "{0}width{0}:{0}300",
                    "{0}}",
                    "{0}\);"
                ].join(""), "[\\s\\S]*?")
            }, {
                file    : path.join(targetPath, 'mods/MFTest/Edit/classes/Users.php'),
                regex   : CLI.String.format([
                    "class{0}MFTest_Edit_Users{0}extends{0}EditEdit{0}{",
                    "{0}public{0}\\$fields{0}={0}array\\(",
                    "{0}'field5'",
                    "{0}\\){0};",
                    "{0}}"
                ].join(""), "[\\s\\S]*?")
            }],
            'timefield': [{
                file    : path.join(targetPath, 'mods/MFTest/Edit/app/view/edit/Edit.js'),
                regex   : CLI.String.format([
                    "Ext\.define\({0}'MFTest\.Edit\.view\.edit\.Edit'{0},{0}{",
                    "{0}items{0}:{0}[",
                    "{0}{",
                    "{0}xtype{0}:{0}'timefield'{0},",
                    "{0}itemId{0}:{0}'field6'{0},",
                    "{0}labelAlign{0}:{0}'top'{0},",
                    "{0}name{0}:{0}'field6'{0},",
                    "{0}fieldLabel{0}:{0}'field6'{0},",
                    "{0}width{0}:{0}300",
                    "{0}}",
                    "{0}\);"
                ].join(""), "[\\s\\S]*?")
            }, {
                file    : path.join(targetPath, 'mods/MFTest/Edit/classes/Users.php'),
                regex   : CLI.String.format([
                    "class{0}MFTest_Edit_Users{0}extends{0}EditEdit{0}{",
                    "{0}public{0}\\$fields{0}={0}array\\(",
                    "{0}'field6'",
                    "{0}\\){0};",
                    "{0}}"
                ].join(""), "[\\s\\S]*?")
            }],
            'triggerfield': [{
                file    : path.join(targetPath, 'mods/MFTest/Edit/app/view/edit/Edit.js'),
                regex   : CLI.String.format([
                    "Ext\.define\({0}'MFTest\.Edit\.view\.edit\.Edit'{0},{0}{",
                    "{0}items{0}:{0}[",
                    "{0}{",
                    "{0}xtype{0}:{0}'triggerfield'{0},",
                    "{0}itemId{0}:{0}'field7'{0},",
                    "{0}labelAlign{0}:{0}'top'{0},",
                    "{0}name{0}:{0}'field7'{0},",
                    "{0}fieldLabel{0}:{0}'field7'{0},",
                    "{0}width{0}:{0}300",
                    "{0}}",
                    "{0}\);"
                ].join(""), "[\\s\\S]*?")
            }, {
                file    : path.join(targetPath, 'mods/MFTest/Edit/classes/Users.php'),
                regex   : CLI.String.format([
                    "class{0}MFTest_Edit_Users{0}extends{0}EditEdit{0}{",
                    "{0}public{0}\\$fields{0}={0}array\\(",
                    "{0}'field7'",
                    "{0}\\){0};",
                    "{0}}"
                ].join(""), "[\\s\\S]*?")
            }]
        }
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
        }
    };

    // {{{ setup for append test

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
