/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.alter.ClientScript

CLI.define('MicroField.module.alter.ClientScript', {

    // {{{ extend

    extend: 'MicroField.module.alter.Abstract',

    // }}}
    // {{{ config

    config: {

        // {{{ scriptName

        scriptName: null,

        // }}}
        // {{{ script

        script: null,

        // }}}
        // {{{ ns

        ns: null,

        // }}}
        // {{{ name

        name: null,

        // }}}
        // {{{ itemId

        itemId: null,

        // }}}
        // {{{ xtype

        xtype: null

        // }}}

    },

    // }}}
    // {{{ init

    init: function(callback) {

        var me      = this,
            fs      = require('fs'),
            path    = require('path');

        target = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), 'mods', me.getNs(), me.getName(), me.getScriptName()));

        // ファイル読み込み
        fs.readFile(target, function(err, data) {

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

        var me      = this,
            f       = CLI.String.format,
            fs      = require('fs'),
            path    = require('path'),
            items   = itemsInfo.items,
            src, m, code, target;

        // ソースコード取得
        src = me.getScript();


        var items = items.join(', ');
        items = items.substring(0, items.length-1);
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

        target = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), 'mods', me.getNs(), me.getName(), me.getScriptName()));

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

        var me      = this,
            f       = CLI.String.format,
            items   = o.items,
            indent  = o.forwardItemsIndent,
            code;

        code = f([
            '{',
            '{0}xtype       : \'{2}\',',
            '{0}itemId      : \'{1}\',',
            '{0}labelAlign  : \'{3}\',',
            '{0}name        : \'{1}\',',
            '{0}fieldLabel  : \'{1}\',',
            '{0}width       : {4}',
            '}'
        ].join("\n"),

            // インデント
            indent + indent,

            // itemId
            me.getItemId(),

            // xtype
            me.getXtype(),

            // labelAlign
            'top',

            // width
            300

        );

        items.push(code);

//        console.log(items.join(', '));

        return o;

    },

    // }}}
    // {{{ append

    append: function(callback) {

        var me      = this,
            async   = require('async'),
            fs      = require('fs'),
            path    = require('path'),
            skip    = false,
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

        });        callback();
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
