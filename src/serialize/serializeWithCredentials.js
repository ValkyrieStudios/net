'use strict';

import Is from '@valkyriestudios/utils/is';

export default function serializeWithCredentials (options, NET_CONFIG) {
    return Is.Object(options) && options.hasOwnProperty('withCredentials')
        ? options.withCredentials
        : NET_CONFIG.withCredentials;
}
