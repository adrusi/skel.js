# skel.js
Skel is a backbone (think **skel**eton) for building javascript libraries. While skel itself does not include
any practical utilities, it exposes an extremely flexible API for building libraries upon. Skel supports 3
different coding styles. Functional, object oriented, and prototypical. Both the functional and object oriented
styles are enabled by default. The prototypical (extending the native prototypes) style must be enabled first,
as to not pollute the prototypes of coders who don't want the polluted.

## Disclaimer
Skel's version is currently something like 0.0.0.0.0.0.0.1, and needs a ton more vital features before it's
ready. These features include things like a `noConflict` method and other features one would expect for a
library backbone.

Also, Skel is currently only formatted for commonjs, though only a few lines need to be changed to make it
browser compatible.

## Requiring skel
Skel, being in such an early stage of development, is not on npm. To use it, get the skel.js file and drop it
into your project directory. Then add the following line to include skel.

    var _ = require("./skel")._,
        __ = require("./skel").__;

You can change the `_` variable name to suit your preference (the first one, the second has to
remain an underscore). In this readme, an `_` will be used.

## Setting up a test
As noted above, skel does not include any built in utilities other than those related to skel itself. To make
sure that everything is working in your environment, set up a simple mixin (a name borrowed from underscore.js
meaning an extension). Let's build a mixin to print a string to the console.

### Writing a simple mixin
To make a new mixin, you use the mixin method. This method accepts two parameters, one or more data types
(string, number, array, etc.) that the mixins apply to, and a hash of mixins.

    _.mixin(_.STRING, {
        log: function() {
            
        }
    });

Notice that there are some constants for the data types built in, which is where `_.STRING` comes from. All the
arguments you use should be listed in the arguments list, unlike in jQuery, where plugins use the `this`
variable for the first arguments. Since all we are doing is printing a string, we only need a single argument.
I'll also take the liberty to add the code to the mixin.

    _.mixin(_.STRING, {
        log: function(string) {
            console.log(string);
        }
    });

This is now a working (though not complete) mixin. Try it out using the functional style.

    _.log("this is a string");

And with the object oriented style:

    _("this is a string").log();

Notice how the parameter passed to the `_` function is forwarded to the `log` mixin.

Although the mixin now works, it won't play nice with the method chaining features because it doesn't return a
value. This is a simple fix, though, so let's go back and add it.

    _.mixin(_.STRING, {
        log: function(string) {
            console.log(string);
            return string;
        }
    });

All that we're doing is returning the value passed to it for other mixins to manipulate. Skel takes care of
converting the value back to a skel object, unless the chaining option is disabled. Also, there is no need to
build a mixin to return the return value of a method chain as a regular value, this is taken care of by the
`value` property.

    console.log(_("string").log().value);

and

    _("string").log().log();

Will do the same thing.

## Prototypical style
You can also allow skel to extend the native prototypes with your mixins. There are numerous problems with
modifying the native prototypes. There are the well known compatibility issues, but there is also a disadvantage
in that it only works with objects (in other words, you can't apply mixins to `undefined` because it isn't an
object). However, if you know what you're doing, there are advantages too, such as code being more concise.

To enable the prototypical style, call `_.pollute.enable()`. This will add all existing and future mixins to the
prototypes. This is where `_.mixin`'s type parameter comes in. Only mixins for the correct data type will be
added to the prototypes. This means that the `log` mixin above will be added the the `String` prototype, but not
the `Number` prototype. If you want a mixin to be added to more than one prototype, pass an array as the type
parameter. If you want it to apply to **all** types, use `_.ALL`.

So now some demo code for prototypical style.

    var _ = require("./skel")._,
        __ = require("./skel").__;
    _.mixin(_.STRING, {
        log: function(string) {
            console.log(string);
            return string;
        }
    });
    _.pollute.enable();
    "string to log".log();
    
## Batch method calls
If you have the need to loop through an array of values and (only) run skel methods on them, you can do so using
the batch operation initializer. Instead of using the `_` function to initialize skel in OO style, you use `__`.
the difference is that methods will run on all elements in the list. The list can either be multiple arguments,
or a single array. It works with both chaining on and off, but not with the `_.limitToType` option turned on.
Here is some demo code:

    var _ = require("./skel")._,
        __ = require("./skel").__;
    _.mixin(_.NUMBER, {
        increment: function(number, amount) {
            return number + ((amount != null) ? amount : 1);
        }
    });
    _.mixin(_.ALL, {
        log: function(value) {
            console.log(value);
            return value;
        }
    });
    __([3, 4, 5]).increment().log();
    // or
    __([3, 4, 5]).increment().log();

The order of execution evaluates each method call for all the values before proceeding to the next method call,
so `__(3, 4, 5).log().log()` would log

    3
    4
    5
    3
    4
    5
    
not

    3
    3
    4
    4
    5
    5

## Customizing skel
Skel has numerous options for customization. I've mentioned some already, but here's a full list:

 * Disable method chaining in OO style: `_.chain = false;`
 * Make methods only work for the specified types in OO style: `_.limitToType = true;`
 * Enable prototypical style: `_.pollute.enable();`

## Appendix I: data types
 * `_.ARRAY`
 * `_.OBJECT`
 * `_.STRING`
 * `_.NUMBER`
 * `_.FUNCTION`
 * `_.REGEXP`
 * `_.ALL`