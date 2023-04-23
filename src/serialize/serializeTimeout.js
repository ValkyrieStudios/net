'use strict';

import isObject     from '@valkyriestudios/utils/object/is';
import isIntAbove   from '@valkyriestudios/utils/number/isIntegerAbove';

export default function serializeTimeout (options, NET_CONFIG) {
    const timeout = isObject(options) && options.hasOwnProperty('timeout')
        ? options.timeout
        : NET_CONFIG.timeout;

    return isIntAbove(timeout, 0) ? timeout : false;
}
