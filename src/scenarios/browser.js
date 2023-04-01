'use strict';

import Is                       from '@valkyriestudios/utils/is';
import Scenario                 from '../blueprints/Scenario';
import Response                 from '../blueprints/Response';
import {METHODS_ALLOWED_BODY}   from '../constants';

function getResponseHeaders (req) {
    return req.getAllResponseHeaders().split('\n').reduce((acc, header) => {
        header = header.split(':') || [];
        if (!Is.NotEmptyArray(header)) return acc;

        const key = header.shift().trim().toLowerCase();
        const val = header.join(':').trim();

        if (!Is.NotEmptyString(key)) return acc;

        acc[key] = acc.hasOwnProperty(key)
            ? `${acc[key]}, ${val}`
            : val;

        return acc;
    }, {});
}

export default class BrowserScenario extends Scenario {

    static run (options) {
        return super.run(options, (resolve, reject) => {
            const req = new XMLHttpRequest();

            //  Open request to url
            req.open(options.method, options.url, true);

            //  Apply configurable listeners to the request
            req.onerror = err => reject(err);
            req.onabort = err => reject(err);

            if (Is.IntegerAbove(options.timeout)) {
                req.ontimeout = err => reject(err);
                req.timeout = options.timeout;
            }

            //  On Progress handler
            if (Is.Function(options.onProgress)) {
                req.onprogress = options.onProgress;
            }

            //  Apply with credentials
            if (options.withCredentials) {
                req.withCredentials = options.withCredentials;
            }

            //  Apply response type
            if (Is.NotEmptyString(options.responseType)) {
                req.responseType = options.responseType;
            }

            //  Set headers
            if (Is.NotEmptyObject(options.headers)) {
                for (const header of Object.keys(options.headers)) {
                    req.setRequestHeader(header, options.headers[header]);
                }
            }

            //  Triggered when the state of the XMLHttpRequest changes
            req.onreadystatechange = () => {
                if (req.readyState !== 4) return;
                if (req.status === 0 && !((req.responseURL || '').indexOf('file:') === 0)) return;

                return resolve(new Response(req.status, req.statusText, req.response, getResponseHeaders(req), options));
            };

            //  Send request
            if (options.data && METHODS_ALLOWED_BODY[options.method]) {
                req.send(Is.Object(options.data) || Is.Array(options.data) ? JSON.stringify(options.data) : options.data);
            } else {
                req.send();
            }
        });
    }

}
