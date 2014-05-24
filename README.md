# neuron-hashmaps [![NPM version](https://badge.fury.io/js/neuron-hashmaps.svg)](http://badge.fury.io/js/neuron-hashmaps) [![Build Status](https://travis-ci.org/cortexjs/neuron-hashmaps.svg?branch=master)](https://travis-ci.org/cortexjs/neuron-hashmaps) [![Dependency Status](https://gemnasium.com/cortexjs/neuron-hashmaps.svg)](https://gemnasium.com/cortexjs/neuron-hashmaps)

<!-- description -->

## Install

```bash
$ npm install neuron-hashmaps --save
```

## Usage

```js
var hashmaps = require('neuron-hashmaps')();
```

### .from(shrinkwrap)

- shrinkwrap `Object` 

Initializes the 

### .add(sub_dependency_tree, options)

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