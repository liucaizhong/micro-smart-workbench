'use strict';

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

// fetch() polyfill for making API calls.
require('whatwg-fetch');

// add babel-polyfill for compatibility
require('babel-polyfill');

// a polyfill of the ES6 Promise
// require('es6-promise').polyfill();

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
if (Object.assign === 'undefined') {
  Object.assign = require('object-assign');
}
