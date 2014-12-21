/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.alter.ClientScript

CLI.define('MicroField.module.alter.ClientScript', {

    // {{{ extend

    extend: 'MicroField.module.alter.Abstract',

    // }}}
    // {{{ config

    config: {

        // {{{ script

        script: null

        // }}}

    },

    // }}}
    // {{{ init

    init: function(callback) {

        var me          = this,
            fs          = require('fs'),
            path        = require('path'),
            appdir      = MicroField.app.getApplicationDir(),
            ns          = me.getNs(),
            name        = me.getName(),
            script      = me.getFilenames().items;

        target = path.join(appdir, 'mods', ns, name, script);

        // ファイル読み込み
        fs.readFile(target, function(err, data) {

            // TODO: エラー処理

            // ファイル保存
            me.setScript(data.toString());

            // コールバック
            callback();

        });

    },

    // }}}
    // {{{ getItems

    getItems: function() {

        var me      = this,
            parser  = MicroField.module.Parser,
            cnt     = 0,
            rec     = false,
            tmp     = '',
            items   = [],
            m, code;

        // アイテム抽出正規表現によるマッチ実行
        m = me.getScript().match(/(.*)items(.*):(.*)\[([\s\S]*?)\]/);

        // エラー処理

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
        src = me.getScript();

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
