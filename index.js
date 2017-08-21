import {noop} from '@valkyriestudios/utils/function';
import {isObject} from '@valkyriestudios/utils/object';

const METHOD = Object.freeze({
    GET : 'Get',
    PUT : 'Put',
    POST : 'Post',
    DELETE : 'Delete',
    HEAD : 'Head',
    OPTIONS : 'Options',
});

const NET_CONFIG = Object.seal({
    timeout : 10000,
    withCredentials : false,
});

function _response (req, options) {
    const { status, statusText } = req;

    //  Retrieve headers
    const headers = req.getAllResponseHeaders().split('\n').reduce((acc, header) => {
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
        const req = new XMLHttpRequest();

        req.onerror = (err) => {
            reject(new TypeError('Net : request failed'));
        };

        req.ontimeout = () => {
            reject(new TypeError(`Net : timeout of ${req.timeout}ms was hit`));
        };

        req.onreadystatechange = () => {
            if (req.readyState !== 4) return;
            if (req.status === 0 && !((req.responseURL || '').indexOf('file:') === 0)) return;

            resolve(_response(req, options));
        };

        req.open(options.method, url, true);

        //  Set headers
        Object.keys(options.headers || Object.create(null)).forEach(
            (name) => req.setRequestHeader(name, options.headers[name])
        );

        //  With Credentials
        req.withCredentials = options.hasOwnProperty('withCredentials')
            ? (!!options.withCredentials)
            : NET_CONFIG.withCredentials;

        //  Timeout
        req.timeout = options.hasOwnProperty('timeout')
            ? parseInt(options.timeout, 10)
            : NET_CONFIG.timeout;

        //  Send request
        req.send();
    });
}

export default class Net {
    static configure = (options = {}) => {
        if (!isObject(options)) throw new TypeError('Net:configure expects an Object');

        Object.keys(options).forEach((key) => {
            if (NET_CONFIG.hasOwnProperty(key)) NET_CONFIG[key] = options[key];
        });
    };

    static get = (url, options={}) =>
        _request(url, Object.assign({ method : METHOD.GET }, options));

    static post = (url, options={}) =>
        _request(url, Object.assign({ method : METHOD.POST }, options));

    static put = (url, options={}) =>
        _request(url, Object.assign({ method : METHOD.PUT }, options));

    static 'delete' = (url, options={}) =>
        _request(url, Object.assign({ method : METHOD.DELETE }, options));

    static head = (url, options={}) =>
        _request(url, Object.assign({ method : METHOD.HEAD }, options));

    static options = (url, options={}) =>
        _request(url, Object.assign({ method : METHOD.OPTIONS }, options));

    static request (url, options={}) {
        //  Normalize method
        const method = `${options.method.slice(0, 1).toUpperCase()}${options.method.slice(1)}`;

        return ({
            [METHOD.GET] : Net.get,
            [METHOD.PUT] : Net.put,
            [METHOD.POST] : Net.post,
            [METHOD.DELETE] : Net.delete,
            [METHOD.HEAD] : Net.head,
            [METHOD.OPTIONS] : Net.options,
        }[method] || noop)(url, options);
    };
}
