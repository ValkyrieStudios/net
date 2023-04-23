'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = serializeOnProgress;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/function/is"));
var _is2 = _interopRequireDefault(require("@valkyriestudios/utils/object/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function serializeOnProgress(options, NET_CONFIG) {
  var onProgress = (0, _is2["default"])(options) && options.hasOwnProperty('onProgress') ? options.onProgress : NET_CONFIG.onProgress;
  return (0, _is["default"])(onProgress) ? onProgress : false;
}