'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || !1; descriptor.configurable = !0; if ("value" in descriptor) descriptor.writable = !0; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _object = require('@valkyriestudios/utils/object');

var _function = require('@valkyriestudios/utils/function');

var _array = require('@valkyriestudios/utils/array');

var _string = require('@valkyriestudios/utils/string');

var _constants = require('../constants');

var _Response = require('../blueprints/Response');

var _Response2 = _interopRequireDefault(_Response);

var _Scenario2 = require('../blueprints/Scenario');

var _Scenario3 = _interopRequireDefault(_Scenario2);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _zlib = require('zlib');

var _zlib2 = _interopRequireDefault(_zlib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: !1, writable: !0, configurable: !0 } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//  Creates a request to the provided url and applies the configured options to it
var NodeScenario = function (_Scenario) {
    _inherits(NodeScenario, _Scenario);

    function NodeScenario() {
        _classCallCheck(this, NodeScenario);

        return _possibleConstructorReturn(this, (NodeScenario.__proto__ || Object.getPrototypeOf(NodeScenario)).apply(this, arguments));
    }

    _createClass(NodeScenario, null, [{
        key: 'run',
        value: function run(options) {
            return _get(NodeScenario.__proto__ || Object.getPrototypeOf(NodeScenario), 'run', this).call(this, options, function (resolve, reject) {
                var aborted = !1;
                var timer = !1;

                //  Parse url
                var url_parsed = _url2.default.parse(options.url);

                //  Retrieve library to do request with
                var lib = url_parsed.protocol === 'https:' ? _https2.default : _http2.default;

                //  Create request
                var req = lib.request({
                    hostname: url_parsed.hostname,
                    port: url_parsed.port,
                    path: url_parsed.path,
                    method: options.method.toUpperCase(),
                    headers: options.headers || {},
                    protocol: url_parsed.protocol
                }, function (res) {
                    //  Keep track of the amount of downloaded vs total bytes
                    var total = parseInt(res.headers['content-length'], 10);
                    var loaded = 0;
                    var data = [];

                    //  uncompress the response body transparently if required
                    switch (res.headers['content-encoding']) {
                        case 'gzip':
                        case 'compress':
                        case 'deflate':
                            res = res.pipe(_zlib2.default.createUnzip());
                            delete res.headers['content-encoding'];
                            break;
                        default:
                            break;
                    }

                    //  Set encoding to utf8
                    res.setEncoding('utf8');

                    //  Incoming data
                    res.on('data', function (chunk) {
                        loaded += chunk.length;
                        data.push(chunk);

                        if (options.onProgress) options.onProgress({ total: total, loaded: loaded });
                    });

                    //  If request was aborted, throw a custom error, otherwise simply reject
                    res.on('error', function (err) {
                        return reject(aborted ? function () {
                            var e = new Error('Net: Timeout of ' + options.timeout + ' was reached');
                            e.code = 'ECONNABORTED';
                            return e;
                        }() : err);
                    });

                    //  End of response
                    res.on('end', function () {
                        var _res = res,
                            statusCode = _res.statusCode,
                            headers = _res.headers,
                            statusMessage = _res.statusMessage;

                        resolve(new _Response2.default(statusCode, statusMessage, data.join(''), headers, options));
                    });
                });

                //  If initial request was aborted ... reject
                req.on('error', reject);

                //  Timeout
                if (options.timeout) {
                    timer = setTimeout(function () {
                        aborted = !0;
                        req.abort();
                    }, Math.floor(options.timeout));
                }

                //  Send request
                if (options.data && _constants.METHODS_ALLOWED_BODY[options.method]) {
                    var data = options.data;

                    //  Stream
                    if ((0, _object.isObject)(options.data) && (0, _function.isFunction)(options.data)) {
                        data.pipe(req);
                        return;
                    }

                    //  Apply some conversion
                    if (Object.prototype.toString.call(data) === '[object ArrayBuffer]') {
                        data = new Buffer(new Uint8Array(data));
                    } else if ((0, _array.isArray)(data) || (0, _object.isObject)(data)) {
                        data = new Buffer(JSON.stringify(data), 'utf-8');
                    } else {
                        data = new Buffer('' + data, 'utf-8');
                    }

                    req.end(data);
                } else {
                    req.end();
                }
            });
        }
    }]);

    return NodeScenario;
}(_Scenario3.default);

exports.default = NodeScenario;