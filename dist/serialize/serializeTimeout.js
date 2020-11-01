'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = serializeTimeout;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/number/is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//
//  EXPORTS
//
function serializeTimeout(options, NET_CONFIG) {
  var timeout = Object.prototype.hasOwnProperty.call(options, 'timeout') ? options.timeout : NET_CONFIG.timeout;
  if (!timeout) return false;
  if (!(0, _is["default"])(timeout)) throw new TypeError('Net:serializeTimeout expects timeout to be an integer number');
  return timeout;
}