'use strict';

//  Parses the response to a request and returns an object of form {status, data, headers, options}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Response = function Response(code) {
    var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    _classCallCheck(this, Response);

    this.status = code && msg ? { code: code, msg: msg } : undefined;
    this.data = (headers['content-type'] || '').indexOf('application/json') > -1 ? JSON.parse(data) : data;
    this.headers = headers;
    this.options = options;
};

exports.default = Response;