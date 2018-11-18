'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = serializeResponseType;

var _string = require("@valkyriestudios/utils/string");

var _constants = require("../constants");

var map = Object.keys(_constants.RESPONSE_TYPES).reduce(function (acc, key) {
  acc[_constants.RESPONSE_TYPES[key]] = key;
  return acc;
}, {}); //
//  EXPORTS
//

function serializeResponseType(options, NET_CONFIG) {
  var responseType = Object.prototype.hasOwnProperty.call(options, 'responseType') ? options.responseType : NET_CONFIG.responseType;
  if (!(0, _string.isString)(responseType)) throw new TypeError('Net:serializeResponseType expects responseType to be a string');
  if (!Object.prototype.hasOwnProperty.call(map, responseType)) return '';
  return responseType;
}