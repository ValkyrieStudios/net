'use strict';

import {RESPONSE_TYPES} from '../constants';

//  Parses the response to a request and returns an object of form {status, data, headers, options}

export default class Response {
    constructor (code, msg = '', data = undefined, headers = {}, options = {}) {
        this.status     = (code && msg) ? { code, msg } : undefined;
        this.headers    = headers;

        this.data = {};
        if (data) {
            try {
                this.data = (options.responseType === RESPONSE_TYPES.JSON || ((headers['content-type'] || '').indexOf('application/json') > -1))
                    ? JSON.parse(data)
                    : data;
            } catch (err) {}
        }
    }
}
