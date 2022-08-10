'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = serializeTimeout;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function serializeTimeout(options, NET_CONFIG) {
  var timeout = Object.prototype.hasOwnProperty.call(options, 'timeout') ? options.timeout : NET_CONFIG.timeout;
  return _is["default"].NumberAbove(timeout, 0) ? timeout : false;
}