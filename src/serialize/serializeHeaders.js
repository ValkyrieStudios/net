'use strict';

import { isObject } from '@valkyriestudios/utils/object';
import { isArray } from '@valkyriestudios/utils/array';

//
//  EXPORTS
//

    export default function serializeHeaders (options, NET_CONFIG) {
        const options_headers = options.headers || {};
        const default_headers = NET_CONFIG.headers || {};

        if (isArray(options_headers) || !isObject(options_headers)) {
            throw new TypeError('NET:serializeHeaders options.headers was set to a non-object structure. An object is required.');
        }

        if (isArray(default_headers) || !isObject(default_headers)) {
            throw new TypeError('NET:serializeHeaders NET_CONFIG.headers was set to a non-object structure. An object is required.');
        }

        //  Combine the headers with specificity being given to options.headers
        return Object.assign({}, default_headers, options_headers);
    }
