'use strict';

import isObject     from '@valkyriestudios/utils/object/is';
import isArray      from '@valkyriestudios/utils/array/is';
import isString     from '@valkyriestudios/utils/string/is';

//
//  PRIVATE
//

    //  Serialize a key-value pair object into a query string
    //  e.g : {a:1,b:2} => 'a=1&b=2'
    function serializeQueryParameters (params) {
        let query = params;

        if ((!isObject(params) && !isString(params)) || isArray(params)) {
            throw new TypeError('Net:serializeURL expects params option to be either a string or an object');
        }

        if (isObject(params)) {
            query = Object.keys(params).reduce((acc, key) => {
                acc.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
                return acc;
            }, []).join('&');
        }

        return query;
    }

//
//  EXPORTS
//

    export default function serializeURL (url, options, NET_CONFIG) {
        //  Check for possibly configured querystring parameters
        let params = Object.prototype.hasOwnProperty.call(options, 'params')
            ? options.params
            : NET_CONFIG.params;

        //  Check for possibly configured base domain (e.g: https://www.google.com)
        const base = Object.prototype.hasOwnProperty.call(options, 'base')
            ? options.base
            : NET_CONFIG.base;

        //  Build base url
        let serialized_url = `${base ? base : ''}${url}`;

        //  Add possible query string parameters to url
        if (params) {
            serialized_url = `${serialized_url}?${serializeQueryParameters(params)}`;
        }

        return serialized_url;
    }
