'use strict';

import isNumber from '@valkyriestudios/utils/number/is';

//
//  EXPORTS
//

    export default function serializeTimeout (options, NET_CONFIG) {
        const timeout = Object.prototype.hasOwnProperty.call(options, 'timeout')
            ? options.timeout
            : NET_CONFIG.timeout;

        if (!timeout) return false;
        if (!isNumber(timeout)) throw new TypeError('Net:serializeTimeout expects timeout to be an integer number');

        return timeout;
    }
