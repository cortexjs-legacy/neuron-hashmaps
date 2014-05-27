'use strict';

module.exports = hashmap;
var shrinked = require('shrinked');

function hashmap (shrinkwrap) {
  var tree = shrinked.parse(shrinkwrap, {
    dependencyKeys: ['dependencies', 'asyncDependencies', 'engines']
  });

  return hashmap.parseShrinked(tree);
};


// @param {Object} tree http://npmjs.org/package/shrinked
hashmap.parseShrinked = function(tree) {
  return hashmap._parse(tree);
};


hashmap._parse = function(tree) {
  var ranges = {};
  var dep_tree = {};

  hashmap._each(tree, function (name, version, info) {
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
    hashmap._addDeps(ranges, info.dependencies, deps);
    hashmap._addDeps(ranges, info.asyncDependencies, async_deps);
    hashmap._addDeps(ranges, info.engines);
  });

  return {
    ranges: ranges,
    depTree: dep_tree,
    engines: function (name, version) {
      return hashmap._getEngines(tree, name, version);
    }
  };
};


hashmap._addDeps = function(ranges, dependencies, host) {
  if (!dependencies) {
    return;
  }

  hashmap._each(dependencies, function (name, range, version) {
    if (range === '*') {
      range = 'latest';
    }
    
    if (host) {
      // adds into dependency tree
      host[name] = range;
    }
    // adds to range map
    hashmap._addRange(ranges, name, range, version);
  });
};


// Each, depth: 2
hashmap._each = function(object, callback) {
  Object.keys(object).forEach(function (a) {
    var _a = object[a];
    Object.keys(_a).forEach(function (b) {
      var c = _a[b];
      callback(a, b, c);
    });
  });
};


hashmap._addRange = function (ranges, name, range, version) {
  var pkg = ranges[name] || (ranges[name] = {});

  // already exists, skip
  if (range in pkg) {
    return;
  }

  pkg[range] = version;
};


hashmap._getEngines = function (tree, name, version) {
  var pkg = tree[name] && tree[name][version];

  // module not found
  if (!pkg) {
    return null;
  }

  var engines = pkg.engines || {};
  var array = [];
  hashmap._each(engines, function (ename, erange, eversion) {
    array.push({
      name: ename,
      version: eversion
    });
  });

  return array;
};

