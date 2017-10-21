'use strict';

import { isObject } from '@valkyriestudios/utils/object';
import { noop } from '@valkyriestudios/utils/function';

import { METHOD } from './constants';

import serializeHeaders from './serialize/serializeHeaders';
import serializeURL from './serialize/serializeURL';
import serializeWithCredentials from './serialize/serializeWithCredentials';
import serializeTimeout from './serialize/serializeTimeout';
import serializeOnProgress from './serialize/serializeOnProgress';
import serializeMethod from './serialize/serializeMethod';

//
//  PRIVATE
//

    //  NET Library configuration
    const NET_CONFIG = Object.seal({
        base            : false,
        headers         : false,
        method          : false,
        onProgress      : false,
        params          : false,
        timeout         : false,
        withCredentials : false,
    });

    const Scenario = typeof window !== 'undefined' && ({}).toString.call(window) === '[object Window]'
        ? require('./scenarios/browser').default
        : require('./scenarios/node').default;

    function serialize (url, method, options = {}, data = false) {
        return Object.seal({
            url                 : serializeURL(url, options, NET_CONFIG),
            headers             : serializeHeaders(options, NET_CONFIG),
            withCredentials     : serializeWithCredentials(options, NET_CONFIG),
            onProgress          : serializeOnProgress(options, NET_CONFIG),
            timeout             : serializeTimeout(options, NET_CONFIG),
            method              : serializeMethod(method, NET_CONFIG),
            data,
        });
    }

//
//  EXPORTS
//

    export default class Net {

        static version = () => '__NET_VERSION__';

        static configure = (options = {}) => {
            if (!isObject(options)) throw new TypeError('Net:configure expects an Object');

            Object.keys(options).forEach((key) => {
                if (NET_CONFIG.hasOwnProperty(key)) {
                    NET_CONFIG[key] = options[key];
                }
            });
        };

        static get = (url, options = {}) => {
            return Scenario.run(serialize(url, METHOD.GET, options));
        }

        static post = (url, data, options = {}) => {
            return Scenario.run(serialize(url, METHOD.POST, options, data));
        }

        static put = (url, data, options = {}) => {
            return Scenario.run(serialize(url, METHOD.PUT, options, data));
        }

        static patch = (url, data, options = {}) => {
            return Scenario.run(serialize(url, METHOD.PATCH, options, data));
        }

        static delete = (url, options = {}) => {
            return Scenario.run(serialize(url, METHOD.DELETE, options));
        }

        static head = (url, options = {}) => {
            return Scenario.run(serialize(url, METHOD.HEAD, options));
        }

        static options = (url, options = {}) => {
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
        };
    }
