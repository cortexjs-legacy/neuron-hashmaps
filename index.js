'use strict';

module.exports = hashmap;


function hashmap (shrinkwrap) {
  return new HashMap(shrinkwrap);
}

function HashMap (shrinkwrap) {
  this.shrinkwrap = shrinkwrap;
  this._rangeMap = {};
  this._depsTree = {};
  this._walk(shrinkwrap);
}


HashMap.prototype.rangeMap = function() {
  return this._rangeMap;
};


HashMap.prototype.depsTree = function() {
  return this._depsTree;
};


HashMap.prototype._walk = function(node) {
  var name = node.name;
  var version = node.version;

  if (node.from) {
    range = this._pasePkg(node.from).range;
    this._addRange();
  }

  var depsTree = this._depsTree;
  var pkg = depsTree[name] || (depsTree[name] = {});
  if (version in pkg) {
    return;
  }

  var deps = {};
  var asyncDeps = {};
  pkg[version] = [deps, asyncDeps];
  this._addDeps(deps, node.dependencies);
  this._addDeps(asyncDeps, node.asyncDependencies);
};


HashMap.prototype._addDeps = function(host, dependencies) {
  if (!dependencies) {
    return;
  }

  var name;
  var node;
  var range;

  for (name in dependencies) {
    node = dependencies[name];
    range = this._parsePkg(node.from);
    host[name] = range;
  }
};


hashMap.prototype._addRange = function (name, range, version) {
  var rangeMap = this._rangeMap;
  var pkg = rangeMap[name] || (rangeMap[name] = {});

  // already exists, skip
  if (range in pkg) {
    return;
  }

  pkg[range] = version;
};


// 'a@~0.2.3'
// -> 
// {
//   name: 'a',
//   range: '~0.2.3'
// }
HashMap.prototype._parsePkg = function(pkg) {
  var split = pkg.split('@');

  return {
    name: split[0],
    range: split[1]
  };
};
