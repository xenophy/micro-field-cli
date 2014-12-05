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
            output      = '',
            ansies      = me.ansies,
            green       = ansies.green,
            red         = ansies.red,
            bold        = ansies.bold,
            reset       = ansies.reset;

        output += me.getTitle() + "\n";
        output += "\n";

        if (CLI.Object.getKeys(me.getOptions()).length < 1) {

            output += "Current settings\n";
            output += "\n";

            CLI.iterate(config.getValues(), function(key, value) {
                output += f('  {0}{2}{1}\t: {4}{3}{1}', green, reset, key, value, bold) + "\n";
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
                        output += f('  set {0}{2}{1} in {4}{3}{1}', green, reset, param, args[param], bold) + "\n";
                    }

                });

            } else {

                output += f('{0}Could not set invalid keys.{1}', red, reset) + "\n";

                CLI.iterate(invalidOpts, function(option) {
                    output += f('  --{0}', option) + "\n";
                });

            }

        }

        CLI.log(output);

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
