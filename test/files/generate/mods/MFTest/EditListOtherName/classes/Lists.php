<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MFTest_EditListOtherName_Lists

/**
 * MFTest_EditListOtherName_Lists
 *
 * Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 *
 * generated by MicroField CLI v0.7.3 date: 2015/01/12 09:01:16
 */

class MFTest_EditListOtherName_Lists extends EditList {

    ///
    /// <microfield-cmd-initconfiguration>
    ///
    /// This area will parser by MicroField Cmd.
    /// Don't erase this area to end tag.
    ///
    /// Sometime MicroField Cmd will update this file.
    ///
    /// <summary>
    /// </summary>
    ///

    // {{{ autoconnect

    /**
     * データベース自動接続
     */
    public $autoconnect = true;

    // }}}
    // {{{ テーブル名

    // <microfield-cmd-server-table>

    public $table = 'editlist';

    // </microfield-cmd-server-table>

    // }}}
    // {{{ フィールド設定

    public $fields = array(

        // <microfield-cmd-server-fields>

        'textdata'

        // </microfield-cmd-server-fields>

    );

    // }}}
    // {{{ Search Target

    public $searchTarget = 'textdata';

    // }}}
    // {{{ _validate

    protected function _validate($data) {

        $textdata           = $data['textdata'];

        $errors = array();

        // 空チェック
        if ($textdata == '') {

            // "テキストを入力してください。"
            $errors['textdata'] = 'MFTest.EditListOtherName:Please enter textdata';

        }

        return $errors;

    }

    // }}}

    // </microfield-cmd-initconfiguration>

}

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
