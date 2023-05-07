'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = serializeTimeout;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/object/is"));
var _isIntegerAbove = _interopRequireDefault(require("@valkyriestudios/utils/number/isIntegerAbove"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function serializeTimeout(options, NET_CONFIG) {
  var timeout = (0, _is["default"])(options) && options.hasOwnProperty('timeout') ? options.timeout : NET_CONFIG.timeout;
  return (0, _isIntegerAbove["default"])(timeout, 0) ? timeout : !1;
}