'use strict';

import { isObject } from '@valkyriestudios/utils/object';
import { isArray } from '@valkyriestudios/utils/array';

//
//  EXPORTS
//

    //  Set headers on the request by passing a key-value pair object where the key represents the name and the value the value
    //  of the header
    export function setRequestHeaders (req, options, NET_CONFIG, resolve, reject) {
        const options_headers = options.headers || {};
        const default_headers = NET_CONFIG.headers || {};

        if (isArray(options_headers) || !isObject(options_headers)) {
            throw new TypeError('NET : options.headers was set to a non-object structure. An object is required.');
        }

        if (isArray(default_headers) || !isObject(default_headers)) {
            throw new TypeError('NET : NET_CONFIG.headers was set to a non-object structure. An object is required.');
        }

        //  Combine the headers with specificity being given to options.headers
        const payload = Object.assign({}, default_headers, options_headers);

        //  Apply the headers to the request
        Object.keys(payload).forEach(name => req.setRequestHeader(name, payload[name]));
    }

    //  Retrieve headers from the response to a request, the returned value is an object key-pair value
    export function getResponseHeaders (req) {
        return = req.getAllResponseHeaders().split('\n').reduce((acc, header) => {
            header = header.split(':') || [];

            if (header.length === 0) return acc;

            const key = header.shift().trim().toLowerCase();
            const val = header.join(':').trim();

            if (key === '') return acc;

            acc[key] = acc.hasOwnProperty(key)
                ? `${acc[key]}, ${val}`
                : val;

            return acc;
        }, {});
    }
