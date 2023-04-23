'use strict';

import isObject     from '@valkyriestudios/utils/object/is';
import isNeObject   from '@valkyriestudios/utils/object/isNotEmpty';
import isString     from '@valkyriestudios/utils/string/is';
import isNeString   from '@valkyriestudios/utils/string/isNotEmpty';
import join         from '@valkyriestudios/utils/array/join';

export default function serializeURL (url, options, NET_CONFIG) {
    //  Check for possibly configured base domain (e.g: https://www.google.com)
    const base = isObject(options) && options.hasOwnProperty('base') ? options.base : NET_CONFIG.base;

    //  Build base url
    let serialized_url = join([base, url], {delim: ''});

    //  Check for possibly configured querystring parameters
    let params = isObject(options) && options.hasOwnProperty('params') ? options.params : NET_CONFIG.params;
    if (isString(params)) {
        params = params.trim();
    } else if (isNeObject(params)) {
        params = Object.keys(params).reduce((acc, key) => {
            if (!isNeString(key)) return acc;

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
