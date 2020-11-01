'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = serializeOnProgress;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/function/is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//
//  EXPORTS
//
function serializeOnProgress(options, NET_CONFIG) {
  var onProgress = Object.prototype.hasOwnProperty.call(options, 'onProgress') ? options.onProgress : NET_CONFIG.onProgress;
  if (!onProgress) return false;
  if (!(0, _is["default"])(onProgress)) throw new TypeError('Net:serializeOnProgress expects onProgress to be a function');
  return onProgress;
}