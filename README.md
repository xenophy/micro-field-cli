![Logo](https://github.com/xenophy/micro-field-cli/wiki/images/logo.png)

## インストール

Node.js  v0.10 以上が必要です。
事前にインストールしてください。

```bash
sudo npm install -g microfield
```

nodeが入っていれば、これでインストール完了です。
コマンドラインから `microfield` を実行してください。
usage が表示されれば正常にインストールされています。


## コンフィグ設定

### 現在の設定確認

以下のコマンドで、現在の設定内容が確認できます。

```bash
microfield config
```

ホームディレクトリに、*.microfieldclicfg.json* が作成され、ここに設定が記述されます。

### Ext JS SDK パスの設定

Ext JS SDK のパスを設定します。

  ```bash
  microfield config --extPath=~/Library/Sencha/ext-5.0.1
  ```

### ドメイン設定

セットアップを行うドメインを設定します。

  ```bash
  microfield config --domain=localhost
  ```

### リリースURL設定

MicroField SDKのリリースURLを設定します。

  ```bash
  microfield config --releasesUrl=https://api.github.com/repos/xenophy/micro-field/releases
  ```

### アクセストークン

MicroField SDKのリポジトリへのアクセストークンを設定します。
アクセストークンは、管理者から受領してください。

  ```bash
  microfield config --accessToken=**************************



