'use strict';

import isObject from '@valkyriestudios/utils/object/is';
import noop     from '@valkyriestudios/utils/function/noop';

import {METHOD}                 from './constants';

import serializeResponseType    from './serialize/serializeResponseType';
import serializeHeaders         from './serialize/serializeHeaders';
import serializeURL             from './serialize/serializeURL';
import serializeWithCredentials from './serialize/serializeWithCredentials';
import serializeTimeout         from './serialize/serializeTimeout';
import serializeOnProgress      from './serialize/serializeOnProgress';
import serializeMethod          from './serialize/serializeMethod';

//  NET Library configuration
const NET_CONFIG = Object.seal({
    base            : false,
    headers         : false,
    method          : false,
    onProgress      : false,
    params          : false,
    timeout         : false,
    withCredentials : false,
    responseType    : '',
});

//  Determine the scenario to run in
let Scenario = null;

if (typeof window !== 'undefined') {
    Scenario = require('./scenarios/browser').default;
} else if (typeof process !== 'undefined' && (process.versions || {}).electron) {
    Scenario = require('./scenarios/browser').default;
} else {
    Scenario = require('./scenarios/node').default;
}

//  Serialize call parameters into an understandable format for every scenario
function serialize (url, method, options = {}, data = false) {
    return Object.seal({
        url                 : serializeURL(url, options, NET_CONFIG),
        headers             : serializeHeaders(options, NET_CONFIG),
        withCredentials     : serializeWithCredentials(options, NET_CONFIG),
        onProgress          : serializeOnProgress(options, NET_CONFIG),
        timeout             : serializeTimeout(options, NET_CONFIG),
        method              : serializeMethod(method, NET_CONFIG),
        responseType        : serializeResponseType(options, NET_CONFIG),
        data,
    });
}

export default class Net {

    static configure (options = {}) {
        if (!isObject(options)) throw new TypeError('Net:configure expects an Object');

        for (const key of Object.keys(options)) {
            if (!NET_CONFIG.hasOwnProperty(key)) continue;
            NET_CONFIG[key] = options[key];
        }
    }

    static get (url, options = {}) {
        return Scenario.run(serialize(url, METHOD.GET, options));
    }

    static post (url, data, options = {}) {
        return Scenario.run(serialize(url, METHOD.POST, options, data));
    }

    static put (url, data, options = {}) {
        return Scenario.run(serialize(url, METHOD.PUT, options, data));
    }

    static patch (url, data, options = {}) {
        return Scenario.run(serialize(url, METHOD.PATCH, options, data));
    }

    static delete (url, options = {}) {
        return Scenario.run(serialize(url, METHOD.DELETE, options));
    }

    static head (url, options = {}) {
        return Scenario.run(serialize(url, METHOD.HEAD, options));
    }

    static options (url, options = {}) {
        return Scenario.run(serialize(url, METHOD.OPTIONS, options));
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
    }

}
