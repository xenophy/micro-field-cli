/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.alter.editlist.ClientScript

CLI.define('MicroField.module.alter.editlist.ClientScript', {

    // {{{ extend

    extend: 'MicroField.module.alter.editlist.Abstract',

    // }}}
    // {{{ config

    config: {

        // {{{ itemsScript

        itemsScript     : '',

        // }}}
        // {{{ modelScript

        modelScript     : '',

        // }}}
        // {{{ columnsScript

        columnsScript   : ''

        // }}}

    },

    // }}}
    // {{{ init

    init: function(callback) {

        var me              = this,
            async           = require('async'),
            fs              = require('fs'),
            path            = require('path'),
            appdir          = MicroField.app.getApplicationDir(),
            ns              = me.getNs(),
            name            = me.getName(),
            itemsScript     = me.getFilenames().items,
            modelScript     = me.getFilenames().model,
            columnsScript   = me.getFilenames().columns,
            fns;

        fns = [

            // itemsスクリプト読み込み
            function(next) {

                // ファイル読み込み
                fs.readFile(path.join(appdir, 'mods', ns, name, itemsScript), function(err, data) {

                    // TODO: エラー処理

                    // ファイル保存
                    me.setItemsScript(data.toString());

                    // コールバック
                    next();

                });

            },

            // modelScriptスクリプト読み込み
            function(next) {

                // ファイル読み込み
                fs.readFile(path.join(appdir, 'mods', ns, name, modelScript), function(err, data) {

                    // TODO: エラー処理

                    // ファイル保存
                    me.setModelScript(data.toString());

                    // コールバック
                    next();

                });

            },



            // columnsScriptスクリプト読み込み
            function(next) {

                // ファイル読み込み
                fs.readFile(path.join(appdir, 'mods', ns, name, columnsScript), function(err, data) {

                    // TODO: エラー処理

                    // ファイル保存
                    me.setColumnsScript(data.toString());

                    // コールバック
                    next();

                });

            },

        ];

        // 非同期処理実行
        async.series(fns, function() {

            // コールバック実行
            callback();

        });

    },

    // }}}
    // {{{ getItems

    getItems: function() {

        var me      = this,
            cnt     = 0,
            rec     = false,
            tmp     = '',
            items   = [],
            m, code;

        // アイテム抽出正規表現によるマッチ実行
        m = me.getItemsScript().match(/(.*)items(.*):(.*)\[([\s\S]*?)\]/);

        // TODO:エラー処理

        code = m[4];

        // columns解析

        for (var i=0; i<code.length; i++) {

            var c = code[i];

            if (c === '{') {

                if (cnt === 0) {
                    tmp = '';
                    rec = true;
                }

                cnt++;
            }

            if (rec) {
                tmp += c;
            }

            if (c === '}') {

                cnt--;

                if (cnt === 0) {
                    items.push(tmp);
                    rec = false;
                }
            }

        }

        return {

            // items前のインデント
            forwardItemsIndent  : m[1],

            // items後のホワイトスペース
            backItemsWS         : m[2],

            // :後のホワイトスペース
            backColonWS         : m[3],

            // items内容
            items               : items

        };

    },

    // }}}
    // {{{ setItems

    setItems: function(itemsInfo, callback) {

        var me          = this,
            fs          = require('fs'),
            path        = require('path'),
            f           = CLI.String.format,
            appdir      = MicroField.app.getApplicationDir(),
            ns          = me.getNs(),
            name        = me.getName(),
            script      = me.getFilenames().items,
            items       = itemsInfo.items,
            src, m, code, target;

        // ソースコード取得
        src = me.getItemsScript();

        var items = items.join(', ');

        items  = items.substring(0, items.length-1);
        items += itemsInfo.forwardItemsIndent;
        items += '    }\n' + itemsInfo.forwardItemsIndent + ']';

        // 埋め込みコード生成
        code = f(
            "{0}items{1}:{2}[\n{0}    {3}",
            itemsInfo.forwardItemsIndent,
            itemsInfo.backItemsWS,
            itemsInfo.backColonWS,
            items
        );

        // コード埋め込み
        src = src.replace(/(.*)items(.*):(.*)\[([\s\S]*?)\]/, code);

        target = path.join(appdir, 'mods', ns, name, script);

        // ファイル書き込み
        fs.writeFile(target, src, function(err) {

            // TODO: エラー処理

            // コールバック
            callback();
        });

    },

    // }}}
    // {{{ addItem

    addItem: function(o) {

        var me          = this,
            f           = CLI.String.format,
            items       = o.items,
            indent      = o.forwardItemsIndent,
            fieldType   = me.getFieldType(),
            classes     = me.getClasses(),
            code;

        // テンプレート情報クラス生成
        tplCls = CLI.create(f('MicroField.module.append.{0}.{1}', me.getTplType().toLowerCase(), classes[fieldType]), {});

        // アイテム追加
        items.push(tplCls.getClientItemCode(indent + indent, {
            xtype       : tplCls.getXtype(),
            itemId      : me.getFieldName(),
            labelAlign  : 'top',
            name        : me.getFieldName(),
            fieldLabel  : me.getFieldName(),
            width       : 300
        }));

        return o;

    },

    // }}}
    // {{{ getModel

    getModel: function() {

        var me      = this,
            rmc     = MicroField.app.removeComment,
            fields  = [],
            m, code;

        // アイテム抽出正規表現によるマッチ実行
        m = me.getModelScript().match(/(.*)fields(.*):(.*)\[([\s\S]*?)\]/);

        // TODO:エラー処理

        code = rmc(m[4]);

        fields = eval('[' + code + ']');

        return {

            // fields前のインデント
            forwardIndent   : m[1],

            // fields後のホワイトスペース
            backWS          : m[2],

            // :後のホワイトスペース
            backColonWS     : m[3],

            // fields内容
            fields          : fields

        };

    },

    // }}}
    // {{{ setModel

    setModel: function(info, callback) {

        var me          = this,
            fs          = require('fs'),
            path        = require('path'),
            f           = CLI.String.format,
            appdir      = MicroField.app.getApplicationDir(),
            ns          = me.getNs(),
            name        = me.getName(),
            script      = me.getFilenames().model,
            fields      = info.fields,
            src, m, code, target;

        // ソースコード取得
        src = me.getModelScript();

        var code = '';

        CLI.iterate(fields, function(field, i) {

            if (i > 0) {
                code += ",\n";
            }

            code += info.forwardIndent + info.forwardIndent;

            if (CLI.isObject(field)) {

                code += CLI.encode(field);

            } else {

                code += '"' + field + '"';

            }

        });

        code+= "\n";
        code = info.forwardIndent + 'fields: [' + "\n" + code;
        code = code + info.forwardIndent + "]"

        // コード埋め込み
        src = src.replace(/(.*)fields(.*):(.*)\[([\s\S]*?)\]/, code);

        target = path.join(appdir, 'mods', ns, name, script);

        // ファイル書き込み
        fs.writeFile(target, src, function(err) {

            // TODO: エラー処理

            // コールバック
            callback();
        });

    },

    // }}}
    // {{{ addModel

    addModel: function(o) {

        var me          = this,
            f           = CLI.String.format,
            fields      = o.fields,
            indent      = o.forwardIndent,
            fieldType   = me.getFieldType(),
            classes     = me.getClasses(),
            code;

        // テンプレート情報クラス生成
        tplCls = CLI.create(f('MicroField.module.append.{0}.{1}', me.getTplType().toLowerCase(), classes[fieldType]), {});

        var index = CLI.Array.indexOf(fields, 'modified');

        // TODO: エラー処理:index

        // フィールド追加
        CLI.Array.insert(fields, index, tplCls.getClientModelCode(indent + indent, {
            itemId : me.getFieldName()
        }));

        return o;

    },

    // }}}
    // {{{ getColumns

    getColumns: function() {

        var me      = this,
            cnt     = 0,
            rec     = false,
            tmp     = '',
            columns = [],
            m, code;

        // アイテム抽出正規表現によるマッチ実行
        m = me.getColumnsScript().match(/(.*)columns(.*):(.*)\[([\s\S]*?)\]/);

        // TODO:エラー処理

        code = m[4];

        // columns解析

        for (var i=0; i<code.length; i++) {

            var c = code[i];

            if (c === '{') {

                if (cnt === 0) {
                    tmp = '';
                    rec = true;
                }

                cnt++;
            }

            if (rec) {
                tmp += c;
            }

            if (c === '}') {

                cnt--;

                if (cnt === 0) {
                    columns.push(tmp);
                    rec = false;
                }
            }

        }

        return {

            // columns前のインデント
            forwardIndent   : m[1],

            // columns後のホワイトスペース
            backWS          : m[2],

            // :後のホワイトスペース
            backColonWS     : m[3],

            // columns内容
            columns         : columns

        };

    },

    // }}}
    // {{{ setColmns

    setColmns: function(info, callback) {

        var me          = this,
            fs          = require('fs'),
            path        = require('path'),
            f           = CLI.String.format,
            appdir      = MicroField.app.getApplicationDir(),
            ns          = me.getNs(),
            name        = me.getName(),
            script      = me.getFilenames().columns,
            columns     = info.columns,
            src, m, code, target;

        // ソースコード取得
        src = me.getColumnsScript();

        var columns = columns.join(', ');

        columns  = columns.substring(0, columns.length-1);
        columns += info.forwardIndent;
        columns += '    }\n' + info.forwardIndent + ']';

        // 埋め込みコード生成
        code = f(
            "{0}columns{1}:{2}[\n{0}    {3}",
            info.forwardIndent,
            info.backWS,
            info.backColonWS,
            columns
        );

        // コード埋め込み
        src = src.replace(/(.*)columns(.*):(.*)\[([\s\S]*?)\]/, code);

        target = path.join(appdir, 'mods', ns, name, script);

        // ファイル書き込み
        fs.writeFile(target, src, function(err) {

            // TODO: エラー処理

            // コールバック
            callback();
        });

    },

    // }}}
    // {{{ addColumns

    addColumns: function(o) {

        var me          = this,
            f           = CLI.String.format,
            columns     = o.columns,
            indent      = o.forwardIndent,
            fieldType   = me.getFieldType(),
            classes     = me.getClasses(),
            code;

        // テンプレート情報クラス生成
        tplCls = CLI.create(f('MicroField.module.append.{0}.{1}', me.getTplType().toLowerCase(), classes[fieldType]), {});

        // アイテム追加
        columns.push(tplCls.getClientColumnsCode(indent + indent + indent, {
            itemId  : me.getFieldName(),
            flex    : 1
        }));

        return o;

    },

    // }}}
    // {{{ append

    append: function(callback) {

        var me      = this,
            async   = require('async'),
            fns;

        fns = [

            // 初期化
            function(next) {

                // 初期化
                me.init(next);

            },

            // アイテム追加
            function(next) {

                me.setItems(me.addItem(me.getItems()), next);

            },

            // モデル追加
            function(next) {

                me.setModel(me.addModel(me.getModel()), next);

            },

            // カラム追加
            function(next) {

                me.setColmns(me.addColumns(me.getColumns()), next);

            }

        ];

        // 非同期処理実行
        async.series(fns, function() {

            // コールバック実行
            callback();

        });

    },

    // }}}
    // {{{ duplicatecheck

    duplicatecheck: function(callback) {

        var me          = this,
            async       = require('async'),
            path        = require('path'),
            f           = CLI.String.format,
            appdir      = MicroField.app.getApplicationDir(),
            ns          = me.getNs(),
            name        = me.getName(),
            script      = me.getFilenames().items,
            exists      = false,
            bold        = me.ansi.bold,
            fns;

        fns = [

            // 初期化
            function(next) {

                // 初期化
                me.init(next);

            },

            // フィールド重複チェック
            function(next) {

                var text = me.getItems().items.join(",").split("'").join('"');

                // TODO: JSコードの排除
                // itemIdだけの抽出
                text = text.replace(/(.*)fieldLabel(.*):(.*)(,*)/, '');

                CLI.iterate(eval('[' + text + ']'), function(item) {

                    if (exists) {
                        return;
                    }

                    if (item.name === me.getFieldName()) {

                        exists = true;

                        MicroField.app.log.error(f(
                            '"{0}" already exists in {1}.',
                            bold(me.getFieldName()),
                            path.join(appdir, 'mods', ns, name, script)
                        ));
                    }

                });

                next();

            }

        ];

        // 非同期処理実行
        async.series(fns, function() {

            // コールバック実行
            callback(exists);

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
