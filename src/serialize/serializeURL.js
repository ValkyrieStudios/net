'use strict';

import Is   from '@valkyriestudios/utils/is';
import join from '@valkyriestudios/utils/array/join';

//  Serialize a key-value pair object into a query string
//  e.g : {a:1,b:2} => 'a=1&b=2'
function serializeQueryParameters (params) {
    if (Is.Object(params)) {
        return Object.keys(params).reduce((acc, key) => {
            acc.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
            return acc;
        }, []).join('&');
    } else if (Is.String(params)) {
        return params.trim();
    } else {
        throw new TypeError('Net:serializeURL expects params option to be either a string or an object');
    }
}

export default function serializeURL (url, options, NET_CONFIG) {
    //  Check for possibly configured base domain (e.g: https://www.google.com)
    const base = Object.prototype.hasOwnProperty.call(options, 'base')
        ? options.base
        : NET_CONFIG.base;

    //  Build base url
    let serialized_url = join([base, url], {delim: ''});

    //  Check for possibly configured querystring parameters
    const params = Object.prototype.hasOwnProperty.call(options, 'params')
        ? options.params
        : NET_CONFIG.params;
    if (params) {
        const serialized_params = serializeQueryParameters(params);
        if (Is.NotEmptyString(serialized_params)) {
            serialized_url = join([serialized_url, serialized_params], {delim: '?'});
        }
    }

    return serialized_url;
}
