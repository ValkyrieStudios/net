'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || !1; descriptor.configurable = !0; if ("value" in descriptor) descriptor.writable = !0; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _object = require('@valkyriestudios/utils/object');

var _array = require('@valkyriestudios/utils/array');

var _Scenario2 = require('../blueprints/Scenario');

var _Scenario3 = _interopRequireDefault(_Scenario2);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: !1, writable: !0, configurable: !0 } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var BrowserScenario = function (_Scenario) {
    _inherits(BrowserScenario, _Scenario);

    function BrowserScenario() {
        _classCallCheck(this, BrowserScenario);

        return _possibleConstructorReturn(this, (BrowserScenario.__proto__ || Object.getPrototypeOf(BrowserScenario)).apply(this, arguments));
    }

    _createClass(BrowserScenario, null, [{
        key: 'run',

        //  Creates an xhr request to the provided url and applies the configured options to it
        value: function run(options) {
            return _get(BrowserScenario.__proto__ || Object.getPrototypeOf(BrowserScenario), 'run', this).call(this, options, function (resolve, reject) {
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

                    var status = req.status,
                        statusText = req.statusText;


                    resolve(new _Scenario3.default(status, statusText, req.response, getResponseHeaders(req), options));
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
}(_Scenario3.default);

exports.default = BrowserScenario;