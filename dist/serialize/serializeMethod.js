'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = serializeMethod;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var METHOD_VALUES = Object.freeze(Object.keys(_constants.METHOD).reduce(function (acc, key) {
  acc[_constants.METHOD[key]] = true;
  return acc;
}, Object.create(null)));

function serializeMethod(method, NET_CONFIG) {
  var serialized_method = _is["default"].NotEmptyString(method) ? method : NET_CONFIG.method;

  if (!Object.prototype.hasOwnProperty.call(METHOD_VALUES, serialized_method)) {
    throw new TypeError('NET:serializeMethod an unknown HTTP verb was passed as method');
  }

  return serialized_method;
}