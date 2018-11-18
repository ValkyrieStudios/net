"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _object = require("@valkyriestudios/utils/object");

var _function = require("@valkyriestudios/utils/function");

var _array = require("@valkyriestudios/utils/array");

var _string = require("@valkyriestudios/utils/string");

var _constants = require("../constants");

var _Response = _interopRequireDefault(require("../blueprints/Response"));

var _Scenario2 = _interopRequireDefault(require("../blueprints/Scenario"));

var _http = _interopRequireDefault(require("http"));

var _https = _interopRequireDefault(require("https"));

var _url = _interopRequireDefault(require("url"));

var _zlib = _interopRequireDefault(require("zlib"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

//  Creates a request to the provided url and applies the configured options to it
var NodeScenario =
/*#__PURE__*/
function (_Scenario) {
  _inherits(NodeScenario, _Scenario);

  function NodeScenario() {
    _classCallCheck(this, NodeScenario);

    return _possibleConstructorReturn(this, _getPrototypeOf(NodeScenario).apply(this, arguments));
  }

  _createClass(NodeScenario, null, [{
    key: "run",
    value: function run(options) {
      return _get(_getPrototypeOf(NodeScenario), "run", this).call(this, options, function (resolve, reject) {
        var aborted = false;
        var timer = false; //  Parse url

        var url_parsed = _url.default.parse(options.url); //  Retrieve library to do request with


        var lib = url_parsed.protocol === 'https:' ? _https.default : _http.default; //  Create request

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
          var data = []; //  uncompress the response body transparently if required

          switch (res.headers['content-encoding']) {
            case 'gzip':
            case 'compress':
            case 'deflate':
              res = res.pipe(_zlib.default.createUnzip());
              delete res.headers['content-encoding'];
              break;

            default:
              break;
          } //  Set encoding to utf8


          res.setEncoding('utf8'); //  Incoming data

          res.on('data', function (chunk) {
            loaded += chunk.length;
            data.push(chunk);
            if (options.onProgress) options.onProgress({
              total: total,
              loaded: loaded
            });
          }); //  If request was aborted, throw a custom error, otherwise simply reject

          res.on('error', function (err) {
            return reject(aborted ? function () {
              var e = new Error("Net: Timeout of ".concat(options.timeout, " was reached"));
              e.code = 'ECONNABORTED';
              return e;
            }() : err);
          }); //  End of response

          res.on('end', function () {
            var _res = res,
                statusCode = _res.statusCode,
                headers = _res.headers,
                statusMessage = _res.statusMessage;
            resolve(new _Response.default(statusCode, statusMessage, data.join(''), headers, options));
          });
        }); //  If initial request was aborted ... reject

        req.on('error', reject); //  Timeout

        if (options.timeout) {
          timer = setTimeout(function () {
            aborted = true;
            req.abort();
          }, Math.floor(options.timeout));
        } //  Send request


        if (options.data && _constants.METHODS_ALLOWED_BODY[options.method]) {
          var data = options.data; //  Stream

          if ((0, _object.isObject)(options.data) && (0, _function.isFunction)(options.data)) {
            data.pipe(req);
            return;
          } //  Apply some conversion


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
}(_Scenario2.default);

exports.default = NodeScenario;