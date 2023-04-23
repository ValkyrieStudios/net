'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/function/is"));
var _is2 = _interopRequireDefault(require("@valkyriestudios/utils/object/is"));
var _is3 = _interopRequireDefault(require("@valkyriestudios/utils/array/is"));
var _isIntegerAbove = _interopRequireDefault(require("@valkyriestudios/utils/number/isIntegerAbove"));
var _constants = require("../constants");
var _Response = _interopRequireDefault(require("../blueprints/Response"));
var _Scenario2 = _interopRequireDefault(require("../blueprints/Scenario"));
var _http = _interopRequireDefault(require("http"));
var _https = _interopRequireDefault(require("https"));
var _url = _interopRequireDefault(require("url"));
var _zlib = _interopRequireDefault(require("zlib"));
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
//  Creates a request to the provided url and applies the configured options to it
var NodeScenario = /*#__PURE__*/function (_Scenario) {
  _inherits(NodeScenario, _Scenario);
  var _super = _createSuper(NodeScenario);
  function NodeScenario() {
    _classCallCheck(this, NodeScenario);
    return _super.apply(this, arguments);
  }
  _createClass(NodeScenario, null, [{
    key: "run",
    value: function run(options) {
      return _get(_getPrototypeOf(NodeScenario), "run", this).call(this, options, function (resolve, reject) {
        var aborted = false;
        var timer = false;

        //  Parse url
        var url_parsed = _url["default"].parse(options.url);

        //  Retrieve library to do request with
        var lib = url_parsed.protocol === 'https:' ? _https["default"] : _http["default"];

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

          // uncompress the response body transparently if required
          var stream = res;

          //  uncompress the response body transparently if required
          switch (res.headers['content-encoding']) {
            case 'gzip':
            case 'compress':
            case 'deflate':
              stream = stream.pipe(_zlib["default"].createUnzip());
              delete res.headers['content-encoding'];
              break;
            default:
              break;
          }

          //  Set encoding to utf8
          stream.setEncoding('utf8');

          //  Incoming data
          stream.on('data', function (chunk) {
            loaded += chunk.length;
            data.push(chunk);
            if ((0, _is["default"])(options.onProgress)) {
              options.onProgress({
                total: total,
                loaded: loaded
              });
            }
          });

          //  If request was aborted, throw a custom error, otherwise simply reject
          stream.on('error', function (err) {
            return reject(aborted ? function () {
              var abort_error = new Error("Net: Timeout of ".concat(options.timeout, " was reached"));
              abort_error.code = 'ECONNABORTED';
              return abort_error;
            }() : err);
          });

          //  End of response
          stream.on('end', function () {
            if (timer) clearTimeout();
            return resolve(new _Response["default"](res.statusCode, res.statusMessage, data.join(''), res.headers, options));
          });
        });

        //  If initial request was aborted ... reject
        req.on('error', reject);

        //  Timeout
        if ((0, _isIntegerAbove["default"])(options.timeout, 0)) {
          timer = setTimeout(function () {
            aborted = true;
            req.abort();
            clearTimeout(timer);
          }, options.timeout);
        }

        //  Send request
        if (options.data && _constants.METHODS_ALLOWED_BODY[options.method]) {
          var data = options.data;

          //  Stream
          if ((0, _is2["default"])(options.data) && (0, _is["default"])(options.data)) {
            data.pipe(req);
            return;
          }

          //  Apply some conversion
          if (Object.prototype.toString.call(data) === '[object ArrayBuffer]') {
            data = new Buffer(new Uint8Array(data));
          } else if ((0, _is3["default"])(data) || (0, _is2["default"])(data)) {
            data = new Buffer(JSON.stringify(data), 'utf-8');
          } else {
            data = new Buffer("".concat(data), 'utf-8');
          }
          req.end(data);
        } else {
          req.end();
        }
      });
    }
  }]);
  return NodeScenario;
}(_Scenario2["default"]);
exports["default"] = NodeScenario;