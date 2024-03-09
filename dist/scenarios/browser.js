'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = void 0;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/function/is"));
var _is2 = _interopRequireDefault(require("@valkyriestudios/utils/object/is"));
var _isNotEmpty = _interopRequireDefault(require("@valkyriestudios/utils/object/isNotEmpty"));
var _isNotEmpty2 = _interopRequireDefault(require("@valkyriestudios/utils/string/isNotEmpty"));
var _isIntegerAbove = _interopRequireDefault(require("@valkyriestudios/utils/number/isIntegerAbove"));
var _Scenario2 = _interopRequireDefault(require("../blueprints/Scenario"));
var _Response = _interopRequireDefault(require("../blueprints/Response"));
var _constants = require("../constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || !1; descriptor.configurable = !0; if ("value" in descriptor) descriptor.writable = !0; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: !1 }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: !0, configurable: !0 } }); Object.defineProperty(subClass, "prototype", { writable: !1 }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function getResponseHeaders(req) {
  return req.getAllResponseHeaders().split('\n').reduce(function (acc, header) {
    header = header.split(':') || [];
    if (!Array.isArray(header) || header.length === 0) return acc;
    var key = header.shift().trim().toLowerCase();
    var val = header.join(':').trim();
    if (!(0, _isNotEmpty2["default"])(key)) return acc;
    acc[key] = acc.hasOwnProperty(key) ? "".concat(acc[key], ", ").concat(val) : val;
    return acc;
  }, {});
}
var BrowserScenario = exports["default"] = function (_Scenario) {
  _inherits(BrowserScenario, _Scenario);
  function BrowserScenario() {
    _classCallCheck(this, BrowserScenario);
    return _callSuper(this, BrowserScenario, arguments);
  }
  _createClass(BrowserScenario, null, [{
    key: "run",
    value: function run(options) {
      return _get(_getPrototypeOf(BrowserScenario), "run", this).call(this, options, function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open(options.method, options.url, !0);
        req.onerror = function (err) {
          return reject(err);
        };
        req.onabort = function (err) {
          return reject(err);
        };
        if ((0, _isIntegerAbove["default"])(options.timeout)) {
          req.ontimeout = function (err) {
            return reject(err);
          };
          req.timeout = options.timeout;
        }
        if ((0, _is["default"])(options.onProgress)) {
          req.onprogress = options.onProgress;
        }
        if (options.withCredentials) {
          req.withCredentials = options.withCredentials;
        }
        if ((0, _isNotEmpty2["default"])(options.responseType)) {
          req.responseType = options.responseType;
        }
        if ((0, _isNotEmpty["default"])(options.headers)) {
          for (var _i = 0, _Object$keys = Object.keys(options.headers); _i < _Object$keys.length; _i++) {
            var header = _Object$keys[_i];
            req.setRequestHeader(header, options.headers[header]);
          }
        }
        req.onreadystatechange = function () {
          if (req.readyState !== 4) return;
          if (req.status === 0 && !((req.responseURL || '').indexOf('file:') === 0)) return;
          return resolve(new _Response["default"](req.status, req.statusText, req.response, getResponseHeaders(req), options));
        };
        if (options.data && _constants.METHODS_ALLOWED_BODY[options.method]) {
          req.send((0, _is2["default"])(options.data) || Array.isArray(options.data) ? JSON.stringify(options.data) : options.data);
        } else {
          req.send();
        }
      });
    }
  }]);
  return BrowserScenario;
}(_Scenario2["default"]);