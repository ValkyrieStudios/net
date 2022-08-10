'use strict';

import Is from '@valkyriestudios/utils/is';

export default function serializeTimeout (options, NET_CONFIG) {
    const timeout = Object.prototype.hasOwnProperty.call(options, 'timeout')
        ? options.timeout
        : NET_CONFIG.timeout;

    return Is.NumberAbove(timeout, 0) ? timeout : false;
}
