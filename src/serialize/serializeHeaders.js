'use strict';

import Is from '@valkyriestudios/utils/is';

//  Combine option headers and default headers
//
//  @param object   options     Options object
//  @param object   NET_CONFIG  Default net configuration object
export default function serializeHeaders (options, NET_CONFIG) {
    return Object.assign({},
        //  Default headers
        Is.Object(NET_CONFIG) && Is.Object(NET_CONFIG.headers)
            ? NET_CONFIG.headers
            : {},
        //  Passed option headers
        Is.Object(options) && Is.Object(options.headers)
            ? options.headers
            : {}
    );
}
