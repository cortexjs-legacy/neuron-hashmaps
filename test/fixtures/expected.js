'use strict';

// {
//   "name": "a",
//   "version": "0.1.0",
//   "dependencies": {
//     "b": {
//       "from": "b@~1.0.0",
//       "version": "1.0.3",
//       "dependencies": {
//         "c": {
//           "from": "c@~2.0.0",
//           "version": "2.0.9"
//         }
//       },
//       "asyncDependencies": {
//         "d": {
//           "from": "d@~3.0.0",
//           "version": "3.0.12"
//         }
//       }
//     },
//     "c": {
//       "from": "c@~2.0.0", 
//       "// commments": "this is a version different from the c of b's dependencies",
//       "version": "2.0.10"
//     }
//   }
// }

module.exports = {
  ranges: {
    b: {
      '~1.0.0': '1.0.3'
    },
    c: {
      '~2.0.0': '2.0.10'
    },
    d: {
      '~3.0.0': '3.0.12'
    },
    neuron: {
      '~5.0.0': '5.0.0'
    }
  },
  depTree: {
    a: {
      '0.1.0': [
        {
          b: '~1.0.0',
          c: '~2.0.0'
        },
        {}
      ]
    },
    b: {
      '1.0.3': [
        {
          c: '~2.0.0'
        },
        {
          d: '~3.0.0'
        }
      ]
    }
  },
  engines: [
    {
      name: 'neuron',
      version: '5.0.0'
    }
  ]
};
