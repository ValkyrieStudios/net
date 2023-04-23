'use strict';

import isNeString   from '@valkyriestudios/utils/string/isNotEmpty';
import {METHOD}     from '../constants';

const METHOD_VALUES = Object.freeze(Object.keys(METHOD).reduce((acc, key) => {
    acc[METHOD[key]] = true;
    return acc;
}, Object.create(null)));

export default function serializeMethod (method, NET_CONFIG) {
    const serialized_method = isNeString(method)
        ? method.trim()
        : NET_CONFIG.method;
    if (!METHOD_VALUES[serialized_method]) throw new TypeError('NET:serializeMethod an unknown HTTP verb was passed as method');

    return serialized_method;
}
