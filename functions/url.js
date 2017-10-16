'use strict';

import { isObject } from '@valkyriestudios/utils/object';
import { isArray } from '@valkyriestudios/utils/array';
import { isString } from '@valkyriestudios/utils/string';

//
//  PRIVATE
//

    //  Serialize a key-value pair object into a query string
    //  e.g : {a:1,b:2} => 'a=1&b=2'
    function serializeQueryParameters (params) {
        let query = params;

        if (!isObject(params) || !isString(params) || isArray(params)) {
            throw new TypeError('Net:setRequestUrl expects params option to be either a string or an object');
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

    //  Opens the request to the specific url and applies any params options that
    //  were provided
    export function setRequestUrl (req, options, NET_CONFIG, resolve, reject) {
        //  Check for possibly configured querystring parameters
        let params = Object.prototype.hasOwnProperty.call(options, 'params')
            ? options.params
            : NET_CONFIG.params;

        //  Check for possibly configured base domain (e.g: https://www.google.com)
        const domain = Object.prototype.hasOwnProperty.call(options, 'domain')
            ? options.base
            : NET_CONFIG.base;

        //  Build base url
        let url = `${domain ? domain : ''}${options.url}`;

        //  Add possible query string parameters to url
        if (params) {
            url = `${url}?${serializeQueryParameters(params)}`;
        }

        if (!options.method || !NET_CONFIG.method) throw new TypeError('NET:setRequestUrl requires an HTTP verb to be set as method');

        //  Open request to url
        req.open(options.method || NET_CONFIG.method, url, true);
    }
