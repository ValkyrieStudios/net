'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.default = serializeMethod;

var _constants = require('../constants');

var METHOD_VALUES = Object.freeze(Object.keys(_constants.METHOD).reduce(function (acc, key) {
    acc[_constants.METHOD[key]] = !0;
    return acc;
}, Object.create(null)));

//
//  EXPORTS
//

function serializeMethod(method, NET_CONFIG) {
    var serialized_method = method || NET_CONFIG.method;

    if (!serialized_method) throw new TypeError('NET:serializeMethod requires an HTTP verb to be set as method');
    if (!Object.prototype.hasOwnProperty.call(METHOD_VALUES, method)) throw new TypeError('NET:serializeMethod an unknown HTTP verb was passed as method');

    return method;
}