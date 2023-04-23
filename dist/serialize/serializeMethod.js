'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = serializeMethod;
var _isNotEmpty = _interopRequireDefault(require("@valkyriestudios/utils/string/isNotEmpty"));
var _constants = require("../constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var METHOD_VALUES = Object.freeze(Object.keys(_constants.METHOD).reduce(function (acc, key) {
  acc[_constants.METHOD[key]] = true;
  return acc;
}, Object.create(null)));
function serializeMethod(method, NET_CONFIG) {
  var serialized_method = (0, _isNotEmpty["default"])(method) ? method.trim() : NET_CONFIG.method;
  if (!METHOD_VALUES[serialized_method]) throw new TypeError('NET:serializeMethod an unknown HTTP verb was passed as method');
  return serialized_method;
}