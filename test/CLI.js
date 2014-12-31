/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*
This file is part of MicroField CLI

Copyright (c) 2015 Xenophy.CO.,LTD All rights Reserved.
http://www.xenophy.com
*/

// {{{ assert

var assert = require('power-assert');

// }}}
// {{{ CLI

describe("CLI", function() {

    // {{{ before

    before(function(){

        // require CLI
        require('../lib/CLI');

    });

    // }}}
    // {{{ CLI.global

    describe("CLI.global", function() {

        it("should return the global scope", function() {
            assert(CLI.global === (function(){ return this; }).call());
        });

    });

    // }}}
    // {{{ CLI.apply

    describe("CLI.apply", function() {

        var origin, o;

        beforeEach(function() {

            origin = {
                name: 'value',
                something: 'cool',
                items: [1,2,3],
                method: function() {
                    this.myMethodCalled = true;
                },
                toString: function() {
                    this.myToStringCalled = true;
                }
            };

        });

        it("should copy normal properties", function() {

            CLI.apply(origin, {
                name: 'newName',
                items: [4,5,6],
                otherThing: 'not cool',
                isCool: false
            });

            assert(origin.name === 'newName');
            assert(origin.items[0] === 4);
            assert(origin.items[1] === 5);
            assert(origin.items[2] === 6);
            assert(origin.something === 'cool');
            assert(origin.otherThing === 'not cool');
            assert(origin.isCool === false);
        });

        /*
        it("should copy functions", function() {

            Ext.apply(origin, {
                method: function() {
                    this.newMethodCalled = true;
                }
            });

            origin.method();

            expect(origin.myMethodCalled).not.toBeDefined();
            expect(origin.newMethodCalled).toBeTruthy();

        });

        it("should copy non-enumerables", function() {
            Ext.apply(origin, {
                toString: function() {
                    this.newToStringCalled = true;
                }
            });

            origin.toString();

            expect(origin.myToStringCalled).not.toBeDefined();
            expect(origin.newToStringCalled).toBeTruthy();
        });

        it("should apply properties and return an object", function() {
            o = Ext.apply({}, {
                foo: 1,
                bar: 2
            });

            expect(o).toEqual({
                foo: 1,
                bar: 2
            });
        });

        it("should change the reference of the object", function() {
            o = {};
            Ext.apply(o, {
                opt1: 'x',
                opt2: 'y'
            });

            expect(o).toEqual({
                opt1: 'x',
                opt2: 'y'
            });
        });

        it("should overwrite properties", function() {
            o = Ext.apply({
                foo: 1,
                baz: 4
            }, {
                foo: 2,
                bar: 3
            });

            expect(o).toEqual({
                foo: 2,
                bar: 3,
                baz: 4
            });
        });

        it("should use default", function() {
            o = {};

            Ext.apply(o, {
                foo: 'new',
                exist: true
            }, {
                foo: 'old',
                def: true
            });

            expect(o).toEqual({
                foo: 'new',
                def: true,
                exist: true
            });
        });

        it("should override all defaults", function() {
            o = Ext.apply({}, {
                foo: 'foo',
                bar: 'bar'
            }, {
                foo: 'oldFoo',
                bar: 'oldBar'
            });

            expect(o).toEqual( {
                foo: 'foo',
                bar: 'bar'
            });
        });

        it("should return null if null is passed as first argument", function() {
           expect(Ext.apply(null, {})).toBeNull();
        });

        it("should return the object if second argument is not defined", function() {
            o = {
                foo: 1
            };
            expect(Ext.apply(o)).toEqual(o);
        });

        it("should override valueOf", function() {
            o = Ext.apply({}, {valueOf: 1});

            expect(o.valueOf).toEqual(1);
        });

        it("should override toString", function() {
            o = Ext.apply({}, {toString: 3});

            expect(o.toString).toEqual(3);

        });
       */
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
