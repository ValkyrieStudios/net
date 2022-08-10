'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));

var _noop = _interopRequireDefault(require("@valkyriestudios/utils/function/noop"));

var _constants = require("./constants");

var _serializeResponseType = _interopRequireDefault(require("./serialize/serializeResponseType"));

var _serializeHeaders = _interopRequireDefault(require("./serialize/serializeHeaders"));

var _serializeURL = _interopRequireDefault(require("./serialize/serializeURL"));

var _serializeWithCredentials = _interopRequireDefault(require("./serialize/serializeWithCredentials"));

var _serializeTimeout = _interopRequireDefault(require("./serialize/serializeTimeout"));

var _serializeOnProgress = _interopRequireDefault(require("./serialize/serializeOnProgress"));

var _serializeMethod = _interopRequireDefault(require("./serialize/serializeMethod"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//  NET Library configuration
var NET_CONFIG = Object.seal({
  base: false,
  headers: false,
  method: false,
  onProgress: false,
  params: false,
  timeout: false,
  withCredentials: false,
  responseType: ''
}); //  Determine the scenario to run in

var Scenario = null;

if (typeof window !== 'undefined') {
  Scenario = require('./scenarios/browser')["default"];
} else if (typeof process !== 'undefined' && (process.versions || {}).electron) {
  Scenario = require('./scenarios/browser')["default"];
} else {
  Scenario = require('./scenarios/node')["default"];
} //  Serialize call parameters into an understandable format for every scenario


function serialize(url, method) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return Object.seal({
    url: (0, _serializeURL["default"])(url, options, NET_CONFIG),
    headers: (0, _serializeHeaders["default"])(options, NET_CONFIG),
    withCredentials: (0, _serializeWithCredentials["default"])(options, NET_CONFIG),
    onProgress: (0, _serializeOnProgress["default"])(options, NET_CONFIG),
    timeout: (0, _serializeTimeout["default"])(options, NET_CONFIG),
    method: (0, _serializeMethod["default"])(method, NET_CONFIG),
    responseType: (0, _serializeResponseType["default"])(options, NET_CONFIG),
    data: data
  });
}

var Net = /*#__PURE__*/function () {
  function Net() {
    _classCallCheck(this, Net);
  }

  _createClass(Net, null, [{
    key: "request",
    value: function request(url) {
      var _METHOD$GET$METHOD$PO;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      //  Normalize method
      var method = "".concat(options.method.slice(0, 1).toUpperCase()).concat(options.method.slice(1));
      return ((_METHOD$GET$METHOD$PO = {}, _defineProperty(_METHOD$GET$METHOD$PO, _constants.METHOD.GET, Net.get), _defineProperty(_METHOD$GET$METHOD$PO, _constants.METHOD.POST, Net.post), _defineProperty(_METHOD$GET$METHOD$PO, _constants.METHOD.PUT, Net.put), _defineProperty(_METHOD$GET$METHOD$PO, _constants.METHOD.PATCH, Net.patch), _defineProperty(_METHOD$GET$METHOD$PO, _constants.METHOD.DELETE, Net["delete"]), _defineProperty(_METHOD$GET$METHOD$PO, _constants.METHOD.HEAD, Net.head), _defineProperty(_METHOD$GET$METHOD$PO, _constants.METHOD.OPTIONS, Net.options), _METHOD$GET$METHOD$PO)[method] || _noop["default"])(url, options);
    }
  }]);

  return Net;
}();

exports["default"] = Net;

_defineProperty(Net, "configure", function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!_is["default"].Object(options)) throw new TypeError('Net:configure expects an Object');
  Object.keys(options).forEach(function (key) {
    if (NET_CONFIG.hasOwnProperty(key)) {
      NET_CONFIG[key] = options[key];
    }
  });
});

_defineProperty(Net, "get", function (url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Scenario.run(serialize(url, _constants.METHOD.GET, options));
});

_defineProperty(Net, "post", function (url, data) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return Scenario.run(serialize(url, _constants.METHOD.POST, options, data));
});

_defineProperty(Net, "put", function (url, data) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return Scenario.run(serialize(url, _constants.METHOD.PUT, options, data));
});

_defineProperty(Net, "patch", function (url, data) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return Scenario.run(serialize(url, _constants.METHOD.PATCH, options, data));
});

_defineProperty(Net, "delete", function (url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Scenario.run(serialize(url, _constants.METHOD.DELETE, options));
});

_defineProperty(Net, "head", function (url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Scenario.run(serialize(url, _constants.METHOD.HEAD, options));
});

_defineProperty(Net, "options", function (url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Scenario.run(serialize(url, _constants.METHOD.OPTIONS, options));
});