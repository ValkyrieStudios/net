'use strict';

import Is from '@valkyriestudios/utils/is';

export default function serializeOnProgress (options, NET_CONFIG) {
    const onProgress = Object.prototype.hasOwnProperty.call(options, 'onProgress')
        ? options.onProgress
        : NET_CONFIG.onProgress;

    return Is.Function(onProgress) ? onProgress : false;
}
