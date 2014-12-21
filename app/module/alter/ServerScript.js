/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.alter.ServerScript

CLI.define('MicroField.module.alter.ServerScript', {

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
            script      = me.getFilenames().serverscript;

        target = path.join(appdir, 'mods', ns, name, script);

        // ファイル読み込み
        fs.readFile(target, function(err, data) {

            // ファイル保存
            me.setScript(data.toString());

            // コールバック
            callback();

        });

    },

    // }}}
    // {{{ getFields

    getFields: function() {

        var me  = this,
            rmc = MicroField.app.removeComment,
            m;

        // フィールド抽出正規表現によるマッチ実行
        m = rmc(me.getScript()).match(/public(.*)\$fields(.?)=(.?)array(.?)\(([\s\S]*?)\)(.?);/);

        // TODO: エラー処理

        // JSON解析/設定
        return CLI.decode('[' + m[5].split("'").join('"') + ']', true);

    },

    // }}}
    // {{{ setFields

    setFields: function(fields, callback) {

        var me          = this,
            fs          = require('fs'),
            path        = require('path'),
            f           = CLI.String.format,
            appdir      = MicroField.app.getApplicationDir(),
            ns          = me.getNs(),
            name        = me.getName(),
            script      = me.getFilenames().serverscript,
            src, m, code, target;

        // ソースコード取得
        src = me.getScript();

        // ソースコード内のフィールド周り文字列を解析
        m = src.match(/(.*)public(.*)\$fields(.?)=(.?)array(.?)\([\s\S]*?\);/);

        // TODO: エラー処理

        // 埋め込みコード生成
        code = f(
            "{0}public{1}$fields{2}={3}array{4}(\n{5}{0});",
            m[1],   // publicの前のインデント
            m[2],   // publicの後ろのスペーサー
            m[3],   // $fieldsの後ろのスペーサー
            m[4],   // arrayの前のスペーサー
            m[5],   // arrayの後ろのスペーサー
            CLI.Array.map(fields, function(item, index) {

                // m[1] publicの前のインデント
                item = m[1] + m[1] + "'" + item + "'";

                if (index < (fields.length - 1)) {
                    item += ',';
                }

                item += "\n";

                return item;

            }).join('')
        );

        // コード埋め込み
        src = src.replace(/(.*)public(.*)\$fields(.?)=(.?)array(.?)\([\s\S]*?\);/, code);

        target = path.join(appdir, 'mods', ns, name, script);

        // ファイル書き込み
        fs.writeFile(target, src, function(err) {

            // TODO: エラー処理

            // コールバック
            callback();
        });

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

            // フィールド追加
            function(next) {

                var tmp = me.getFields();

                tmp.push(me.getFieldName());
                me.setFields(tmp, next);

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
