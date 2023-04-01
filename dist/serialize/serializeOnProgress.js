'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = serializeOnProgress;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function serializeOnProgress(options, NET_CONFIG) {
  var onProgress = _is["default"].Object(options) && options.hasOwnProperty('onProgress') ? options.onProgress : NET_CONFIG.onProgress;
  return _is["default"].Function(onProgress) ? onProgress : false;
}