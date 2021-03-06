<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MFTest_Edit_Tests

/**
 * MFTest_Edit_Tests
 *
 * Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

class MFTest_Edit_Tests extends MFTest_Edit_Users {

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

}

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
