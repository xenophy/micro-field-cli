/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * This file is part of MicroField CLI
 */

(function() {

    "use strict";

    // {{{ cli-framework

    require('cli-framework');

    // }}}
    // {{{ execChildProcess

    var exec = require('child_process').exec;

    global.execChildProcess = function(cmd, callback) {

        var child = exec(cmd, function(err, stdout, stderr) {
            callback(err, stdout, stderr);
        });

    };

    // }}}
    // {{{ spacer

    global.tagSpacer = function(tag) {
        return tag + CLI.String.repeat(' ', 18 - tag.length);
    };

    // }}}
    // {{{ MicroField

    global.MicroField = {
        manifest: JSON.parse(
            require('fs').readFileSync(__dirname + '/../package.json').toString('utf8')
        )
    };

    // }}}


})();

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
