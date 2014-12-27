/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.app.Environment

CLI.define('MicroField.app.Environment', {

    // {{{ requires

    requires: [
        'MicroField.config.Config'
    ],

    // }}}
    // {{{ mixins

    mixins: [
        'CLI.mixin.Ansi',
        'CLI.mixin.Progress'
    ],

    // }}}
    // {{{ singleton

    singleton: true,

    // }}}
    // {{{ getHtaccess

    getHtaccess: function(callback) {

        var me      = this,
            fs      = require('fs'),
            path    = require('path'),
            f       = CLI.String.format,
            cfg     = MicroField.config.Config,
            domain  = cfg.getValues()['domain'] || 'localhost';
            target  = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), '.htaccess'));

        fs.readFile(target, function(err, data) {

            var text        = data.toString(),
                rewriteBase = text.match(/[\r\s]*RewriteBase (.*?)[\s]*\n/)[1],
                url         = f('http://{0}{1}', domain, rewriteBase);

            callback({
                text        : text,
                domain      : domain,
                rewriteBase : rewriteBase,
                url         : url
            });

        });

    },

    // }}}
    // {{{ getSdkVersion

    getSdkVersion: function(callback) {

        var me      = this,
            fs      = require('fs'),
            path    = require('path'),
            f       = CLI.String.format,
            target  = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), 'mods/MicroField/libs/version.php'));

        fs.readFile(target, function(err, data) {

            var text = data.toString(),
                m;

            m = text.match(/define.*\(.?['|"]+MICROFIELD_VERSION['|"]+.?,.?['|"]+(.*)['|"]+\).?;/);

            // TODO: エラー処理

            callback({
                text        : text,
                version     : new CLI.Version(m[1])
            });

        });

    },

    // }}}
    // {{{ getLatestVersion

    getLatestVersion: function(callback) {

        var me      = this,
            request = require("request"),
            f       = CLI.String.format,
            cfg     = MicroField.config.Config.getValues();

        request({
            url     : f('{0}?access_token={1}', cfg.releasesUrl, cfg.accessToken),
            method  : 'GET',
            headers : {
                'User-Agent': 'request'
            }
        }, function(err, res, body) {

            // TODO: エラー処理

            var versions    = [],
                data        = CLI.decode(body),
                latest;

            CLI.iterate(data, function(item) {

                // ドラフトは含まない
                if (item.draft === false) {
                    versions.push(item.tag_name);
                }

            });

            // 最新バージョンを算出
            CLI.iterate(versions, function(version, num) {

                if (!latest) {
                    latest = new CLI.Version(version);
                    latest.tarball_url = data[num].tarball_url;
                    latest.zipball_url = data[num].zipball_url;
                }

                if (latest.isLessThan(version)) {
                    latest = new CLI.Version(version);
                    latest.tarball_url = data[num].tarball_url;
                    latest.zipball_url = data[num].zipball_url;
                }

            });

            callback(latest);

        });

    },

    // }}}
    // {{{ getArchive

    getArchive: function(latest, callback) {

        var me      = this,
            fs      = require('fs'),
            path    = require('path'),
            temp    = require('temp'),
            request = require("request"),
            amdzip  = require('adm-zip'),
            f       = CLI.String.format,
            cfg     = MicroField.config.Config.getValues(),
            bar;

        temp.mkdir(MicroField.app.getName(), function(err, dirPath) {

            // TODO:　エラー処理
            if (!err) {

                var buf = '';

                request({
                    url     : f('{0}?access_token={1}', latest.zipball_url, cfg.accessToken),
                    method  : 'GET',
                    headers : {
                        'User-Agent': 'request'
                    }
                }, function(err, res, body) {

                    var target = dirPath + '/latest.zip';

                    fs.writeFile(target, body, 'binary', function() {

                        // [INF] Unzipping ...
                        MicroField.app.log.info('Unzipping ...');

                        // zipファイル読み込み
                        var zip = new amdzip(target);

                        // 解凍先のフォルダ名取得
                        var folderName = zip.getEntries()[0].entryName;

                        // 解凍
                        zip.extractAllTo(dirPath, true);

                        // ディレクトリ名変更
                        fs.rename(path.join(dirPath, folderName), path.join(dirPath, 'latest'), function() {

                            // zipファイル削除
                            fs.unlink(target, function() {

                                // [INF] Got MicroField SDK vX.X.X
                                MicroField.app.log.info('Got MicroField SDK v' + latest.version);

                                callback(path.join(dirPath, 'latest'));

                            });

                        });

                    });

                }).on('data', function(chunk) {

                    buf += chunk;
                    bar.tick(chunk.length);

                }).on('response', function (res) {

                    res.setEncoding('binary');

                    bar = me.progress('  ' + me.colors.green('Downloading MicroField SDK v' + latest.version) + ' [:bar] :percent :etas', {
                        complete: '=',
                        incomplete: ' ',
                        width: 20,
                        total: parseInt(res.headers['content-length'], 10)
                    });

                }).on('error', function (err) {

                    callback();

                });

            }

        });

    },

    // }}}
    // {{{ getVersionSum

    getVersionSum: function(sdk, latest, callback) {

        var me      = this,
            async   = require('async'),
            crypto  = require('crypto'),
            fs      = require('fs'),
            path    = require('path'),
            formatHashData, sdkMfcdir, latestMfcdir, sdkHash, latestHash;

        if (sdk.isGreaterThanOrEqual('1.5.0')) {
            sdkMfcdir = '.microfield';
        } else {
            sdkMfcdir = 'cmd';
        }

        if (latest.isGreaterThanOrEqual('1.5.0')) {
            latestMfcdir = '.microfield';
        } else {
            latestMfcdir = 'cmd';
        }

        // ハッシュファイルを解析関数
        formatHashData = function(data) {

            var tmp = {};

            data = data.split("\n");

            data.forEach(function(line) {

                if (line.length <= 0) {
                    return;
                }

                var filename = line.split(',')[0];
                var sum = line.split(',')[1];

                tmp[filename] = sum;

            });

            return tmp;

        };

        // 非同期処理実行
        async.series([

            // 現SDKバージョンハッシュ取得
            function(next) {
                fs.readFile(
                    path.join(
                        MicroField.app.getApplicationDir(),
                        sdkMfcdir,
                        'vf',
                        crypto
                            .createHmac('sha256', 'MicroFieldSDK')
                            .update('v' + sdk.version).digest('hex')
                    )
                , function(err, data) {
                    sdkHash = formatHashData(data.toString());
                    next();
                });
            },

            // 最新版SDKバージョンハッシュ取得
            function(next) {
                fs.readFile(
                    path.join(
                        latest.tmpdir,
                        latestMfcdir,
                        'vf',
                        crypto
                            .createHmac('sha256', 'MicroFieldSDK')
                            .update('v' + latest.version).digest('hex')
                    )
                , function(err, data) {
                    latestHash = formatHashData(data.toString());
                    next();
                });
            }

        ], function() {
            callback({
                sdk     : sdkHash,
                latest  : latestHash
            });
        });

    },

    // }}}
    // {{{ getInitialSdkConfig

    getInitialSdkConfig: function(callback) {

        var me      = this,
            fs      = require('fs'),
            exec    = require('child_process').exec,
            f       = CLI.String.format;


        exec('php -r \'require_once "mods/MicroField/libs/includes.php";$cls = new config_MicroField_DefaultValues();echo $cls->getJson();\'', {timeout: 60000}, function (error, stdout, stderr) {

            if (error !== null) {

                // TODO: エラー処理

                /*
                // [Failed: could not get initial sdk config.]
                Cmd.puts(ansi.red('Failed: could not get initial sdk config.'));
                process.exit(1);
               */

            }

            /*
                //  [INFO: Got initial sdk config.]
                Cmd.puts(format('{0}: Got initial sdk config.', ansi.green('INFO')));
               */

            callback(CLI.decode(stdout));

        });

    },

    // }}}
    // {{{ getConfigComments

    getConfigComments: function(keys, callback) {

        var me      = this,
            async   = require('async'),
            exec    = require('child_process').exec,
            f       = CLI.String.format,
            cmd     = 'php -r \'require_once "mods/MicroField/libs/includes.php";$cls = new config_MicroField_DefaultValues();echo $cls->getComment("{0}");\'',
            series  = [],
            ret     = {};

        keys.forEach(function(key) {

            series.push(function(next) {

                exec(f(cmd, key), {timeout: 60000}, function (error, stdout, stderr) {
                    ret[key] = stdout;
                    next();
                })

            });

        });

        async.series(series, function (err, results) {

            if (err) {

                // TODO: エラー処理
                throw err;
            }

            // コールバック実行
            callback(ret);
        });

    },

    // }}}
    // {{{ makeConfigSection

    makeConfigSection: function(target, comments, callback) {

        var f = CLI.String.format;

        var makeSection = function(obj, parent, level) {

            var ret = '';
            var objLength = Object.keys(obj).length;

            for (var p in obj) {

                objLength--;

                var key = parent + '/' + p;

                if (!parent) {
                    parent = '';
                    key = p;
                }

                // コメント取得
                var comment = '';
                var tmp = comments[key].split("\n");

                if (comments[key].length > 0) {

                    // コメント作成
                    comment += "\n/**\n";
                    tmp.forEach(function(line) {
                        comment += " * " + line + "\n";
                    });
                    comment += " */\n";

                }

                if(comment) {
                    ret += comment;
                }

                ret += '"' + p + '": ';

                if (obj[p].constructor == Object) {

                    ret += "{\n";

                    var tmp = makeSection(obj[p], key, (level + 1));

                    tmp = tmp.split("\n");

                    tmp.forEach(function(line) {

                        ret += '    ';
                        ret += line;
                        ret += "\n";

                    });

                    ret += "}";

                    if (objLength !== 0) {
                        ret += ",";
                    }

                    ret += "\n";

                } else {

                    var tmp = '{0}';

                    if (typeof obj[p] === 'string') {
                        tmp = '"{0}"';
                    }

                    if(obj[p] instanceof Array){

                        ret += "[\n";

                        var itemLength = Object.keys(obj[p]).length;

                        obj[p].forEach(function(line) {

                            itemLength--;

                            ret += '    ';

                            var tmp = '{0}';

                            if (typeof line === 'string') {
                                tmp = '"{0}"';
                            }

                            ret += f(tmp, line);

                            if (itemLength > 0) {
                                ret += ",\n";
                            } else {
                                ret += "\n";
                            }

                        });

                        ret += "]";

                    } else {

                        ret += f(tmp, obj[p]);

                    }

                    if (objLength !== 0) {
                        ret += ",";
                        ret += "\n";
                    } else {
                    }


                }


            }

            return ret;

        };

        var text = makeSection(target, null, 1);
        var tmp = text.split("\n");
        var ret = "{\n";

        tmp.forEach(function(line) {

            ret += CLI.String.repeat('    ', 1);
            ret += line;
            ret += "\n";

        });

        ret += "}";
        text = ret;

        // Trim処理
        ret = '';

        text.split("\n").forEach(function(line) {
            ret += line.replace(/\s+$/, "");
            ret += "\n";
        });
        text = ret;

        // コールバック
        callback(text);

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
