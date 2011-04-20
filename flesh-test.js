var _ = require("./flesh")._;
_({foo: "bar"}).each(function(value, key) {
  console.log(key, value);
});
var func = function(greeting) { return greeting + ': ' + this.name };
// func = _.bind(func, {name : 'moe'}, 'hi');
// console.log(func());
_.pollute.enable();
//console.log(func.bind({name: 'moe'}, 'hi'));
({foo: "bar"}).each(function(value, key) {
  console.log(key, value);
});