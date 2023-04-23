'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = serializeHeaders;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/object/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//  Combine option headers and default headers
//
//  @param object   options     Options object
//  @param object   NET_CONFIG  Default net configuration object
function serializeHeaders(options, NET_CONFIG) {
  return Object.assign({},
  //  Default headers
  (0, _is["default"])(NET_CONFIG) && (0, _is["default"])(NET_CONFIG.headers) ? NET_CONFIG.headers : {},
  //  Passed option headers
  (0, _is["default"])(options) && (0, _is["default"])(options.headers) ? options.headers : {});
}