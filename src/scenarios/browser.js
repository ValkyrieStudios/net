import { isObject } from '@valkyriestudios/utils/object';
import { isArray } from '@valkyriestudios/utils/array';
import Scenario from '../blueprints/Scenario';
import Response from '../blueprints/Response';
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

export default class BrowserScenario extends Scenario {
    //  Creates an xhr request to the provided url and applies the configured options to it
    static run (options) {
        return super.run(options, (resolve, reject) => {
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

                const { status, statusText } = req;

                resolve(new Response(status, statusText, req.response, getResponseHeaders(req)));
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
