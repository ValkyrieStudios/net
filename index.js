import {noop} from '@valkyriestudios/utils/function';
import {isObject} from '@valkyriestudios/utils/object';

import { setRequestWithCredentials } from './functions/withCredentials';
import { setRequestTimeout } from './functions/timeout';
import { setRequestHeaders, getResponseHeaders } from './functions/headers';

const METHOD = Object.freeze({
    GET             : 'Get',
    PUT             : 'Put',
    PATCH           : 'Patch',
    POST            : 'Post',
    DELETE          : 'Delete',
    HEAD            : 'Head',
    OPTIONS         : 'Options',
});

const METHODS_ALLOWED_DATA = Object.freeze({
    METHOD.PUT      : true,
    METHOD.POST     : true,
    METHOD.PATCH    : true,
});

const NET_CONFIG = Object.seal({
    timeout         : false,
    withCredentials : false,
    headers         : false,
});

function _response (req, options) {
    const { status, statusText } = req;

    //  Retrieve headers
    const headers = getResponseHeaders(req);

    //  Based on responseType in options, define what to return
    let data = (options.responseType || '') === 'text'
        ? req.responseText
        : req.response;

    //  Transform data based on content-type
    if (headers['content-type'].indexOf('application/json') > -1) {
        data = JSON.parse(data);
    }

    //  Return object
    return Object.seal({status, statusText, data, headers});
}

function _request (url, options) {
    return new Promise(function (resolve, reject) {
        //  Create a new request object
        const req = new XMLHttpRequest();
        req.open(options.method, url, true);

        //  Error handler for XMLHttpRequest
        req.onerror = (err) => reject(err);

        // Reject on abort
        req.onabort = (err) => reject(err);

        //  Triggered when the state of the XMLHttpRequest changes
        req.onreadystatechange = () => {
            if (req.readyState !== 4) return;
            if (req.status === 0 && !((req.responseURL || '').indexOf('file:') === 0)) return;

            resolve(_response(req, options));
        };

        //  Apply configurable options to the request
        setRequestWithCredentials(req, options, NET_CONFIG, resolve, reject);
        setRequestTimeout(req, options, NET_CONFIG, resolve, reject);
        setRequestHeaders(req, options, NET_CONFIG, resolve, reject);

        //  Send request
        if (options.data && METHODS_ALLOWED_DATA[options.method.toUpperCase()]) {
            req.send(options.data);
        } else {
            if (options.data) {
                throw new TypeError('Net : Please only provide body data to put, post and patch methods');
            }
            req.send();
        }
    });
}

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
