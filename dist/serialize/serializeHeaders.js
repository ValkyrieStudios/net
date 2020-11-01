'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = serializeHeaders;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/object/is"));

var _is2 = _interopRequireDefault(require("@valkyriestudios/utils/array/is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//
//  EXPORTS
//
function serializeHeaders(options, NET_CONFIG) {
  var options_headers = options.headers || {};
  var default_headers = NET_CONFIG.headers || {};

  if ((0, _is2["default"])(options_headers) || !(0, _is["default"])(options_headers)) {
    throw new TypeError('NET:serializeHeaders options.headers was set to a non-object structure. An object is required.');
  }

  if ((0, _is2["default"])(default_headers) || !(0, _is["default"])(default_headers)) {
    throw new TypeError('NET:serializeHeaders NET_CONFIG.headers was set to a non-object structure. An object is required.');
  } //  Combine the headers with specificity being given to options.headers


  return Object.assign({}, default_headers, options_headers);
}