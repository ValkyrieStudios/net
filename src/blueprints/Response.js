'use strict';

//  Parses the response to a request and returns an object of form {status, data, headers, options}

export default class Response {
    constructor (code, msg = '', data = undefined, headers = {}) {
        this.status     = (code && msg) ? { code, msg } : undefined;
        this.data       = ((headers['content-type'] || '').indexOf('application/json') > -1) ? JSON.parse(data) : data;
        this.headers    = headers;
    }
}
