'use strict';

var expect = require('chai').expect;
var hashmaps = require('../');
var jsonfile = require('jsonfile');
var node_path = require('path');

var file = node_path.join(__dirname, 'fixtures', 'shrinkwrap.json');
var shrinkwrap = jsonfile.readFileSync(file);

describe("hashmaps(shrinkwrap)", function(){
  var hm = hashmaps(shrinkwrap);
  var rangeMap = hm.rangeMap();
  var depsTree = hm.depsTree();

  it("uses the first met range", function(done){
    expect(rangeMap.c['~2.0.0']).to.equal('2.0.9');
  });
});