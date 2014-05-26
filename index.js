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
  Object.keys(tree).forEach(function (name) {
    var versions = tree[name];

    Object.keys(versions).forEach(function (version) {
      var sub_dep_tree = dep_tree[name];

      if (sub_dep_tree) {
        // already parsed
        if (version in sub_dep_tree) {
          return;
        }
      }

      var info = versions[version];

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
  Object.keys(dependencies).forEach(function (name) {
    var ranges = dependencies[name];
    Object.keys(ranges).forEach(function (range) {
      var version = ranges[range];
      console.log(range, version, name)
      // adds into dependency tree
      host[name] = range;

      // adds to range map
      self._addRange(name, range, version);
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

