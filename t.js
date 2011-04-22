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
    var str = "", i;
    for (i = 0; i < arguments.length; i++) {
      str += arguments[i];
    }
    console.log(str);
    return arguments[0];
  },
  function capitalize(string) {
    var arr = string.split(/\b/);
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join("");
  }
]);
_.globalize();
_("foo bar").capitalize().echo(" is \"foo bar\" capitalized");
echo(capitalize("foo bar"), " is \"foo bar\" capitalized");