![Logo](https://github.com/xenophy/micro-field-cli/wiki/images/logo.png)

Install
-------

node.js が必要ですので、事前にインストールしておきます。

```bash
sudo npm install -g microfield
```

nodeが入っていれば、これでインストール完了です。
コマンドラインから `microfield` を実行してください。
usage が表示されれば正常にインストールされています。

セットアップに必要な設定：

```bash
microfield config
```

で現在の設定が確認できますが、初期状態では空になっています。
ホームディレクトリに、*.microfieldclicfg.json* が作成され、ここに設定が記述されます。

セットアップに必要な設定は２つあります。

- `extPath` : Ext JS のパスを設定します。

  ```bash
  microfield config --extPath=~/Library/Sencha/ext-5.0.1
  ```

- `domain` : セットアップのドメインを設定します。

  ```bash
  microfield config --domain=localhost
  ```


