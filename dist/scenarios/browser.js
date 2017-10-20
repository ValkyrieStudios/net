'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || !1; descriptor.configurable = !0; if ("value" in descriptor) descriptor.writable = !0; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _object = require('@valkyriestudios/utils/object');

var _array = require('@valkyriestudios/utils/array');

var _constants = require('../constants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getResponseHeaders(req) {
    return req.getAllResponseHeaders().split('\n').reduce(function (acc, header) {
        header = header.split(':') || [];

        if (header.length === 0) return acc;

        var key = header.shift().trim().toLowerCase();
        var val = header.join(':').trim();

        if (key === '') return acc;

        acc[key] = acc.hasOwnProperty(key) ? acc[key] + ', ' + val : val;

        return acc;
    }, {});
}

//  Parses the response to a request and returns an object of form {status, statusText, data, headers}
function _response(req, options) {
    var status = req.status,
        statusText = req.statusText;

    //  Retrieve headers

    var headers = getResponseHeaders(req);
    var data = req.response;

    //  Transform data based on content-type
    if (headers['content-type'].indexOf('application/json') > -1) {
        data = JSON.parse(data);
    }

    //  Return object
    return Object.seal({ status: status, statusText: statusText, data: data, headers: headers });
}

var BrowserScenario = function () {
    function BrowserScenario() {
        _classCallCheck(this, BrowserScenario);
    }

    _createClass(BrowserScenario, null, [{
        key: 'run',

        //  Creates an xhr request to the provided url and applies the configured options to it
        value: function run(options) {
            return new Promise(function (resolve, reject) {
                //  Create a new request object
                var req = new XMLHttpRequest();

                //  Open request to url
                req.open(options.method, options.url, !0);

                //  Apply configurable listeners to the request
                req.onerror = function (err) {
                    return reject(err);
                };
                req.onabort = function (err) {
                    return reject(err);
                };

                if (options.timeout) {
                    req.ontimeout = function (err) {
                        return reject(err);
                    };
                    req.timeout = Math.floor(options.timeout);
                }

                if (options.onProgress) {
                    req.onprogress = options.onProgress;
                }

                //  Apply with credentials
                if (options.withCredentials) {
                    req.withCredentials = withCredentials;
                }

                //  Set headers
                Object.keys(options.headers).forEach(function (name) {
                    return req.setRequestHeader(name, options.headers[name]);
                });

                //  Triggered when the state of the XMLHttpRequest changes
                req.onreadystatechange = function () {
                    if (req.readyState !== 4) return;
                    if (req.status === 0 && !((req.responseURL || '').indexOf('file:') === 0)) return;

                    resolve(_response(req, options));
                };

                //  Send request
                if (options.data && _constants.METHODS_ALLOWED_BODY[options.method]) {
                    req.send((0, _object.isObject)(options.data) || (0, _array.isArray)(options.data) ? JSON.stringify(options.data) : options.data);
                } else {
                    req.send();
                }
            });
        }
    }]);

    return BrowserScenario;
}();

exports.default = BrowserScenario;