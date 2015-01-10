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
        decidedIt   = ((!cfg || !cfg.releasesUrl || !cfg.accessToken) ? it.skip : it);

        // TODO: とりあえずテストから外すため、後で削除
        // decidedIt = it.skip;

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
    // {{{ append fields for edit

    describe("append fields for edit", function() {

        // {{{ datefield

        decidedIt("datefield", function(next) {

            // 作業ディレクトリへ移動
            process.chdir(targetPath);

            execChildProcess(programPath + ' append datefield field1 MFTest/Edit', function(err, stdout, stderr) {

                assert.equal(err, null);
                assert.equal(stderr, '');

                assert.ok(removeComment(fs.readFileSync(path.join(targetPath, 'mods/MFTest/Edit/app/view/edit/Edit.js')).toString()).match(new RegExp(CLI.String.format([
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
                ].join(""), "[\\s\\S]*?"))));

                assert.ok(removeComment(fs.readFileSync(path.join(targetPath, 'mods/MFTest/Edit/classes/Users.php')).toString()).match(new RegExp(CLI.String.format([
                    "class{0}MFTest_Edit_Users{0}extends{0}EditEdit{0}{",
                    "{0}public{0}\\$fields{0}={0}array\\(",
                    "{0}'field1'",
                    "{0}\\){0};",
                    "{0}}"
                ].join(""), "[\\s\\S]*?"))));

                // カレントディレクトリ復元
                process.chdir(currentPath);

                // コールバック実行
                next();

            });

        });

        // }}}
        // {{{ htmleditor

        decidedIt("htmleditor", function(next) {

            // 作業ディレクトリへ移動
            process.chdir(targetPath);

            execChildProcess(programPath + ' append htmleditor field2 MFTest/Edit', function(err, stdout, stderr) {

                assert.equal(err, null);
                assert.equal(stderr, '');

                assert.ok(removeComment(fs.readFileSync(path.join(targetPath, 'mods/MFTest/Edit/app/view/edit/Edit.js')).toString()).match(new RegExp(CLI.String.format([
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
                ].join(""), "[\\s\\S]*?"))));

                assert.ok(removeComment(fs.readFileSync(path.join(targetPath, 'mods/MFTest/Edit/classes/Users.php')).toString()).match(new RegExp(CLI.String.format([
                    "class{0}MFTest_Edit_Users{0}extends{0}EditEdit{0}{",
                    "{0}public{0}\\$fields{0}={0}array\\(",
                    "{0}'field2'",
                    "{0}\\){0};",
                    "{0}}"
                ].join(""), "[\\s\\S]*?"))));

                // カレントディレクトリ復元
                process.chdir(currentPath);

                // コールバック実行
                next();

            });

        });

        // }}}
        // {{{ numberfield

        decidedIt("numberfield", function(next) {

            // 作業ディレクトリへ移動
            process.chdir(targetPath);

            execChildProcess(programPath + ' append numberfield field3 MFTest/Edit', function(err, stdout, stderr) {

                assert.equal(err, null);
                assert.equal(stderr, '');

                assert.ok(removeComment(fs.readFileSync(path.join(targetPath, 'mods/MFTest/Edit/app/view/edit/Edit.js')).toString()).match(new RegExp(CLI.String.format([
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
                ].join(""), "[\\s\\S]*?"))));

                assert.ok(removeComment(fs.readFileSync(path.join(targetPath, 'mods/MFTest/Edit/classes/Users.php')).toString()).match(new RegExp(CLI.String.format([
                    "class{0}MFTest_Edit_Users{0}extends{0}EditEdit{0}{",
                    "{0}public{0}\\$fields{0}={0}array\\(",
                    "{0}'field3'",
                    "{0}\\){0};",
                    "{0}}"
                ].join(""), "[\\s\\S]*?"))));

                // カレントディレクトリ復元
                process.chdir(currentPath);

                // コールバック実行
                next();

            });

        });

        // }}}
        // {{{ textarea

        decidedIt("textarea", function(next) {

            // 作業ディレクトリへ移動
            process.chdir(targetPath);

            execChildProcess(programPath + ' append textarea field4 MFTest/Edit', function(err, stdout, stderr) {

                assert.equal(err, null);
                assert.equal(stderr, '');

                assert.ok(removeComment(fs.readFileSync(path.join(targetPath, 'mods/MFTest/Edit/app/view/edit/Edit.js')).toString()).match(new RegExp(CLI.String.format([
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
                ].join(""), "[\\s\\S]*?"))));

                assert.ok(removeComment(fs.readFileSync(path.join(targetPath, 'mods/MFTest/Edit/classes/Users.php')).toString()).match(new RegExp(CLI.String.format([
                    "class{0}MFTest_Edit_Users{0}extends{0}EditEdit{0}{",
                    "{0}public{0}\\$fields{0}={0}array\\(",
                    "{0}'field4'",
                    "{0}\\){0};",
                    "{0}}"
                ].join(""), "[\\s\\S]*?"))));

                // カレントディレクトリ復元
                process.chdir(currentPath);

                // コールバック実行
                next();

            });

        });

        // }}}
        // {{{ textfield

        decidedIt("textfield", function(next) {

            // 作業ディレクトリへ移動
            process.chdir(targetPath);

            execChildProcess(programPath + ' append textfield field5 MFTest/Edit', function(err, stdout, stderr) {

                assert.equal(err, null);
                assert.equal(stderr, '');

                assert.ok(removeComment(fs.readFileSync(path.join(targetPath, 'mods/MFTest/Edit/app/view/edit/Edit.js')).toString()).match(new RegExp(CLI.String.format([
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
                ].join(""), "[\\s\\S]*?"))));

                assert.ok(removeComment(fs.readFileSync(path.join(targetPath, 'mods/MFTest/Edit/classes/Users.php')).toString()).match(new RegExp(CLI.String.format([
                    "class{0}MFTest_Edit_Users{0}extends{0}EditEdit{0}{",
                    "{0}public{0}\\$fields{0}={0}array\\(",
                    "{0}'field5'",
                    "{0}\\){0};",
                    "{0}}"
                ].join(""), "[\\s\\S]*?"))));

                // カレントディレクトリ復元
                process.chdir(currentPath);

                // コールバック実行
                next();

            });

        });

        // }}}
        // {{{ timefield

        decidedIt("timefield", function(next) {

            // 作業ディレクトリへ移動
            process.chdir(targetPath);

            execChildProcess(programPath + ' append timefield field6 MFTest/Edit', function(err, stdout, stderr) {

                assert.equal(err, null);
                assert.equal(stderr, '');

                assert.ok(removeComment(fs.readFileSync(path.join(targetPath, 'mods/MFTest/Edit/app/view/edit/Edit.js')).toString()).match(new RegExp(CLI.String.format([
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
                ].join(""), "[\\s\\S]*?"))));

                assert.ok(removeComment(fs.readFileSync(path.join(targetPath, 'mods/MFTest/Edit/classes/Users.php')).toString()).match(new RegExp(CLI.String.format([
                    "class{0}MFTest_Edit_Users{0}extends{0}EditEdit{0}{",
                    "{0}public{0}\\$fields{0}={0}array\\(",
                    "{0}'field6'",
                    "{0}\\){0};",
                    "{0}}"
                ].join(""), "[\\s\\S]*?"))));

                // カレントディレクトリ復元
                process.chdir(currentPath);

                // コールバック実行
                next();

            });

        });

        // }}}
        // {{{ triggerfield

        decidedIt("triggerfield", function(next) {

            // 作業ディレクトリへ移動
            process.chdir(targetPath);

            execChildProcess(programPath + ' append triggerfield field7 MFTest/Edit', function(err, stdout, stderr) {

                assert.equal(err, null);
                assert.equal(stderr, '');

                assert.ok(removeComment(fs.readFileSync(path.join(targetPath, 'mods/MFTest/Edit/app/view/edit/Edit.js')).toString()).match(new RegExp(CLI.String.format([
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
                ].join(""), "[\\s\\S]*?"))));

                assert.ok(removeComment(fs.readFileSync(path.join(targetPath, 'mods/MFTest/Edit/classes/Users.php')).toString()).match(new RegExp(CLI.String.format([
                    "class{0}MFTest_Edit_Users{0}extends{0}EditEdit{0}{",
                    "{0}public{0}\\$fields{0}={0}array\\(",
                    "{0}'field7'",
                    "{0}\\){0};",
                    "{0}}"
                ].join(""), "[\\s\\S]*?"))));

                // カレントディレクトリ復元
                process.chdir(currentPath);

                // コールバック実行
                next();

            });

        });

        // }}}

    });

    // }}}
    // {{{ append fields for editlist

    describe("append fields for editlist", function() {



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
