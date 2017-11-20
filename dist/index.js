'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || !1; descriptor.configurable = !0; if ("value" in descriptor) descriptor.writable = !0; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _object = require('@valkyriestudios/utils/object');

var _function = require('@valkyriestudios/utils/function');

var _constants = require('./constants');

var _serializeHeaders = require('./serialize/serializeHeaders');

var _serializeHeaders2 = _interopRequireDefault(_serializeHeaders);

var _serializeURL = require('./serialize/serializeURL');

var _serializeURL2 = _interopRequireDefault(_serializeURL);

var _serializeWithCredentials = require('./serialize/serializeWithCredentials');

var _serializeWithCredentials2 = _interopRequireDefault(_serializeWithCredentials);

var _serializeTimeout = require('./serialize/serializeTimeout');

var _serializeTimeout2 = _interopRequireDefault(_serializeTimeout);

var _serializeOnProgress = require('./serialize/serializeOnProgress');

var _serializeOnProgress2 = _interopRequireDefault(_serializeOnProgress);

var _serializeMethod = require('./serialize/serializeMethod');

var _serializeMethod2 = _interopRequireDefault(_serializeMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//
//  PRIVATE
//

//  NET Library configuration
var NET_CONFIG = Object.seal({
    base: !1,
    headers: !1,
    method: !1,
    onProgress: !1,
    params: !1,
    timeout: !1,
    withCredentials: !1
});

//  Determine the scenario to run in
var scenario = null;

if (typeof window !== 'undefined' && {}.toString().call(window) === '[object Window]') {
    require('./scenarios/browser').default;
} else if (typeof process !== 'undefined' && (process.versions || {}).electron) {
    require('./scenarios/browser').default;
} else {
    require('./scenarios/node').default;
}

//  Serialize call parameters into an understandable format for every scenario
function serialize(url, method) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;

    return Object.seal({
        url: (0, _serializeURL2.default)(url, options, NET_CONFIG),
        headers: (0, _serializeHeaders2.default)(options, NET_CONFIG),
        withCredentials: (0, _serializeWithCredentials2.default)(options, NET_CONFIG),
        onProgress: (0, _serializeOnProgress2.default)(options, NET_CONFIG),
        timeout: (0, _serializeTimeout2.default)(options, NET_CONFIG),
        method: (0, _serializeMethod2.default)(method, NET_CONFIG),
        data: data
    });
}

//
//  EXPORTS
//

var Net = function () {
    function Net() {
        _classCallCheck(this, Net);
    }

    _createClass(Net, null, [{
        key: 'request',
        value: function request(url) {
            var _METHOD$GET$METHOD$PO;

            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            //  Normalize method
            var method = '' + options.method.slice(0, 1).toUpperCase() + options.method.slice(1);

            return ((_METHOD$GET$METHOD$PO = {}, _defineProperty(_METHOD$GET$METHOD$PO, _constants.METHOD.GET, Net.get), _defineProperty(_METHOD$GET$METHOD$PO, _constants.METHOD.POST, Net.post), _defineProperty(_METHOD$GET$METHOD$PO, _constants.METHOD.PUT, Net.put), _defineProperty(_METHOD$GET$METHOD$PO, _constants.METHOD.PATCH, Net.patch), _defineProperty(_METHOD$GET$METHOD$PO, _constants.METHOD.DELETE, Net.delete), _defineProperty(_METHOD$GET$METHOD$PO, _constants.METHOD.HEAD, Net.head), _defineProperty(_METHOD$GET$METHOD$PO, _constants.METHOD.OPTIONS, Net.options), _METHOD$GET$METHOD$PO)[method] || _function.noop)(url, options);
        }
    }]);

    return Net;
}();

Net.version = function () {
    return '1.4.0';
};

Net.configure = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!(0, _object.isObject)(options)) throw new TypeError('Net:configure expects an Object');

    Object.keys(options).forEach(function (key) {
        if (NET_CONFIG.hasOwnProperty(key)) {
            NET_CONFIG[key] = options[key];
        }
    });
};

Net.get = function (url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Scenario.run(serialize(url, _constants.METHOD.GET, options));
};

Net.post = function (url, data) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return Scenario.run(serialize(url, _constants.METHOD.POST, options, data));
};

Net.put = function (url, data) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return Scenario.run(serialize(url, _constants.METHOD.PUT, options, data));
};

Net.patch = function (url, data) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return Scenario.run(serialize(url, _constants.METHOD.PATCH, options, data));
};

Net.delete = function (url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Scenario.run(serialize(url, _constants.METHOD.DELETE, options));
};

Net.head = function (url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Scenario.run(serialize(url, _constants.METHOD.HEAD, options));
};

Net.options = function (url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Scenario.run(serialize(url, _constants.METHOD.OPTIONS, options));
};

exports.default = Net;