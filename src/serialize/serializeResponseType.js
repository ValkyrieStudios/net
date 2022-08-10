'use strict';

import Is               from '@valkyriestudios/utils/is';
import {RESPONSE_TYPES} from '../constants';

const map = Object.keys(RESPONSE_TYPES).reduce((acc, key) => {
    acc[RESPONSE_TYPES[key]] = key;
    return acc;
}, {});

export default function serializeResponseType (options, NET_CONFIG) {
    const responseType = Object.prototype.hasOwnProperty.call(options, 'responseType')
        ? options.responseType
        : NET_CONFIG.responseType;

    if (!Is.String(responseType)) {
        throw new TypeError('Net:serializeResponseType expects responseType to be a string');
    }

    return Object.prototype.hasOwnProperty.call(map, responseType) ? responseType : '';
}
