'use strict';

import { isString } from '@valkyriestudios/utils/string';
import { RESPONSE_TYPES } from '../constants';

const map = Object.keys(RESPONSE_TYPES).reduce((acc, key) => {
    acc[RESPONSE_TYPES[key]] = key;
    return acc;
}, {});

//
//  EXPORTS
//

    export default function serializeResponseType (options, NET_CONFIG) {
        const responseType = Object.prototype.hasOwnProperty.call(options, 'responseType')
            ? options.responseType
            : NET_CONFIG.responseType;

        if (!isString(responseType)) throw new TypeError('Net:serializeResponseType expects responseType to be a string');
        if (!Object.prototype.hasOwnProperty.call(map, responseType)) return '';

        return responseType;
    }
