'use strict';

var expect = require('chai').expect;
var hashmaps = require('../');
var jsonfile = require('jsonfile');
var node_path = require('path');

var file = node_path.join(__dirname, 'fixtures', 'shrinkwrap.json');
var shrinkwrap = jsonfile.readFileSync(file);

var hm = hashmaps(shrinkwrap);



describe(".ranges()", function(){
  var ranges = hm.ranges();
  it("uses the first met range", function(){
    expect(ranges.c['~2.0.0']).to.equal('2.0.9');
    expect(ranges.d['~3.0.0']).to.equal('3.0.12');
  });
});


describe(".depTree()", function(){
  var depTree = hm.depTree();

  it("dependencies", function(){
    expect(depTree.a['0.1.0'][0].b).to.equal('~1.0.0');
    expect(depTree.b['1.0.3'][1].d).to.equal('~3.0.0');
  });
});