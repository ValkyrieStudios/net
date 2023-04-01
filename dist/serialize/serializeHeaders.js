'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = serializeHeaders;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//  Combine option headers and default headers
//
//  @param object   options     Options object
//  @param object   NET_CONFIG  Default net configuration object
function serializeHeaders(options, NET_CONFIG) {
  return Object.assign({},
  //  Default headers
  _is["default"].Object(NET_CONFIG) && _is["default"].Object(NET_CONFIG.headers) ? NET_CONFIG.headers : {},
  //  Passed option headers
  _is["default"].Object(options) && _is["default"].Object(options.headers) ? options.headers : {});
}