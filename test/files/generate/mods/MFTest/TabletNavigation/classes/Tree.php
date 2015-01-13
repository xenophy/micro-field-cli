<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MFTest_TabletNavigation_Tree

/**
 * MFTest_TabletNavigation_Tree - MicroField SDK
 *
 * Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 *
 * generated by MicroField CLI v0.8.0 date: 2015/01/14 03:01:49
 */

class MFTest_TabletNavigation_Tree extends ExtDirect {

    // {{{ contentPath

    public $contentPath = '';

    // }}}
    // {{{ __construct

    public function __construct() {

        // スーパークラスメソッドコール
        parent::__construct();

        // navigation.jsonパス設定
        $this->contentPath = $this->modRootPath . 'navigation.json';

    }

    // }}}
    // {{{ _makeNode

    private function _makeNode($content) {

        $result = array();

        // アクセスコントロールリストクラス生成
        $acl = new ACL();

        // ACLモード取得
        $mode = $acl->getMode();

        // リスト取得
        if ($mode === 'file') {

            $list = $acl->getFileList();

        } else if ($mode === 'table') {

            $list = $acl->getTableList();

        }

        foreach($content as $node) {

            if ($mode === false) {

                // ロール制御を行わない
                array_push($result, $this->_makeItem($node));

            } else if ($mode === 'file' || $mode === 'table') {

                $tmp = array();

                foreach ($list as $value) {

                    if (strpos($value, '/') !== false) {

                        $value = explode('/', $value);

                        if ($value[0] === 'navigation') {
                            array_push($tmp, $value[1]);
                        }

                    }

                }

                if (isset($node->id) && in_array($node->id, $tmp)) {
                    array_push($result, $this->_makeItem($node));
                }

            }

        }

        return $result;
    }

    // }}}
    // {{{ _makeItem

    private function _makeItem($node) {

        $item = array();

        // {{{ id抽出

        if (isset($node->id)) {
            $item['id'] = 'navi_' . $node->id;
        } else {
            $item['id'] = 'navi_' . uniqid();
        }

        // }}}
        // {{{ text抽出

        $item['text'] = $node->text;

        // }}}
        // {{{ href抽出

        if (isset($node->href)) {
            $item['hrefTarget'] = $node->href;
        } else {
            $item['hrefTarget'] = "#!/";
        }

        // }}}
        // {{{ leaf判定

        if (isset($node->children)) {
            $item['leaf'] = false;
            $item['children'] = $this->_makeNode($node->children);
            $item['cls'] = 'category';
        } else {
            $item['leaf'] = true;
        }

        // }}}
        // {{{ expanded

        if (isset($node->expanded) && $node->expanded === true) {
            $item['expanded'] = true;
        }

        // }}}

        return $item;
    }

    // }}}
    // {{{ readData

    /**
     * ツリーデータ取得
     */
    public function readData($id) {

        // Jsonクラス生成
        $json       = new Json();

        // レスポンス配列初期化
        $response   = array();

        // データ配列初期化
        $data       = array();

        // navigation.json読み込み
        $content = $json->load($this->contentPath);

        // TODO: エラー処理

        // ノード作成
        $response['children'] = $this->_makeNode($content);
        $response['success'] = true;

        return $response;
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
