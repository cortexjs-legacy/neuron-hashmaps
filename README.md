# neuron-hashmaps [![NPM version](https://badge.fury.io/js/neuron-hashmaps.svg)](http://badge.fury.io/js/neuron-hashmaps) [![Build Status](https://travis-ci.org/cortexjs/neuron-hashmaps.svg?branch=master)](https://travis-ci.org/cortexjs/neuron-hashmaps) [![Dependency Status](https://gemnasium.com/cortexjs/neuron-hashmaps.svg)](https://gemnasium.com/cortexjs/neuron-hashmaps)

Utilities to generate range map and dependency tree for neuron.

## Install

```bash
$ npm install neuron-hashmaps --save
```

## Usage

```js
var hashmaps = require('neuron-hashmaps');
```

## hashmaps(shrinkwrap)

- shrinkwrap `Object` the object of the shrinkwrap.json

Initializes the hashmaps from the shrinkwrap object

### .rangeMap()

Returns `Object` the range map.

Gets the current range map.


### .depsTree()

Returns `Object` the deps tree

## License

MIT
