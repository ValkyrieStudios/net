'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = serializeResponseType;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/object/is"));
var _is2 = _interopRequireDefault(require("@valkyriestudios/utils/string/is"));
var _constants = require("../constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var map = Object.keys(_constants.RESPONSE_TYPES).reduce(function (acc, key) {
  acc[_constants.RESPONSE_TYPES[key]] = key;
  return acc;
}, {});
function serializeResponseType(options, NET_CONFIG) {
  var responseType = (0, _is["default"])(options) && options.hasOwnProperty('responseType') ? options.responseType : NET_CONFIG.responseType;
  if (!(0, _is2["default"])(responseType)) throw new TypeError('Net:serializeResponseType expects responseType to be a string');
  return map[responseType] || '';
}