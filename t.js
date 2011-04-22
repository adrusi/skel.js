// var _  = require("./skel")._,
//     __ = require("./skel").__;
// _.mixin(_.ALL, {
//   echo: function(string1, string2) {
//     console.log(string1 + " " + string2);
//     return string1;
//   }
// });
// _.echo(_.echo("some", "thing"), "other thing");
// _("some").echo("thing");
// _([1, 2, 3]).echo([4, 5, 6]).echo([7, 8, 9]);
// _(1, 2, 3).echo("");
// _.pollute.enable();
// "some".echo("thing");
// __("foo", "bar", "baz").echo("bak");
require("skel").install("_", "__");
_.mixin(_.STRING, [
  function echo() {
    console.log([].slice.call(arguments));
    return arguments[0];
  },
  function capitalize(string) {
    return string.toUpper();
  }
]);
// _.mixin(_.STRING, function echo() {
//   console.log([].slice.call(arguments));
//   return arguments[0];
// });
// 
// _.mixin(_.STRING, function capitalize(string) {
//   return string.toUpper();
// });
// _.mixin(_.STRING, {
//   echo: function() {
//     console.log([].slice.call(arguments));
//     return arguments[0];
//   }
// });
// 
// _.mixin(_.STRING, {
//   capitalize: function(string) {
//     return string.toUpper();
//   }
// });
//_.echo(_.capitalize("foo"));
console.log(_.echo);