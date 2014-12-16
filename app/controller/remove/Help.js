/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controler.remove.Help

CLI.define('MicroField.controller.remove.Help', {

    // {{{ extend

    extend: 'MicroField.controller.Controller',

    // }}}
    // {{{ run

    run: function() {

        var me          = this,
            f           = CLI.String.format,
            bold        = me.ansi.bold,
            underline   = me.ansi.underline,
            green       = me.colors.green,
            text        = '';

        text += MicroField.app.getTitle();
        text += "\n";

        /*
        text += "This category contains various commands for module template setup.\n";
        text += "\n";
        text += underline('Commands') + "\n";
        text += f('  * {0}\t: Generates a simple header module', bold('header')) + "\n";
        text += f('  * {0}\t: Generates a simple footer module', bold('footer')) + "\n";
        text += f('  * {0}\t: Generates a tree panel based navigation module', bold('navigation')) + "\n";
        text += f('  * {0}\t: Generates a tree panel based navigation module for tablet', bold('tabletnavigation')) + "\n";
        text += f('  * {0}\t: Generates a plain module', bold('base')) + "\n";
        text += f('  * {0}\t: Generates a edit pattern module. This pattern is edit and save, depends on user\'s id', bold('edit')) + "\n";
        text += f('  * {0}\t: Generates a editlist pattern module. This pattern have "list screen" and "edit screen', bold('editlist')) + "\n";
        text += "\n";
        text += underline('Options') + "\n";
        text += f('  * --{0} - Do not create database table when generate', bold('nodb')) + "\n";
        text += "\n";
        text += underline('Syntax') + "\n";
        text += "  microfield generate [command] [Module Path]\n";
        text += "\n";
        text += f("  {0} microfield generate base MyApp/Base\n", green('ex:'));
       */

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
