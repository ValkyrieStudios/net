'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
var _Scenario2 = _interopRequireDefault(require("../blueprints/Scenario"));
var _Response = _interopRequireDefault(require("../blueprints/Response"));
var _constants = require("../constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function getResponseHeaders(req) {
  return req.getAllResponseHeaders().split('\n').reduce(function (acc, header) {
    header = header.split(':') || [];
    if (!_is["default"].NotEmptyArray(header)) return acc;
    var key = header.shift().trim().toLowerCase();
    var val = header.join(':').trim();
    if (!_is["default"].NotEmptyString(key)) return acc;
    acc[key] = acc.hasOwnProperty(key) ? "".concat(acc[key], ", ").concat(val) : val;
    return acc;
  }, {});
}
var BrowserScenario = /*#__PURE__*/function (_Scenario) {
  _inherits(BrowserScenario, _Scenario);
  var _super = _createSuper(BrowserScenario);
  function BrowserScenario() {
    _classCallCheck(this, BrowserScenario);
    return _super.apply(this, arguments);
  }
  _createClass(BrowserScenario, null, [{
    key: "run",
    value: function run(options) {
      return _get(_getPrototypeOf(BrowserScenario), "run", this).call(this, options, function (resolve, reject) {
        var req = new XMLHttpRequest();

        //  Open request to url
        req.open(options.method, options.url, true);

        //  Apply configurable listeners to the request
        req.onerror = function (err) {
          return reject(err);
        };
        req.onabort = function (err) {
          return reject(err);
        };
        if (_is["default"].IntegerAbove(options.timeout)) {
          req.ontimeout = function (err) {
            return reject(err);
          };
          req.timeout = options.timeout;
        }

        //  On Progress handler
        if (_is["default"].Function(options.onProgress)) {
          req.onprogress = options.onProgress;
        }

        //  Apply with credentials
        if (options.withCredentials) {
          req.withCredentials = options.withCredentials;
        }

        //  Apply response type
        if (_is["default"].NotEmptyString(options.responseType)) {
          req.responseType = options.responseType;
        }

        //  Set headers
        if (_is["default"].NotEmptyObject(options.headers)) {
          for (var _i = 0, _Object$keys = Object.keys(options.headers); _i < _Object$keys.length; _i++) {
            var header = _Object$keys[_i];
            req.setRequestHeader(header, options.headers[header]);
          }
        }

        //  Triggered when the state of the XMLHttpRequest changes
        req.onreadystatechange = function () {
          if (req.readyState !== 4) return;
          if (req.status === 0 && !((req.responseURL || '').indexOf('file:') === 0)) return;
          return resolve(new _Response["default"](req.status, req.statusText, req.response, getResponseHeaders(req), options));
        };

        //  Send request
        if (options.data && _constants.METHODS_ALLOWED_BODY[options.method]) {
          req.send(_is["default"].Object(options.data) || _is["default"].Array(options.data) ? JSON.stringify(options.data) : options.data);
        } else {
          req.send();
        }
      });
    }
  }]);
  return BrowserScenario;
}(_Scenario2["default"]);
exports["default"] = BrowserScenario;