/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.mixin.Output

CLI.define('MicroField.mixin.Output', {

    // {{{ outputList

    outputList: function(list, options) {

        var me          = this,
            f           = CLI.String.format,
            bold        = me.ansi.bold,
            underline   = me.ansi.underline,
            blue        = me.colors.blue,
            green       = me.colors.green,
            text        = '',
            line, tagColor;

        // オプション初期化
        options = options || {};

        // タグ色設定
        if (options.tagColor) {
            tagColor = options.tagColor;
        } else {
            tagColor = blue;
        }

        // ライン出力関数
        line = function(tag, text) {
            tag += CLI.String.repeat(' ', 16 - tag.length);
            return f('  * {0}: {1}', bold(tagColor(tag)), text) + "\n";
        };

        // MicroField CLI タイトル
        text += MicroField.app.getTitle();
        text += "\n";

        // リスト内容作成
        var active = [];
        CLI.iterate(list, function(item, num, list) {

            var config = me['get' + item]();

            if (config.length > 0) {
                active.push(item);
            }
        });

        CLI.iterate(active, function(item, num, list) {

            text += underline(item) + "\n";

            CLI.iterate(me['get' + item](), function(item) {
                text += line(item.tag, item.text);
            });

            if (num < active.length - 1) {
                text += "\n";
            }
        });

        // 出力
        MicroField.app.log.write(text);

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
