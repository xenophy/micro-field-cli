/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controller.hash.Main

CLI.define('MicroField.controller.hash.Main', {

    // {{{ extend

    extend: 'MicroField.controller.Controller',

    // }}}
    // {{{ run

    run: function(callback) {

        var me      = this;
            fs      = require('fs'),
            crypto  = require('crypto'),
            target  = me.argv.target,
            secret  = me.argv.secret;

        if (!target || !secret) {
            CLI.create('MicroField.controller.hash.Help').run();
            return;
        }

        if (fs.existsSync(target)) {
            target = fs.readFileSync(target);
            target = target.toString('utf8');
        } else {
            MicroField.app.log.error('Could not find "' + target + '"');
            return;
        }

        hmac_object = crypto.createHmac('sha256', secret);
        hmac_object.update(target);

        CLI.log(hmac_object.digest('hex'));

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
