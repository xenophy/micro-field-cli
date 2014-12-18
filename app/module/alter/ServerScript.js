/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.alter.ServerScript

CLI.define('MicroField.module.alter.ServerScript', {

    // {{{ extend

    extend: 'MicroField.module.alter.Abstract',

    // }}}
    // {{{ append

    append: function(callback) {

        // TODO: コンフィグオプションにサーバーサイドのフィールド一覧を設定して、取得できるようにする

        // TODO: サーバーサイドファイル名をもらう

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
