'use strict';

import isFunction   from '@valkyriestudios/utils/function/is';
import isObject     from '@valkyriestudios/utils/object/is';

export default function serializeOnProgress (options, NET_CONFIG) {
    const onProgress = isObject(options) && options.hasOwnProperty('onProgress')
        ? options.onProgress
        : NET_CONFIG.onProgress;

    return isFunction(onProgress) ? onProgress : false;
}
