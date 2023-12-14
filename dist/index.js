'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = void 0;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/object/is"));
var _constants = require("./constants");
var _serializeResponseType = _interopRequireDefault(require("./serialize/serializeResponseType"));
var _serializeHeaders = _interopRequireDefault(require("./serialize/serializeHeaders"));
var _serializeURL = _interopRequireDefault(require("./serialize/serializeURL"));
var _serializeWithCredentials = _interopRequireDefault(require("./serialize/serializeWithCredentials"));
var _serializeTimeout = _interopRequireDefault(require("./serialize/serializeTimeout"));
var _serializeOnProgress = _interopRequireDefault(require("./serialize/serializeOnProgress"));
var _serializeMethod = _interopRequireDefault(require("./serialize/serializeMethod"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || !1; descriptor.configurable = !0; if ("value" in descriptor) descriptor.writable = !0; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: !1 }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var NET_CONFIG = Object.seal({
  base: !1,
  headers: !1,
  method: !1,
  onProgress: !1,
  params: !1,
  timeout: !1,
  withCredentials: !1,
  responseType: ''
});
var Scenario = null;
if (typeof window !== 'undefined') {
  Scenario = require('./scenarios/browser')["default"];
} else if (typeof process !== 'undefined' && (process.versions || {}).electron) {
  Scenario = require('./scenarios/browser')["default"];
} else {
  Scenario = require('./scenarios/node')["default"];
}
function serialize(url, method) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
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
var Net = exports["default"] = function () {
  function Net() {
    _classCallCheck(this, Net);
  }
  _createClass(Net, null, [{
    key: "configure",
    value: function configure() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!(0, _is["default"])(options)) throw new TypeError('Net:configure expects an Object');
      for (var _i = 0, _Object$keys = Object.keys(options); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        if (!NET_CONFIG.hasOwnProperty(key)) continue;
        NET_CONFIG[key] = options[key];
      }
    }
  }, {
    key: "get",
    value: function get(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return Scenario.run(serialize(url, _constants.METHOD.GET, options));
    }
  }, {
    key: "post",
    value: function post(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return Scenario.run(serialize(url, _constants.METHOD.POST, options, data));
    }
  }, {
    key: "put",
    value: function put(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return Scenario.run(serialize(url, _constants.METHOD.PUT, options, data));
    }
  }, {
    key: "patch",
    value: function patch(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return Scenario.run(serialize(url, _constants.METHOD.PATCH, options, data));
    }
  }, {
    key: "delete",
    value: function _delete(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return Scenario.run(serialize(url, _constants.METHOD.DELETE, options));
    }
  }, {
    key: "head",
    value: function head(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return Scenario.run(serialize(url, _constants.METHOD.HEAD, options));
    }
  }, {
    key: "options",
    value: function options(url) {
      var _options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return Scenario.run(serialize(url, _constants.METHOD.OPTIONS, _options));
    }
  }, {
    key: "request",
    value: function request(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var method = "".concat(options.method.slice(0, 1).toUpperCase()).concat(options.method.slice(1));
      switch (method) {
        case _constants.METHOD.GET:
          return Net.get(url, options);
        case _constants.METHOD.POST:
          return Net.post(url, options);
        case _constants.METHOD.PUT:
          return Net.put(url, options);
        case _constants.METHOD.PATCH:
          return Net.patch(url, options);
        case _constants.METHOD.DELETE:
          return Net["delete"](url, options);
        case _constants.METHOD.HEAD:
          return Net.head(url, options);
        case _constants.METHOD.OPTIONS:
          return Net.options(url, options);
        default:
          throw new Error("Unknown HTTP verb for request to ".concat(url));
      }
    }
  }]);
  return Net;
}();