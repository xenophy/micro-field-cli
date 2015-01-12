<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MFTest_EditListNoDB_Tests

/**
 * MFTest_EditListNoDB_Tests
 *
 * Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

class MFTest_EditListNoDB_Tests extends MFTest_EditListNoDB_Lists {

    // {{{ testSetup

    public function testSetUp() {

        try {
            $this->testTearDown();
        } catch (Exception $e) {
        }

        $dbo = $this->dbo;
        $dbo->createCloneTable($this->orgTable, $this->table);

    }

    // }}}
    // {{{ testTearDown

    public function testTearDown() {

        $dbo = $this->dbo;
        $dbo->removeCloneTable($this->table);
    }

    // }}}
    // {{{ insertTestData

    public function insertTestData() {

        $ret = array();

        $email_list = file_get_contents(dirname(__FILE__) . '/../tests/data.txt');
        $email_list = explode("\n", $email_list);

        foreach($email_list as $email) {

            if ($email === '') {
                return;
            }

            $data = array();

            // ステータス設定
            $data['status'] = 1;

            // 作成 & 更新日時設定
            $data['created'] = $data['modified'] = date("Y-m-d H:i:s");

            // テキストデータ
            $data['textdata'] = $email;

            $this->dbo->insert($this->table, $data);

        }

        return $ret;

    }

    // }}}

}

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
