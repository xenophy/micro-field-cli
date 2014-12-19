/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.alter.ClientScript

CLI.define('MicroField.module.alter.ClientScript', {

    // {{{ extend

    extend: 'MicroField.module.alter.Abstract',

    // }}}
    // {{{ append

    append: function(callback) {

        // TODO: コンフィグオプションにクライアントサイドのフィールド一覧を設定して、取得できるようにする

        // TODO: クライアントサイドファイル名をもらう

        // TODO: 正規表現で、ソースコード置換/出力

        callback();
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
