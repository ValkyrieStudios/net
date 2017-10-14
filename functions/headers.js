import {isObject} from '@valkyriestudios/utils/object';
import {isArray} from '@valkyriestudios/utils/array';

/**
 * Add headers to the request in progress
 * Default headers can be set by adding them to NET_CONFIG.headers
 * if the same header occurs in both options.headers and NET_CONFIG.headers
 * preference will be given to the one in options.headers as it is more specific
 * both options.headers and NET_CONFIG.headers should be objects
 */
export function setHeaders (req, options = {}, NET_CONFIG, resolve, reject) {
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

/**
 * Retrieve the headers that are set on a request that was responded to
 */
export function getHeaders (req) {
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
