var _, __;
_ = function(value) {
  if (arguments.length > 1) {
    value = Array.prototype.slice.call(arguments);
  }
  return new _.__oop__(value);
};

__ = function() {
  var args = (arguments.length === 1 && toString.call(arguments[0]) === "[object Array]") ?
        arguments[0] : Array.prototype.slice.call(arguments);
  return new _.__oop__list__(args);
}

_.ARRAY = "array";
_.OBJECT = "object";
_.NUMBER = "number";
_.STRING = "string";
_.FUNCTION = "fn";
_.REGEXP = "regexp";
_.ALL = [_.ARRAY, _.OBJECT, _.NUMBER, _.STRING, _.FUNCTION, _.REGEXP];

_.chain = true;
_.limitToType = false;
_.fn = {};
_.types = {
  array: {},
  object: {},
  number: {},
  string: {},
  fn: {},
  regexp: {}
};

_.__oop__ = function(value) {
  if (_.limitToType) {
    var type;
    switch (typeof value) {
      case "object":
        switch (toString.call(value)) {
          case "[object Array]": type = "array"; break;
          case "[object Number]": type = "number"; break;
          case "[object String]": type = "string"; break;
          default: type = "object";
        }
        break;
      case "number": type = "number"; break;
      case "string": type = "string"; break;
      case "function":
        switch (toString.call(value)) {
          case "[object RegExp]": type = "regexp"; break;
          default: type = "fn";
        }
        break;
    }
    for (util in _.types[type]) {
      if (typeof _.types[type][util] === "function") {
        this[util] = _.chain ?
          function() {
            return _(_.types[type][util].apply(this, [value].concat(Array.prototype.slice.call(arguments))));
          } :
          function() {
            return _.types[type][util].apply(this, [value].concat(Array.prototype.slice.call(arguments)));
          };
      }
    }
    if (_.chain) {
      this.value = value;
    }
  }
  else {
    for (util in _) {
      if (typeof _[util] === "function") {
        this[util] = _.chain ?
          (function() {
            var _util = util;
            return function() {
              return _(_[_util].apply(this, [value].concat(Array.prototype.slice.call(arguments))));
            }
          }()) :
          (function() {
            var _util = util;
            return function() {
              return _[_util].apply(this, [value].concat(Array.prototype.slice.call(arguments)));
            }
          }());
      }
    }
    if (_.chain) {
      this.value = value;
    }
  }
}

_.__oop__list__ = function(values) {
  for (util in _) {
    if (typeof _[util] === "function") {
      this[util] = _.chain ?
        (function() {
          var _util = util;
          return function() { 
            var returns = [], value;
            for (var i = 0; i < values.length; i++) {
              value = values[i];
              returns.push(_[_util].apply(this, [value].concat(Array.prototype.slice.call(arguments))));
            }
            return __(returns);
          };
        }()) :
        (function() {
          var _util = util;
          return function() {
            var returns = [];
            for (var i = 0; i < values.length; i++) {
              value = values[i];
              returns.push(_[_util].apply(this, [value].concat(Array.prototype.slice.call(arguments))));
            }
            return returns;
          };
        }());
    }
  }
  if (_.chain) {
    this.value = values;
  }
}

_.mixin = function() {
  var args = [].slice.call(arguments);
  for (var i = 0; i < args.length; i++) {
    if (toString.call(args[i]) === "[object Array]") {
      var fnArray = true;
      for (var j = 0; j < args[i].length; j++) {
        if (typeof args[i][j] !== "function" || args[i][j].name == null) {
          fnArray = false;
          break;
        }
      }
      if (fnArray) {
        var obj = {};
        for (var j = 0; j < args[i].length; j++) {
          obj[args[i][j].name] = args[i][j];
        }
        args[i] = obj;
        _.mixin.apply(this, args);
        return;
      }
    }
    else if (typeof args[i] === "function" && args[i].name != null) {
      var obj = {};
      obj[args[i].name] = args[i];
      args[i] = obj;
      _.mixin.apply(this, args);
      return;
    }
  }
  var types = args[0], mixins = args[1];
  if (mixins == null && toString.call(types) !== "[object Array]" && toString.call(types) !== "[object String]") {
    mixins = types;
    types = _.ALL;
  }
  if (toString.call(types) === "[object String]") {
    types = [types];
  }
  for (var name in mixins) {
    var mixin = mixins[name];
    if (typeof mixin === "function") {
      for (var i = 0; i < types.length; i++) {
        _.types[types[i]][name] = mixin;
        if (_.pollute.enabled) _.pollute(types[i], name);
      }
      _.fn[name] = _[name] = mixin;
      if (_.globalize.enable && global[name] == null) global[name] = mixin;
    }
  }
};

_.globalize = function() {
  for (var key in _.fn) {
    if (_.fn.hasOwnProperty(key) && global[key] == null) {
      global[key] = _.fn[key];
    }
  }
  _.globalize.enable = true;
}
_.globalize.enable = false;

_.pollute = function(type, name) {
  switch (type) {
    case "object":
      if (typeof Object.prototype[name] !== "function") {
        Object.prototype[name] = function() {
          return _.types.object[name].apply(this, [this].concat(Array.prototype.slice.call(arguments)));
        };
      }
      break;
    case "array":
      if (typeof Array.prototype[name] !== "function") {
        Array.prototype[name] = function() {
          return _.types.array[name].apply(this, [this].concat(Array.prototype.slice.call(arguments)));
        };
      }
      break;
    case "number":
      if (typeof Number.prototype[name] !== "function") {
        Number.prototype[name] = function() {
          return _.types.number[name].apply(this, [this.valueOf()].concat(Array.prototype.slice.call(arguments)));
        };
      }
      break;
    case "string":
      if (typeof String.prototype[name] !== "function") {
        String.prototype[name] = function() {
          return _.types.string[name].apply(this, [this.valueOf()].concat(Array.prototype.slice.call(arguments)));
        };
      }
      break;
    case "fn":
      if (typeof Function.prototype[name] !== "function") {
        Function.prototype[name] = function() {
          return _.types.fn[name].apply(this, [this].concat(Array.prototype.slice.call(arguments)));
        };
      }
      break;
    case "regexp":
      if (typeof RegExp.prototype[name] !== "function") {
        RegExp.prototype[name] = function() {
          return _.types.regexp[name].apply(this, [this].concat(Array.prototype.slice.call(arguments)));
        };
      }
      break;
  }
}
_.pollute.enabled = false;
_.pollute.enable = function() {
  _.pollute.enabled = true;
  for (name in _.types.object) {
    if (typeof Object.prototype[name] !== "function") {
      Object.prototype[name] = function() {
        return _.types.object[name].apply(this, [this].concat(Array.prototype.slice.call(arguments)));
      };
    }
  }
  for (name in _.types.array) {
    if (typeof Array.prototype[name] !== "function") {
      Array.prototype[name] = function() {
        return _.types.array[name].apply(this, [this].concat(Array.prototype.slice.call(arguments)));
      };
    }
  }
  for (name in _.types.number) {
    if (typeof Number.prototype[name] !== "function") {
      Number.prototype[name] = function() {
        return _.types.number[name].apply(this, [this.valueOf()].concat(Array.prototype.slice.call(arguments)));
      };
    }
  }
  for (name in _.types.string) {
    if (typeof String.prototype[name] !== "function") {
      String.prototype[name] = function() {
        return _.types.string[name].apply(this, [this.valueOf()].concat(Array.prototype.slice.call(arguments)));
      };
    }
  }
  for (name in _.types.fn) {
    if (typeof Function.prototype[name] !== "function") {
      Function.prototype[name] = function() {
        return _.types.fn[name].apply(this, [this].concat(Array.prototype.slice.call(arguments)));
      };
    }
  }
  for (name in _.types.regex) {
    if (typeof RegExp.prototype[name] !== "function") {
      RegExp.prototype[name] = function() {
        return _.types.regexp[name].apply(this, [this].concat(Array.prototype.slice.call(arguments)));
      };
    }
  }
}

exports._ = _;
exports.__ = __;
exports.install = function(reg, batch) {
  global[reg] = _;
  global[batch] = __;
}