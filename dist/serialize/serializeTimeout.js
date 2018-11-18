'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = serializeTimeout;

var _number = require("@valkyriestudios/utils/number");

//
//  EXPORTS
//
function serializeTimeout(options, NET_CONFIG) {
  var timeout = Object.prototype.hasOwnProperty.call(options, 'timeout') ? options.timeout : NET_CONFIG.timeout;
  if (!timeout) return false;
  if (!(0, _number.isNumber)(timeout)) throw new TypeError('Net:serializeTimeout expects timeout to be an integer number');
  return timeout;
}