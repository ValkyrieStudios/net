'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = serializeWithCredentials;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function serializeWithCredentials(options, NET_CONFIG) {
  return _is["default"].Object(options) && options.hasOwnProperty('withCredentials') ? options.withCredentials : NET_CONFIG.withCredentials;
}