'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
var _constants = require("../constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
//  Parses the response to a request and returns
//  an object of form {status, data, headers}
var Response = /*#__PURE__*/_createClass(function Response(code) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  _classCallCheck(this, Response);
  this.status = code && msg ? {
    code: code,
    msg: msg
  } : undefined;
  this.headers = _is["default"].Object(headers) ? headers : {};
  this.data = {};
  if (data) {
    try {
      if (_is["default"].Object(options) && options.responseType === _constants.RESPONSE_TYPES.JSON || (headers['content-type'] || '').indexOf('application/json') > -1) {
        this.data = JSON.parse(data);
      } else {
        this.data = data;
      }
    } catch (err) {
      //  noop
    }
  }
});
exports["default"] = Response;