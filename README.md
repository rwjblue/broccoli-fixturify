# Broccoli Fixturify

[![Build Status](https://travis-ci.org/rjackson/broccoli-fixturify.svg?branch=master)](https://travis-ci.org/rjackson/broccoli-fixturify)

## Usage

Create a subdirectory tree with [fixturify](https://github.com/joliss/node-fixturify):

```javascript
var fixtureTree = require('broccoli-fixturify');

var desiredDirectory = {
  'foo.txt': 'foo.txt contents',
  'subdir': {
    'bar.txt': 'bar.txt contents'
  }
}

var tree = fixtureTree(desiredDirectory);
```

## Documentation

### `fixtureTree(fixturifyObjectTree)`

`fixturifyObjectTree` *{Object}*

This will be used by `fixturify` to generate a directory tree based on the file input.

## ZOMG!!! TESTS?!?!!?

I know, right?

Running the tests:

```javascript
npm install
npm test
```

## License

This project is distributed under the MIT license.
