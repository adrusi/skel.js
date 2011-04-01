var _;
_ = function(value) {
  if (arguments.length > 1) {
    value = Array.prototype.split(arguments);
  }
  return new _.__oop__(value);
};

_.ARRAY = "array";
_.OBJECT = "object";
_.NUMBER = "number";
_.STRING = "string";
_.FUNCTION = "fn";
_.REGEXP = "regexp";
_.ALL = [_.ARRAY, _.OBJECT, _.NUMBER, _.STRING, _.FUNCTION, _.REGEXP];

_.chain = true;
_.limitToType = false;
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
          function() {
            return _(_[util].apply(this, [value].concat(Array.prototype.slice.call(arguments))));
          } :
          function() {
            return _[util].apply(this, [value].concat(Array.prototype.slice.call(arguments)));
          };
      }
    }
    if (_.chain) {
      this.value = value;
    }
  }
}
_.mixin = function(types, mixins) {
  if (mixins == null && toString.call(types) !== "[object Array]" && toString.call(types) !== "[object String]") {
    mixins = types;
    types = _.ALL;
  }
  if (toString.call(types) === "[object String]") {
    types = [types];
  }
  for (name in mixins) {
    var mixin = mixins[name];
    if (typeof mixin === "function") {
      for (var i = 0; i < types.length; i++) {
        _.types[types[i]][name] = mixin;
        if (_.pollute.enabled) _.pollute(types[i], name);
      }
      _[name] = mixin;
    }
  }
};

_.pollute = function(type, name) {
  switch (type) {
    case "object":
      Object.prototype[name] = function() {
        return _.types.object[name].apply(this, [this].concat(Array.prototype.slice.call(arguments)));
      };
      break;
    case "array":
      Array.prototype[name] = function() {
        return _.types.array[name].apply(this, [this].concat(Array.prototype.slice.call(arguments)));
      };
      break;
    case "number":
      Number.prototype[name] = function() {
        return _.types.number[name].apply(this, [this.valueOf()].concat(Array.prototype.slice.call(arguments)));
      };
      break;
    case "string":
      String.prototype[name] = function() {
        return _.types.string[name].apply(this, [this.valueOf()].concat(Array.prototype.slice.call(arguments)));
      };
      break;
    case "fn":
      Function.prototype[name] = function() {
        return _.types.fn[name].apply(this, [this].concat(Array.prototype.slice.call(arguments)));
      };
      break;
    case "regexp":
      RegExp.prototype[name] = function() {
        return _.types.regexp[name].apply(this, [this].concat(Array.prototype.slice.call(arguments)));
      };
      break;
  }
}
_.pollute.enabled = false;
_.pollute.enable = function() {
  _.pollute.enabled = true;
  for (name in _.types.object) {
    Object.prototype[name] = function() {
      return _.types.object[name].apply(this, [this].concat(Array.prototype.slice.call(arguments)));
    };
  }
  for (name in _.types.array) {
    Array.prototype[name] = function() {
      return _.types.array[name].apply(this, [this].concat(Array.prototype.slice.call(arguments)));
    };
  }
  for (name in _.types.number) {
    Number.prototype[name] = function() {
      return _.types.number[name].apply(this, [this.valueOf()].concat(Array.prototype.slice.call(arguments)));
    };
  }
  for (name in _.types.string) {
    String.prototype[name] = function() {
      return _.types.string[name].apply(this, [this.valueOf()].concat(Array.prototype.slice.call(arguments)));
    };
  }
  for (name in _.types.fn) {
    Function.prototype[name] = function() {
      return _.types.fn[name].apply(this, [this].concat(Array.prototype.slice.call(arguments)));
    };
  }
  for (name in _.types.regex) {
    RegExp.prototype[name] = function() {
      return _.types.regexp[name].apply(this, [this].concat(Array.prototype.slice.call(arguments)));
    };
  }
}

exports._ = _;