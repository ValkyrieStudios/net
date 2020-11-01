'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/object/is"));

var _is2 = _interopRequireDefault(require("@valkyriestudios/utils/array/is"));

var _Scenario2 = _interopRequireDefault(require("../blueprints/Scenario"));

var _Response = _interopRequireDefault(require("../blueprints/Response"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function getResponseHeaders(req) {
  return req.getAllResponseHeaders().split('\n').reduce(function (acc, header) {
    header = header.split(':') || [];
    if (header.length === 0) return acc;
    var key = header.shift().trim().toLowerCase();
    var val = header.join(':').trim();
    if (key === '') return acc;
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
    //  Creates an xhr request to the provided url and applies the configured options to it
    value: function run(options) {
      return _get(_getPrototypeOf(BrowserScenario), "run", this).call(this, options, function (resolve, reject) {
        //  Create a new request object
        var req = new XMLHttpRequest(); //  Open request to url

        req.open(options.method, options.url, true); //  Apply configurable listeners to the request

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
        } //  Apply with credentials


        if (options.withCredentials) {
          req.withCredentials = withCredentials;
        } //  Apply response type


        if (options.responseType && options.responseType !== '') {
          req.responseType = options.responseType;
        } //  Set headers


        Object.keys(options.headers).forEach(function (name) {
          return req.setRequestHeader(name, options.headers[name]);
        }); //  Triggered when the state of the XMLHttpRequest changes

        req.onreadystatechange = function () {
          if (req.readyState !== 4) return;
          if (req.status === 0 && !((req.responseURL || '').indexOf('file:') === 0)) return;
          var status = req.status,
              statusText = req.statusText;
          resolve(new _Response["default"](status, statusText, req.response, getResponseHeaders(req), options));
        }; //  Send request


        if (options.data && _constants.METHODS_ALLOWED_BODY[options.method]) {
          req.send((0, _is["default"])(options.data) || (0, _is2["default"])(options.data) ? JSON.stringify(options.data) : options.data);
        } else {
          req.send();
        }
      });
    }
  }]);

  return BrowserScenario;
}(_Scenario2["default"]);

exports["default"] = BrowserScenario;