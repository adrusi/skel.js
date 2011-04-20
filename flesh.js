/**
 * Flesh.js: a skel.js interface for underscore.js
 * 
 * Underscore.js is a great collection of utilities, and there's no need to reinvent the wheel,
 * so flesh was designed to bring the power of underscore.js to the flexibility of skel.js.
 */
var $ = require("./skel")._,
    _ = require("underscore")._;

$.mixin([$.ARRAY, $.OBJECT], {
  each: function(list, iterator, context) {
    return _.each(list, iterator, context);
  },
  map: function(list, iterator, context) {
    return _.map(list, iterator, context);
  },
  reduce: function(list, iterator, memo, context) {
    return _.reduce(list, iterator, memo, context);
  },
  reduceRight: function(list, iterator, memo, context) {
    return _.reduceRight(list, iterator, memo, context);
  },
  detect: function(list, iterator, context) {
    return _.detect(list, iterator, context);
  },
  select: function(list, iterator, context) {
    return _.select(list, iterator, context);
  },
  reject: function(list, iterator, context) {
    return _.reject(list, iterator, context);
  },
  all: function(list, iterator, context) {
    return _.all(list, iterator, context);
  },
  any: function(list, iterator, context) {
    return _.any(list, iterator, context);
  },
  include: function(list, value) {
    return _.include(list, value);
  },
  invoke: function() {
    return _.invoke.apply(this, arguments);
  },
  pluck: function(list, propertyName) {
    return _.pluck(list, propertyName);
  },
  max: function(list, iterator, context) {
    return _.map(list, iterator, context);
  },
  min: function(list, iterator, context) {
    return _.min(list, iterator, context);
  },
  sortBy: function(list, iterator, context) {
    return _.sortBy(list, iterator, context);
  },
  sortedIndex: function(list, value, iterator) {
    return _.sortedIndex(list, value, iterator);
  },
  toArray: function(list) {
    return _.toArray(list);
  },
  size: function(list) {
    return _.size(list);
  }
});

$.mixin($.ARRAY, {
  first: function(array, n) {
    return _.first(array, n);
  },
  rest: function(array, index) {
    return _.rest(array, index);
  },
  last: function(array) {
    return _.last(array);
  },
  compact: function(array) {
    return _.compact(array);
  },
  flatten: function(array) {
    return _.flatten(array);
  },
  without: function() {
    return _.without.apply(this, arguments);
  },
  uniq: function(array, isSorted) {
    return _.uniq(array, isSorted);
  },
  intersect: function() {
    return _.intersect.apply(this, arguments);
  },
  zip: function() {
    return _.zip.apply(this, arguments);
  },
  indexOf: function(array, value, isSorted) {
    return _.indexOf(array, value, isSorted);
  },
  lastIndexOf: function(array, value, isSorted) {
    return _.lastIndexOf(array, value, isSorted);
  },
  range: function(start, stop, step) {
    return _.range(start, stop, step);
  }
});

$.mixin($.FUNCTION, {
  bind: function() {
    return _.bind.apply(this, arguments);
  }
});

exports._ = $;