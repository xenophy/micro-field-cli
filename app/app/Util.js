/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.app.Util

CLI.define('MicroField.app.Util', {
}, function() {

    // {{{ MicroField.app

    CLI.apply(MicroField.app, {

        // {{{ getSumfilesDirectory

        // TODO 不要なら削除
        getSumfilesDirectory: function() {

            var path = require('path');

            return CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), '.microfield', 'vf'));

        },

        // }}}
        // {{{ getCmdSeparator

        getCmdSeparator: function() {
            return CLI.isWindows ? ' & ' : ';';
        },

        // }}}
        // {{{ getSampleFilename

        getSampleFilename: function() {

            return 'microfield\-sample.json';

        },

        // }}}
        // {{{ getName

        getName: function() {
            return 'MicroField CLI';
        },

        // }}}
        // {{{ getSign

        getSign: function() {

            var f = CLI.String.format;

            return f(
                'generated by {0} v{1} date: {2}',
                MicroField.app.getName(),
                CLI.getVersion('MicroField').version,
                CLI.util.Format.date(new Date(), 'Y/m/d H:m:s')
            );

        },

        // }}}
        // {{{ getSettings

        getSettings: function(callback) {

            var me      = this,
                fs      = require('fs'),
                path    = require('path'),
                f       = CLI.String.format,
                target  = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), 'mods/microfield.json'));

            fs.readFile(target, function(err, data) {
                callback(CLI.decode(MicroField.app.removeComment(data.toString()), true));
            });

        },

        // }}}
        // {{{ removeComment

        removeComment: function(src) {

            // ソースコードコメント、スペース、改行削除
            src = src.replace(/\/\/.*?\n/g, '');
            src = src.split("\n");
            CLI.iterate(src, function(line, i) {
                src[i] = line.replace(/^[\s　]+|[\s　]+$/g, '');
            });
            src = src.join("\n");

            // 複数行のコメント削除
            src = src.replace(/\/\*?([^\/]|[^\*]\/)*\*\//g, '');

                // 単行コメント削除
                src = src.replace(/\s*\/\/.*$/g, '');

            return src;

        },

        // }}}
        // {{{ log

        log: {

            // {{{ write

            write: function(tag, text) {

                if (text) {
                    CLI.log(tag + ' ' + text);
                } else {
                    CLI.log(tag);
                }

            },

            // }}}
            // {{{ info

            info: function(text) {

                var me = MicroField.getApplication();

                MicroField.app.log.write(
                    '[INF]'.green.bold,
                    text
                );

            },

            // }}}
            // {{{ error

            error: function(text) {

                var me = MicroField.getApplication();

                MicroField.app.log.write(
                    '[ERR]'.red.bold,
                    text
                );

            }

            // }}}


        },

        // }}}
        // {{{ getTitle

        getTitle: function() {

            var me      = MicroField.getApplication(),
                version = CLI.getVersion('MicroField').version,
                f       = CLI.String.format,
                text    = '';

            text += f('{1} v{0}', version, MicroField.app.getName()).bold + "\n";

            return text;

        },

        // }}}
        // {{{ getApplicationDir

        getApplicationDir: function() {

            return process.cwd();

        },

        // }}}
        // {{{ isApplicationDir

        isApplicationDir: function() {

            var me      = this,
                fs      = require('fs');
                path    = require('path');

            // MicroFieldディレクトリであるか判定 (microfield-sample.jsonの存在確認)
            if (!fs.existsSync(path.resolve(path.join(this.getApplicationDir(), 'mods' , this.getSampleFilename())))) {

                return false

            }

            return true;

        },

        // }}}
        // {{{ copyFiles

        copyFiles: function(list, progress, callback) {

            var me      = this,
                async   = require('async'),
                path    = require('path'),
                count   = 0,
                fns  = [];

            if (arguments.length === 2) {
                callback = progress;
            }

            CLI.iterate(list, function(item) {

                var src = item[0],
                    dest = item[1];

                src = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), src));
                dest = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), dest));

                fns.push(function(callback) {

                    CLI.Fs.copy(src, dest, function(err) {
                        count++;
                        progress(src, dest);
                        callback();
                    });

                });

            });

            async.series(fns, function (err, result) {
                callback(count);
            });

        },

        // }}}
        // {{{ removeFiles

        removeFiles: function(list, progress, callback) {

            var me      = this,
                async   = require('async'),
                path    = require('path'),
                count   = 0,
                fns  = [];

            if (arguments.length === 2) {
                callback = progress;
            }

            CLI.iterate(list, function(item) {

                var t = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), item));

                fns.push(function(callback) {
                    CLI.Fs.remove(t, function(err) {
                        count++;
                        progress(item);
                        callback();
                    });
                });

            });

            async.series(fns, function (err, result) {
                callback(count);
            });

        },

        // }}}
        // {{{ changeToWritable

        changeToWritable: function(list, progress, callback) {

            var me      = this,
                fs      = require('fs'),
                path    = require('path'),
                async   = require('async'),
                count   = 0,
                fns  = [];

            if (arguments.length === 2) {
                callback = progress;
            }

            CLI.iterate(list, function(item) {

                var t = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), item));

                fns.push((function(t) {

                    return function(next) {

                        fs.stat(t, function(err, stat) {

                            if (err) {
                                next();
                                return;
                            }

                            if (stat.isDirectory()) {
                                fs.chmod(t, 0777, next);
                            } else {
                                fs.chmod(t, 0666, next);
                            }

                        });

                    };

                })(t));

            });

            async.series(fns, function (err, result) {
                callback(count);
            });

        },

        // }}}
        // {{{ removeComment

        removeComment: function (str) {

            var buf=[],
                pos=0,
                s=str=String(str);
                R:

            while(s) {

                var c,nc,n,
                    q=false,
                    sq=false,
                    re=false,
                    rec=false,
                    esc=false;

                for (var i=0,l=s.length;i<l;i++) {

                    c=s[i];

                    if(esc) {

                        esc=false;

                    } else if(q) {

                        if (c=='"') {
                            q=false;
                        } else if (c=='\\') {
                            esc=true;
                        }

                    } else if(sq) {

                        if (c=="'") {
                            sq=false;
                        } else if (c=='\\') {
                            esc=true;
                        }

                    } else if(re) {

                        if (rec) {

                            if (c==']') {
                                rec=false;
                            } else if (c=='\\') {
                                esc=true;
                            }

                        } else {

                            if (c=="/") {
                                re=false;
                            } else if(c=='\\') {
                                esc=true;
                            } else if(c=='[') {
                                rec=true;
                            }

                        }

                    } else {

                        if (c=='"') {

                            q=true;

                        } else if(c=="'") {

                            sq=true;

                        } else if(c=='/') {

                            nc=s[i+1];

                            if (nc=='/') {

                                var l = s.length;

                                buf.push(s.slice(0,i));
                                s=s.slice(i+2);
                                s=s.replace(/[\s\S]*?(\r?\n)/, '$1');
                                pos += (l - s.length);
                                continue R;

                            } else if(nc=='*') {

                                var l = s.length;

                                buf.push(s.slice(0,i));
                                n=s.indexOf('*/',i+2);
                                s=s.slice(n+2);
                                pos += (l - s.length);
                                continue R;

                            } else {

                                var cur = pos + i + 1,
                                    regcheck = str.slice(0, cur) + '^' + str.slice(cur);

                                try {

                                    Function('('+regcheck+')'); re = true;

                                } catch(e) {

                                }

                            }

                        }

                    }

                }

                buf.push(s);
                break;
            }

            return buf.join('');
        }

        // }}}


    });

});

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
