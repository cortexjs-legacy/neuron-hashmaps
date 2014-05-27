'use strict';

var expect = require('chai').expect;
var hashmaps = require('../');
var jsonfile = require('jsonfile');
var node_path = require('path');

var file = node_path.join(__dirname, 'fixtures', 'shrinkwrap.json');
var expect_file = node_path.join(__dirname, 'fixtures', 'expected.js');
var shrinkwrap = jsonfile.readFileSync(file);
var expected = require(expect_file);

var hm = hashmaps(shrinkwrap);

describe(".ranges", function(){
  var ranges = hm.ranges;
  it("uses the first met range", function(){
    expect(ranges).to.deep.equal(expected.ranges);
  });
});


describe(".depTree", function(){
  var depTree = hm.depTree;

  it("dependencies", function(){
    expect(depTree).to.deep.equal(expected.depTree);
  });
});


describe(".engines()", function(){
  var engines = hm.engines('a', '0.1.0');

  it("engines", function(){
    expect(engines).to.deep.equal(expected.engines);
  });

  it("should return null if package not found", function(){
    expect(hm.engines('a', '0.2.0')).to.equal(null);
    expect(hm.engines('a')).to.equal(null);
    expect(hm.engines()).to.equal(null);
  });
});
