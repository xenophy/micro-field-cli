/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.alter.editlist.ClientScript

CLI.define('MicroField.module.alter.editlist.ClientScript', {

    // {{{ extend

    extend: 'MicroField.module.alter.ClientScript',

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
    // {{{ removeModel

    removeModel: function(callback) {

        var me      = this,
            model   = me.getModel(),
            fields  = me.getModel().fields,
            pos;

        CLI.iterate(fields, function(field, num) {

            var name;

            if (CLI.isObject(field)) {

                name = field.name;

            } else {

                name = field;

            }

            if (me.getFieldName() === name) {
                pos = num;
            }

        });

        if (CLI.isNumber(pos)) {
            fields.splice(pos, 1);
            model.fields = fields;
        }

        me.setModel(model, callback);

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
    // {{{ setColumns

    setColumns: function(info, callback) {

        var me          = this,
            fs          = require('fs'),
            path        = require('path'),
            f           = CLI.String.format,
            appdir      = MicroField.app.getApplicationDir(),
            ns          = me.getNs(),
            name        = me.getName(),
            script      = me.getFilenames().columns,
            columns     = info.columns,
            remove      = info.remove,
            src, m, code, target;

        // ソースコード取得
        src = me.getColumnsScript();

        var columns = columns.join(', ');

        columns  = columns.substring(0, columns.length-1);

        if (remove) {
            columns += '}\n' + info.forwardIndent + ']';
        } else {
            columns += info.forwardIndent;
            columns += '    }\n' + info.forwardIndent + ']';
        }

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
    // {{{ removeColumn

    removeColumn: function(callback) {

        var me      = this,
            columns = me.getColumns(),
            tmp     = me.getColumns().columns,
            pos;

        // 削除対象検索
        CLI.iterate(tmp, function(field, num) {

            var regex = new RegExp("dataIndex(.*):(.*)(['|\"]?)" + me.getFieldName() + "(['|\"]?)");
            var m = field.match(regex);

            if (m !== null) {
                pos = num;
            }

        });

        // 対象削除
        if (CLI.isNumber(pos)) {
            tmp.splice(pos, 1);
        }
        columns.columns = tmp;
        columns.remove = true;

        // 反映
        me.setColumns(columns, callback);


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
                me.setColumns(me.addColumns(me.getColumns()), next);
            }

        ];

        // 非同期処理実行
        async.series(fns, function() {

            // コールバック実行
            callback();

        });

    },

    // }}}
    // {{{ remove

    remove: function(callback) {

        var me      = this,
            async   = require('async'),
            fns;

        fns = [

            // 初期化
            function(next) {
                me.init(next);
            },

            // アイテム削除
            function(next) {
                me.removeItem(next)
            },

            // モデル削除
            function(next) {
                me.removeModel(next)
            },

            // カラム削除
            function(next) {
                me.removeColumn(next)
            }

        ];

        // 非同期処理実行
        async.series(fns, function() {

            // コールバック実行
            callback();

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
