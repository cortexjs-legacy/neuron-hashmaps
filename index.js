'use strict';

module.exports = hashmap;

var shrinked = require('shrinked');

function hashmap (shrinkwrap) {
  return new HashMap(shrinkwrap);
}

function HashMap (shrinkwrap) {
  var ranges = this._ranges = {};
  var dep_tree = this._depTree = {};
  var tree = shrinked.parse(shrinkwrap, {
    dependencyKeys: ['dependencies', 'asyncDependencies']
  });

  var self = this;
  this._each(tree, function (name, version, info) {
    var sub_dep_tree = dep_tree[name];

    if (sub_dep_tree) {
      // already parsed
      if (version in sub_dep_tree) {
        return;
      }
    }

    // There's no dependencies, i.e. no subtle trees
    if (!info.dependencies && !info.asyncDependencies) {
      return;
    }

    sub_dep_tree = sub_dep_tree || (dep_tree[name] = {});

    var deps = {};
    var async_deps = {};
    sub_dep_tree[version] = [deps, async_deps];
    self._addDeps(deps, info.dependencies);
    self._addDeps(async_deps, info.asyncDependencies);
  });
}


HashMap.prototype.ranges = function() {
  return this._ranges;
};


HashMap.prototype.depTree = function() {
  return this._depTree;
};


HashMap.prototype._addDeps = function(host, dependencies) {
  if (!dependencies) {
    return;
  }

  var self = this;
  this._each(dependencies, function (name, range, version) {
    // adds into dependency tree
    host[name] = range;

    // adds to range map
    self._addRange(name, range, version);
  });
};


// Each, depth: 2
HashMap.prototype._each = function(object, callback) {
  Object.keys(object).forEach(function (a) {
    var _a = object[a];
    Object.keys(_a).forEach(function (b) {
      var c = _a[b];
      callback(a, b, c);
    });
  });
};


HashMap.prototype._addRange = function (name, range, version) {
  var ranges = this._ranges;
  var pkg = ranges[name] || (ranges[name] = {});

  // already exists, skip
  if (range in pkg) {
    return;
  }

  pkg[range] = version;
};

