/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.module.Manager

CLI.define('MicroField.module.Manager', {

    // {{{ requires

    requires: [
        'MicroField.module.Parser'
    ],

    // }}}
    // {{{ singleton

    singleton: true,

    // }}}
    // {{{ getList

    getList: function(callback) {

        var me          = this,
            async       = require('async'),
            fs          = require('fs'),
            path        = require('path'),
            recursive   = require('recursive-readdir'),
            modroot     = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), 'mods')),
            mods        = [],
            series      = [];

        recursive(modroot, function (err, files) {

            CLI.iterate(files, function(file) {

                series.push((function(file) {

                    return function(next) {

                        if (path.basename(file) === 'module.json') {

                            mods.push(path.relative(path.join(MicroField.app.getApplicationDir(), 'mods'), path.dirname(file)));

                        }
                        next();

                    };

                })(file));

            });

            async.series(series, function() {

                // コールバック実行
                callback(mods);

            });

        });

    },

    // }}}
    // {{{ getInfo

    getInfo: function(modPath, callback) {

        var me      = this,
            fs      = require('fs'),
            path    = require('path'),
            target  = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), 'mods', modPath, 'module.json'));

        fs.readFile(target, function(err, data) {
            callback(CLI.decode(MicroField.app.removeComment(data.toString()), true));
        });

    },

    // }}}
    // {{{ getConfigOptions

    getConfigOptions: function(modPath, callback) {

        var me      = this,
            async   = require('async'),
            fs      = require('fs'),
            path    = require('path'),
            parser  = MicroField.module.Parser,
            series  = [],
            skips   = {},
            obj, target;

        // Editビュー解析
        target = CLI.resolvePath(path.join(MicroField.app.getApplicationDir(), 'mods', modPath, '/app/view/edit/Edit.js'));

        series = [

            function(next) {

                fs.exists(target, function(exists) {

                    if (!exists) {
                        skips.editview = true;
                    } else {
                        skips.editview = false;
                    }

                    next();

                });

            },

            function(next) {

                if (!skips.editview) {

                    fs.readFile(target, function(err, data) {

                        obj = parser.getClassConfig(parser.removeComment(data.toString()))

                        next();

                    });

                } else {
                    next();
                }


            }

        ];

        async.series(series, function() {

            // コールバック実行
            callback(obj);

        });

    }

    // }}}

});

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
