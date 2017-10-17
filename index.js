'use strict';

import { noop } from '@valkyriestudios/utils/function';
import { isObject } from '@valkyriestudios/utils/object';

import { setRequestWithCredentials } from './functions/withCredentials';
import { setRequestListeners } from './functions/listeners';
import { setRequestHeaders, getResponseHeaders } from './functions/headers';
import { setRequestUrl } from './functions/url';

//
//  PRIVATE
//

    //  VERBS
    const METHOD = Object.freeze({
        GET             : 'Get',
        PUT             : 'Put',
        PATCH           : 'Patch',
        POST            : 'Post',
        DELETE          : 'Delete',
        HEAD            : 'Head',
        OPTIONS         : 'Options',
    });

    //  VERBS Allowed to send data in body
    const METHODS_ALLOWED_BODY = Object.freeze({
        [METHOD.PUT]    : true,
        [METHOD.POST]   : true,
        [METHOD.PATCH]  : true,
    });

    //  NET Library configuration
    const NET_CONFIG = Object.seal({
        base            : false,
        headers         : false,
        method          : false,
        onProgress      : false,
        params          : false,
        responseType    : false,
        timeout         : false,
        withCredentials : false,
    });

    //  Parses the response to a request and returns an object of form {status, statusText, data, headers}
    function _response (req, options) {
        const { status, statusText } = req;

        //  Retrieve headers
        const headers = getResponseHeaders(req);

        //  Based on responseType in options, define what to return
        let data = (options.responseType || NET_CONFIG.responseType || '') === 'text'
            ? req.responseText
            : req.response;

        //  Transform data based on content-type
        if (headers['content-type'].indexOf('application/json') > -1) {
            data = JSON.parse(data);
        }

        //  Return object
        return Object.seal({status, statusText, data, headers});
    }

    //  Creates an xhr request to the provided url and applies the configured options to it
    function _request (url, options) {
        return new Promise(function (resolve, reject) {
            //  Create a new request object
            const req = new XMLHttpRequest();

            //  Set final endpoint for request
            setRequestUrl(req, options, NET_CONFIG, resolve, reject);

            //  Apply configurable listeners to the request
            setRequestListeners(req, options, NET_CONFIG, resolve, reject);

            //  Apply with credentials
            setRequestWithCredentials(req, options, NET_CONFIG, resolve, reject);

            //  Set headers
            setRequestHeaders(req, options, NET_CONFIG, resolve, reject);

            //  Triggered when the state of the XMLHttpRequest changes
            req.onreadystatechange = () => {
                if (req.readyState !== 4) return;
                if (req.status === 0 && !((req.responseURL || '').indexOf('file:') === 0)) return;

                resolve(_response(req, options));
            };

            //  Send request
            if (options.data && METHODS_ALLOWED_BODY[options.method.toUpperCase()]) {
                req.send(options.data);
            } else {
                req.send();
            }
        });
    }

//
//  EXPORTS
//

    export default class Net {
        static configure = (options = {}) => {
            if (!isObject(options)) throw new TypeError('Net:configure expects an Object');

            Object.keys(options).forEach((key) => {
                if (NET_CONFIG.hasOwnProperty(key)) {
                    NET_CONFIG[key] = options[key];
                }
            });
        };

        static get = (url, options = {}) => {
            return _request(url, Object.assign({ method: METHOD.GET }, options));
        }

        static post = (url, data, options = {}) => {
            return _request(url, Object.assign({ method: METHOD.POST }, options, { data }));
        }

        static put = (url, data, options = {}) => {
            return _request(url, Object.assign({ method: METHOD.PUT }, options, { data }));
        }

        static put = (url, data, options = {}) => {
            return _request(url, Object.assign({ method: METHOD.PATCH }, options, { data }));
        }

        static delete = (url, options = {}) => {
            return _request(url, Object.assign({ method: METHOD.DELETE }, options));
        }

        static head = (url, options = {}) => {
            return _request(url, Object.assign({ method: METHOD.HEAD }, options));
        }

        static options = (url, options = {}) => {
            return _request(url, Object.assign({ method: METHOD.OPTIONS }, options));
        }

        static request (url, options = {}) {
            //  Normalize method
            const method = `${options.method.slice(0, 1).toUpperCase()}${options.method.slice(1)}`;

            return ({
                [METHOD.GET]        : Net.get,
                [METHOD.POST]       : Net.post,
                [METHOD.PUT]        : Net.put,
                [METHOD.PATCH]      : Net.patch,
                [METHOD.DELETE]     : Net.delete,
                [METHOD.HEAD]       : Net.head,
                [METHOD.OPTIONS]    : Net.options,
            }[method] || noop)(url, options);
        };
    }
