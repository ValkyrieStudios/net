'use strict';

//
//  EXPORTS
//

    //  Set the with credentials property on our request based on what is being passed
    export function setRequestWithCredentials (req, options, NET_CONFIG, resolve, reject) {
        const withCredentials = options.hasOwnProperty('withCredentials')
            ? options.withCredentials
            : NET_CONFIG.withCredentials;

        //  IF no withCredentials option is passed simply return
        if (!withCredentials) return;

        req.withCredentials = withCredentials;
    }
