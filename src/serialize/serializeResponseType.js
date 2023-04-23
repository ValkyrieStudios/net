'use strict';

import isObject         from '@valkyriestudios/utils/object/is';
import isString         from '@valkyriestudios/utils/string/is';
import {RESPONSE_TYPES} from '../constants';

const map = Object.keys(RESPONSE_TYPES).reduce((acc, key) => {
    acc[RESPONSE_TYPES[key]] = key;
    return acc;
}, {});

export default function serializeResponseType (options, NET_CONFIG) {
    const responseType = isObject(options) && options.hasOwnProperty('responseType')
        ? options.responseType
        : NET_CONFIG.responseType;

    if (!isString(responseType)) throw new TypeError('Net:serializeResponseType expects responseType to be a string');

    return map[responseType] || '';
}
