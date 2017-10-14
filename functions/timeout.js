import {isNumber} from '@valkyriestudios/utils/number';

/**
 * Set a possible timeout on the request based on an integer value in ms
 * IF a falsey or empty value or false is passed no adjustments will be made
 */
export function setTimeout (req, options = {}, NET_CONFIG, resolve, reject) {
    const timeout = options.hasOwnProperty('timeout')
        ? parseInt(options.timeout, 10)
        : NET_CONFIG.timeout;

    //  IF no timeout is passed simply return
    if (!timeout) return;

    //  IF a non-numerical value is passed, throw a type error
    if (!isNumber) throw new TypeError('NET : timeout requires an integer value to be passed');

    //  Timeout handler for XMLHttpRequest
    req.ontimeout = (err) => reject(err);

    //  Set a timeout on this request
    req.timeout = parseInt(timeout, 10);
}
