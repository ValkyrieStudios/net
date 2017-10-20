import { isObject } from '@valkyriestudios/utils/object';
import { isArray } from '@valkyriestudios/utils/array';

import { METHODS_ALLOWED_BODY } from '../constants';

function getResponseHeaders (req) {
    return req.getAllResponseHeaders().split('\n').reduce((acc, header) => {
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

//  Parses the response to a request and returns an object of form {status, statusText, data, headers}
function _response (req, options) {
    const { status, statusText } = req;

    //  Retrieve headers
    const headers = getResponseHeaders(req);
    let data = req.response;

    //  Transform data based on content-type
    if (headers['content-type'].indexOf('application/json') > -1) {
        data = JSON.parse(data);
    }

    //  Return object
    return Object.seal({status, statusText, data, headers});
}

export default class BrowserScenario {
    //  Creates an xhr request to the provided url and applies the configured options to it
    static run (options) {
        return new Promise(function (resolve, reject) {
            //  Create a new request object
            const req = new XMLHttpRequest();

            //  Open request to url
            req.open(options.method, options.url, true);

            //  Apply configurable listeners to the request
            req.onerror = (err) => reject(err);
            req.onabort = (err) => reject(err);

            if (options.timeout) {
                req.ontimeout = (err) => reject(err);
                req.timeout = Math.floor(options.timeout);
            }

            if (options.onProgress) {
                req.onprogress = options.onProgress;
            }

            //  Apply with credentials
            if (options.withCredentials) {
                req.withCredentials = withCredentials;
            }

            //  Set headers
            Object.keys(options.headers).forEach(name => req.setRequestHeader(name, options.headers[name]));

            //  Triggered when the state of the XMLHttpRequest changes
            req.onreadystatechange = () => {
                if (req.readyState !== 4) return;
                if (req.status === 0 && !((req.responseURL || '').indexOf('file:') === 0)) return;

                resolve(_response(req, options));
            };

            //  Send request
            if (options.data && METHODS_ALLOWED_BODY[options.method]) {
                req.send((isObject(options.data) || isArray(options.data)) ? JSON.stringify(options.data) : options.data);
            } else {
                req.send();
            }
        });
    }
}
