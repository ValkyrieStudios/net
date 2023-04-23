'use strict';

import isObject from '@valkyriestudios/utils/object/is';

export default function serializeWithCredentials (options, NET_CONFIG) {
    return isObject(options) && options.hasOwnProperty('withCredentials')
        ? options.withCredentials
        : NET_CONFIG.withCredentials;
}
