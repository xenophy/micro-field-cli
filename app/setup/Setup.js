/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.setup.Setup

CLI.define('MicroField.setup.Setup', {

    // {{{ requires

    requires: [
        'MicroField.config.Config'
    ],

    // }}}
    // {{{ mixins

    mixins: [
        'CLI.mixin.Ansi'
    ],

    // }}}
    // {{{ singleton

    singleton: true,

    // }}}
    // {{{ execute

    execute: function() {

        var me      = this,
            fs      = require('fs'),
            path    = require('path'),
            log     = MicroField.app.log,
            bold    = me.ansi.bold,
            cfg     = MicroField.config.Config,
            text    = '';

        // タイトル出力
        CLI.log(MicroField.app.getTitle());

        // アプリケーションディレクトリでの実行であるかを判定
        if (!MicroField.app.isApplicationDir()) {

            log.error('cannot find ' + bold(MicroField.app.getSampleFilename()));
            return;
        }

        // Ext JS 存在確認
        var extPath = cfg.getValues()['extPath'];

        if (!CLI.isDefined(extPath)) {

            log.error('"' + bold('extPath') + '" config have not been set.');

            text  = "\n";
            text += 'Please set the ' + bold('extPath') + ' using folloing command.';
            text += "\n";
            text += "\n";
            text += "  microfield config --extPath=\"[Ext JS Path]\"";
            text += "\n";

            CLI.log(text);

            return;
        }

        if (!fs.existsSync(CLI.resolvePath(extPath)) || !fs.existsSync(path.resolve(path.join(CLI.resolvePath(extPath), 'src')))) {

            log.error('cannot find Ext JS in "' + bold(extPath) + '"');
            return;

        }

        console.log("Go!");

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
