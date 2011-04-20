// // var skel = require("./skel"),
// //     _ = skel._,
// //     __ = skel.__;
// // _.pollute.enable();
// // _.mixin(_.STRING, {
// //   echo: function(string) {
// //     console.log(string);
// //     return string;
// //   }
// // });
// // var value = _("foo").echo().echo().value; // don't want to have to add value at the end? Turn off chaining:
// // // _.chain = false;
// // // or allow extension of native prototypes. If you do this, you won't be able to chain method calls
// // 
// // _.echo("foo"); // don't want OO? no problem.
// // 
// // "bar".echo(); // don't want to pollute the native prototypes? the remove the line `_.pollute.enable();`
// // 
// // // by default, this will work:
// // _(3).echo();
// // // even though the echo mixin was set for strings in the declaration.
// // // unless specified otherwise, the types specified in the mixin only matter for extending native prototypes.
// // // if you want the non-destructive OO method to work more similarly to the native prototypes, add:
// // // _.limitToType = true;
// // 
// // // for performing the same action for every item in an array, or just a fixed number of items,
// // // you can use the `__` method instead of `_`. It makes the methods you call act on all elements of the array
// // // that you pass, or for a cleaner but less dynamic alternative, all of the arguments you pass (if there is more
// // // than one argument you pass or the first is not an array)
// // __("foo", "bar", "baz").echo();
// // __(["some", "array", "elements"]).echo();
// // 
// // // it even works with the chaining options
// // __("foo", "bar", "baz").echo().echo();
// // 
// // // but because of performance concerns it does not work with the limit to type option (testing the type of
// // // all elements is unnecisarily inefficient). Also, this obviously does not work with prototypical style,
// // // because you have a list of strings. Adding them to Array would conflict with the non-batch methods.
// // 
// // // If you desperately wanted to add them to the array prototype, you could create a mixin on the array type
// // // that returns the array as an `__` object. Or better yet, a ES5 getter on Arrays:
// // /*
// // Object.defineProperty(Array.prototype, "batch", {
// //   get: function() {
// //     return __(this);
// //   }
// // });
// // */
// var _ = require("./skel")._,
//     __ = require("./skel").__;
// _.mixin(_.NUMBER, {
//     increment: function(number, amount) {
//         return number + ((amount != null) ? amount : 1);
//     }
// });
// _.mixin(_.ALL, {
//     log: function(value) {
//         console.log(value);
//         return value;
//     }
// });
// __([3, 4, 5]).increment().log();
// // or
// __([3, 4, 5]).increment().log();