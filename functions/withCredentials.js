/**
 * Set the withCredentials property on our request
 * IF a falsey or empty value is passed nothing will be done
 */

//  Set the with credentials property on our request based on what is being passed
export function setWithCredentials (req, options, NET_CONFIG, resolve, reject) {
    const withCredentials = options.hasOwnProperty('withCredentials')
        ? options.withCredentials
        : NET_CONFIG.withCredentials;

    //  IF no withCredentials option is passed simply return
    if (!withCredentials) return;

    req.withCredentials = withCredentials;
}
