'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = serializeHeaders;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/object/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function serializeHeaders(options, NET_CONFIG) {
  return Object.assign({}, (0, _is["default"])(NET_CONFIG) && (0, _is["default"])(NET_CONFIG.headers) ? NET_CONFIG.headers : {}, (0, _is["default"])(options) && (0, _is["default"])(options.headers) ? options.headers : {});
}