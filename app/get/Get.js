/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.get.Get

CLI.define('MicroField.get.Get', {

    // {{{ mixins

    mixins: [
        'CLI.mixin.Ansi',
        'CLI.mixin.Progress'
    ],

    // }}}
    // {{{ singleton

    singleton: true,

    // }}}
    // {{{ execute

    execute: function(o, callback) {

        var me      = this,
            fs      = require('fs'),
            amdzip  = require('adm-zip'),
            path    = require('path'),
            http    = require('http'),
            buf     = '',
            bar;

        callback    = callback || CLI.emptyFn;

        if (o.showTitle) {

            // タイトル出力
            CLI.log(MicroField.app.getTitle());

        }

        http.get(o.url, function (res) {

            res.setEncoding('binary');

            var buf = '';

            res.on('data', function (chunk) {

                buf += chunk;
                bar.tick(chunk.length);

            });

            res.on('end', function () {

                var pkgroot = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), 'packages'));
                var tmp     = CLI.resolvePath(path.join(pkgroot, o.dirname + '.zip'));

                fs.writeFile(tmp, buf, 'binary', function() {

                    // [INF] Unzipping ...
                    MicroField.app.log.info('Unzipping ...');

                    // zipファイル読み込み
                    var zip = new amdzip(tmp);

                    // 解凍先のフォルダ名取得
                    var folderName = zip.getEntries()[0].entryName;

                    // 解凍
                    zip.extractAllTo(pkgroot, true);

                    // ディレクトリ名変更
                    fs.rename(CLI.resolvePath(path.join(pkgroot, folderName)), CLI.resolvePath(path.join(pkgroot, o.dirname)), function() {

                        // zipファイル削除
                        fs.unlink(tmp, function() {

                            // [INF] Got Ext JS from CDN
                            MicroField.app.log.info('Got ' + o.title);

                            callback();

                        });

                    });

                });

            });

        }).on('response', function (res) {

            bar = me.progress('  ' + me.colors.green('Downloading ' + o.title) + ' [:bar] :percent :etas', {
                complete: '=',
                incomplete: ' ',
                width: 20,
                total: parseInt(res.headers['content-length'], 10)
            });

        }).on('error', function (err) {

            callback();

        });

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
