'use strict';

import { isNumber } from '@valkyriestudios/utils/number';
import { isFunction } from '@valkyriestudios/utils/function';

//
//  PRIVATE
//

    //  Sets an error listener that will reject the promise when an error occurs
    function setErrorListener (req, options, NET_CONFIG, resolve, reject) {
        req.onerror = (err) => reject(err);
    }

    //  Sets an abort listener that will reject the promise when an abort is called
    function setAbortListener (req, options, NET_CONFIG, resolve, reject) {
        req.onabort = (err) => reject(err);
    }

    //  Sets a timeout listener if timeout options are enabled, that will reject the promise as soon
    //  as the request is taking longer than x miliseconds ( based on what the timeout was configured to )
    function setTimeoutListener (req, options, NET_CONFIG, resolve, reject) {
        const timeout = Object.prototype.hasOwnProperty.call(options, 'timeout')
            ? options.timeout
            : NET_CONFIG.timeout;

        if (!timeout) return;
        if (!isNumber(timeout)) throw new TypeError('Net:setTimeoutListener expects timeout to be an integer number');

        req.ontimeout = (err) => reject(err);
        req.timeout = Math.floor(timeout);
    }

    //  Sets a progress listener if configured, that will call a configured callback handler with progress events
    function setProgressListener (req, options, NET_CONFIG, resolve, reject) {
        const onProgress = Object.prototype.hasOwnProperty.call(options, 'onprogress')
            ? options.onprogress
            : NET_CONFIG.onprogress;

        if (!config.onProgress) return;
        if (!isFunction(config.onProgress)) throw new TypeError('Net:setProgressListener expects onProgress to be a function');

        req.onprogress = progressHandler;
    }

//
//  EXPORTS
//

    //  Sets all types of listeners on the xhr request object to be able to respond to any type of
    //  event that occurs on the xhr object.
    export function setRequestListeners (req, options, NET_CONFIG, resolve, reject) {
        setErrorListener(req, options, NET_CONFIG, resolve, reject);
        setAbortListener(req, options, NET_CONFIG, resolve, reject);
        setTimeoutListener(req, options, NET_CONFIG, resolve, reject);
        setProgressListener(req, options, NET_CONFIG, resolve, reject);
    }
