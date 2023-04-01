'use strict';

import Is from '@valkyriestudios/utils/is';

export default function serializeTimeout (options, NET_CONFIG) {
    const timeout = Is.Object(options) && options.hasOwnProperty('timeout')
        ? options.timeout
        : NET_CONFIG.timeout;

    return Is.IntegerAbove(timeout, 0) ? timeout : false;
}
