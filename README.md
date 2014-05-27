# neuron-hashmaps [![NPM version](https://badge.fury.io/js/neuron-hashmaps.svg)](http://badge.fury.io/js/neuron-hashmaps) [![Build Status](https://travis-ci.org/cortexjs/neuron-hashmaps.svg?branch=master)](https://travis-ci.org/cortexjs/neuron-hashmaps) [![Dependency Status](https://gemnasium.com/cortexjs/neuron-hashmaps.svg)](https://gemnasium.com/cortexjs/neuron-hashmaps)

Utilities to generate range map and dependency tree for [neuron](http://github.com/kaelzhang/neuron).

## Install

```bash
$ npm install neuron-hashmaps --save
```

## Usage

```js
var hashmaps = require('neuron-hashmaps');
```

## hashmaps(shrinkwrap)

```js
var hm = hashmaps(shrink_json);
var neuron_text = util.format(
  'neuron.config({ranges: %s, depTree: %s});',
  JSON.stringify(hm.ranges),
  JSON.stringify(hm.depTree)
);
```

- shrinkwrap `Object` the object of the shrinkwrap.json

Initializes the hashmaps from the shrinkwrap object

### .ranges

```js
jquery: {
  '~1.9.0': '1.9.3'
},
```

Returns `Object` the range map which is the value of `neuron.config.ranges`

Gets the current range map.

### .depTree

```js
mbox: [
  // dependencies
  {
    jquery: '~1.9.0'
  },
  // async dependencies
  {
    hippo: '~1.0.0'
  }
],
```

Returns `Object` the deps tree which is the value of `neuron.config.depTree`

### .engines(name, version)

```js
[
  {
    name: 'neuron',
    version: '5.0.0'
  },
  ...
]
```

- name `String`
- version `String`

Returns `Array` the engines of the specified package.


## License

MIT
