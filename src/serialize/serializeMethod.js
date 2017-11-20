'use strict';

import { METHOD } from '../constants';

const METHOD_VALUES = Object.freeze(Object.keys(METHOD).reduce((acc, key) => {
    acc[METHOD[key]] = true;
    return acc;
}, Object.create(null)));

//
//  EXPORTS
//

    export default function serializeMethod (method, NET_CONFIG) {
        let serialized_method = method || NET_CONFIG.method;

        if (!serialized_method) throw new TypeError('NET:serializeMethod requires an HTTP verb to be set as method');
        if (!Object.prototype.hasOwnProperty.call(METHOD_VALUES, method)) throw new TypeError('NET:serializeMethod an unknown HTTP verb was passed as method');

        return method;
    }
