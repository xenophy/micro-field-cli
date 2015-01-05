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
    // {{{ mixins

    mixins: [
        'MicroField.mixin.Output'
    ],

    // }}}
    // {{{ config

    config: {

        // {{{ title

        title: 'microfield config',

        // }}}
        // {{{ desc

        desc: 'Management MicroField CLI configuration.'

        // }}}

    },

    // }}}
    // {{{ run

    run: function() {

        var me      = this,
            args    = me.argv,
            f       = CLI.String.format,
            bold    = me.ansi.bold,
            green   = me.colors.green,
            config  = MicroField.config.Config,
            text    = '';

        // 現在の設定出力
        if (CLI.Object.getKeys(me.getOptions()).length < 1) {

            me.getSettings = function() {

                var list = [];

                CLI.iterate(config.getValues(), function(key, value) {
                    list.push({
                        tag: key,
                        text: value
                    });
                });

                return list;
            };

            me.outputList([
                'Settings'
            ], {
                tagColor: green
            });

        } else {

            var invalidOpts  = [],
                configParams = config.getParams();

            CLI.iterate(me.getOptions(), function(key) {
                if (CLI.Array.indexOf(configParams, key) === -1) {
                    invalidOpts.push(key);
                }
            });

            // MicroField CLI タイトル出力
            text += MicroField.app.getTitle();
            MicroField.app.log.write(text);

            if (invalidOpts.length === 0) {

                CLI.iterate(config.getParams(), function(param) {

                    if (args[param]) {

                        config['set' + CLI.String.capitalize(param)](args[param]);

                        MicroField.app.log.info(
                            f('Set {0} to "{1}"', green(param), bold(args[param]))
                        );

                    }

                });

            } else {

                // 出力
                CLI.iterate(invalidOpts, function(option) {
                    MicroField.app.log.error(
                        f('Could not set {0} key.', bold('--' + option))
                    );
                });

            }

        }

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
