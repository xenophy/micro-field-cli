/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controller.config.Main

CLI.define('MicroField.controller.config.Main', {

    // {{{ requires

    requires: [
        'MicroField.config.Config'
    ],

    // }}}
    // {{{ extend

    extend: 'MicroField.controller.Controller',

    // }}}
    // {{{ run

    run: function() {

        var me          = this,
            args        = me.argv,
            config      = MicroField.config.Config,
            f           = CLI.String.format,
            bold        = me.ansi.bold,
            red         = me.colors.red,
            green       = me.colors.green,
            text        = '';

        text += MicroField.app.getTitle();
        text += "\n";

        if (CLI.Object.getKeys(me.getOptions()).length < 1) {

            text += "Current settings\n";
            text += "\n";

            CLI.iterate(config.getValues(), function(key, value) {

                text += f('  {0}\t: {1}', green(key), bold(value)) + "\n";

            });

        } else {

            var invalidOpts  = [],
                configParams = config.getParams();

            CLI.iterate(me.getOptions(), function(key) {

                if (CLI.Array.indexOf(configParams, key) === -1) {
                    invalidOpts.push(key);
                }

            });

            if (invalidOpts.length === 0) {

                CLI.iterate(config.getParams(), function(param) {

                    if (args[param]) {

                        config['set' + CLI.String.capitalize(param)](args[param]);

                        text += f('  {0}\t: {1}', green(param), bold(args[param])) + "\n";

                    }

                });

            } else {

                text += red('Could not set invalid keys.') + "\n";

                CLI.iterate(invalidOpts, function(option) {
                    text += f('  --{0}', option) + "\n";
                });

            }

        }

        CLI.log(text);

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
