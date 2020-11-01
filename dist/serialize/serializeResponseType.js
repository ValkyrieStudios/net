'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = serializeResponseType;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/string/is"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var map = Object.keys(_constants.RESPONSE_TYPES).reduce(function (acc, key) {
  acc[_constants.RESPONSE_TYPES[key]] = key;
  return acc;
}, {}); //
//  EXPORTS
//

function serializeResponseType(options, NET_CONFIG) {
  var responseType = Object.prototype.hasOwnProperty.call(options, 'responseType') ? options.responseType : NET_CONFIG.responseType;
  if (!(0, _is["default"])(responseType)) throw new TypeError('Net:serializeResponseType expects responseType to be a string');
  if (!Object.prototype.hasOwnProperty.call(map, responseType)) return '';
  return responseType;
}