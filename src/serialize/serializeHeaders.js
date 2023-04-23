'use strict';

import isObject from '@valkyriestudios/utils/object/is';

//  Combine option headers and default headers
//
//  @param object   options     Options object
//  @param object   NET_CONFIG  Default net configuration object
export default function serializeHeaders (options, NET_CONFIG) {
    return Object.assign({},
        //  Default headers
        isObject(NET_CONFIG) && isObject(NET_CONFIG.headers)
            ? NET_CONFIG.headers
            : {},
        //  Passed option headers
        isObject(options) && isObject(options.headers)
            ? options.headers
            : {}
    );
}
