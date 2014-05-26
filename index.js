'use strict';

module.exports = hashmap;


function hashmap (shrinkwrap) {
  return new HashMap(shrinkwrap);
}

function HashMap (shrinkwrap) {
  this.shrinkwrap = shrinkwrap;
  this._ranges = {};
  this._depTree = {};
  this._walk(shrinkwrap);
}


HashMap.prototype.ranges = function() {
  return this._ranges;
};


HashMap.prototype.depTree = function() {
  return this._depTree;
};


HashMap.prototype._walk = function(node) {
  var name = node.name;
  var version = node.version;

  if (node.from) {
    var parsed = this._parsePkg(node.from);
    var range = parsed.range;
    name = parsed.name;
    this._addRange(name, range, version);
  }

  var depTree = this._depTree;
  var pkg = depTree[name] || (depTree[name] = {});
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
    range = this._parsePkg(node.from).range;
    host[name] = range;
    this._walk(node);
  }
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
