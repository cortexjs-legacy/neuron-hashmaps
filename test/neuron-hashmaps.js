'use strict';

var expect = require('chai').expect;
var hashmaps = require('../');
var jsonfile = require('jsonfile');
var node_path = require('path');

var file = node_path.join(__dirname, 'fixtures', 'shrinkwrap.json');
var shrinkwrap = jsonfile.readFileSync(file);

var hm = hashmaps(shrinkwrap);



describe(".rangeMap()", function(){
  var rangeMap = hm.rangeMap();
  it("uses the first met range", function(){
    expect(rangeMap.c['~2.0.0']).to.equal('2.0.9');
    expect(rangeMap.d['~3.0.0']).to.equal('3.0.12');
  });
});


describe(".depsTree()", function(){
  var depsTree = hm.depsTree();

  it("dependencies", function(){
    expect(depsTree.a['0.1.0'][0].b).to.equal('~1.0.0');
    expect(depsTree.b['1.0.3'][1].d).to.equal('~3.0.0');
  });
});