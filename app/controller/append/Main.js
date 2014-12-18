/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ MicroField.controller.append.Main

CLI.define('MicroField.controller.append.Main', {

    // {{{ requires

    requires: [
        'MicroField.module.Manager'
    ],

    // }}}
    // {{{ extend

    extend: 'MicroField.controller.Controller',

    // }}}
    // {{{ config

    config: {

        // {{{ fields

        fields: [{
            name    : 'textfield',
            cls     : 'TextField'
        }]

        // }}}

    },

    // }}}
    // {{{ findField

    findField: function(type) {

        var me = this;

        return CLI.Array.findBy(me.getFields(), function(item) {

            if (item.name === type) {
                return true;
            }

            return false;

        });

    },

    // }}}
    // {{{ run

    run: function(fieldType, itemId, modPath) {

        var me = this;

        if (!me.findField(fieldType)) {
            CLI.create('MicroField.controller.append.Help').run();
            return;
        }

        if (!itemId) {
            CLI.create('MicroField.controller.append.Help').run();
            return;
        }

        if (!modPath) {
            CLI.create('MicroField.controller.append.Help').run();
            return;
        }

        if (modPath.split('/').length !== 2) {
            CLI.create('MicroField.controller.append.Help').run();
            return;
        }

        MicroField.module.Manager.append({
            fieldType   : fieldType,
            itemId      : itemId,
            modPath     : modPath
        }, function() {

        });

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
