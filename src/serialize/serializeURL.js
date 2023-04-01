'use strict';

import Is   from '@valkyriestudios/utils/is';
import join from '@valkyriestudios/utils/array/join';

export default function serializeURL (url, options, NET_CONFIG) {
    //  Check for possibly configured base domain (e.g: https://www.google.com)
    const base = Is.Object(options) && options.hasOwnProperty('base') ? options.base : NET_CONFIG.base;

    //  Build base url
    let serialized_url = join([base, url], {delim: ''});

    //  Check for possibly configured querystring parameters
    let params = Is.Object(options) && options.hasOwnProperty('params') ? options.params : NET_CONFIG.params;
    if (Is.String(params)) {
        params = params.trim();
    } else if (Is.NotEmptyObject(params)) {
        params = Object.keys(params).reduce((acc, key) => {
            if (!Is.NotEmptyString(key)) return acc;

            acc.push(`${encodeURIComponent(key).trim()}=${encodeURIComponent(params[key]).trim()}`);
            return acc;
        }, []).join('&');
    } else {
        params = false;
    }

    //  If params is filled in after serialization
    if (params) serialized_url = `${serialized_url}?${params}`;

    return serialized_url;
}
