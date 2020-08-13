'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = serializeHeaders;

var _object = require("@valkyriestudios/utils/object");

var _array = require("@valkyriestudios/utils/array");

//
//  EXPORTS
//
function serializeHeaders(options, NET_CONFIG) {
  var options_headers = options.headers || {};
  var default_headers = NET_CONFIG.headers || {};

  if ((0, _array.isArray)(options_headers) || !(0, _object.isObject)(options_headers)) {
    throw new TypeError('NET:serializeHeaders options.headers was set to a non-object structure. An object is required.');
  }

  if ((0, _array.isArray)(default_headers) || !(0, _object.isObject)(default_headers)) {
    throw new TypeError('NET:serializeHeaders NET_CONFIG.headers was set to a non-object structure. An object is required.');
  } //  Combine the headers with specificity being given to options.headers


  return Object.assign({}, default_headers, options_headers);
}