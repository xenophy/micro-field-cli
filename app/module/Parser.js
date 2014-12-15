/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.Parser

CLI.define('MicroField.module.Parser', {

    // {{{ singleton

    singleton: true,

    // }}}
    // {{{ removeComment

    removeComment: function(src) {

        // ソースコードコメント、スペース、改行削除
        src = src.replace(/\/\/.*?\n/g, '');
        src = src.split("\n");
        CLI.iterate(src, function(line, i) {
            src[i] = line.replace(/^[\s　]+|[\s　]+$/g, '');
        });
        src = src.join('');
        src = src.replace(/\/\*.+?\*\//g, '');

        return src;

    },

    // }}}
    // {{{ getClassConfig

    getClassConfig: function(src) {

        var ExtDefine   = 'Ext.define',
            skip        = 0,
            begin, tmp;

        // "Ext.define" を検索
        begin = src.indexOf(ExtDefine);

        if (begin === -1) {
            return false;
        }

        tmp = src.substr(begin + ExtDefine.length);

        // "(" から ")" までを抽出
        begin = tmp.indexOf('(');

        if (begin === -1) {
            return false;
        }

        tmp = tmp.substr(begin);


        // 対応する ")" を検索
        for (i=0; i<tmp.length; i++) {

            var c = tmp[i];

            if (c === '(') {
                skip++;
            }

            if (c === ')' && skip === 1) {
                end = i;
                break;
            }

            if (c === ')') {
                skip--;
            }

        }

        tmp = tmp.substr(begin + 1, end - 1);
        tmp = '[' + tmp + ']';

        var UglifyJS = require("uglify-jS");

        // 出力ストリーム作成
        stream = UglifyJS.OutputStream({
            quote_keys: true
        });

        // 解析
        ast = UglifyJS.parse(tmp);

        // 出力
        ast.print(stream);

        tmp = stream.toString();
        tmp = tmp.substr(0, tmp.length - 1);

        // JSON解析
        tmp = CLI.decode(tmp, true);

        return tmp[1];

    }

    // }}}

});

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
