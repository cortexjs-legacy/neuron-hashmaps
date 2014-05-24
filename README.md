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

### .add(sub_dependency_tree, options)

```js
hashmaps.add({
  {
    name: 'align'
    version: '0.1.0',
    dependencies: {
      jquery: {
        from: 'jquery@~1.9.2',
        version: '1.9.2'
      }
    }
  }
}, {
  replace: true
});
```

- sub_dependency_tree `Object`
- options `Object=`
  - replace `Boolean` whether should replace the current dependency tree

Adds a new sub tree into the current dependency tree, and updates the old one.

Returns `this`

### .stringify(options)

- options `Object=`
  - format `String='js'` 

Returns `String` 

### .get()

Returns `Object`.

Gets the current range map.

## License

MIT
