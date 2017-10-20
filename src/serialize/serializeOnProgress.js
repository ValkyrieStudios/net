'use strict';

import { isFunction } from '@valkyriestudios/utils/function';

//
//  EXPORTS
//

    export default function serializeOnProgress (options, NET_CONFIG) {
        const onProgress = Object.prototype.hasOwnProperty.call(options, 'onProgress')
            ? options.onProgress
            : NET_CONFIG.onProgress;

        if (!onProgress) return false;
        if (!isFunction(onProgress)) throw new TypeError('Net:serializeOnProgress expects onProgress to be a function');

        return onProgress;
    }
