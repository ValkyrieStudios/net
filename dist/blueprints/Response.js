'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = void 0;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/object/is"));
var _constants = require("../constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || !1; descriptor.configurable = !0; if ("value" in descriptor) descriptor.writable = !0; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: !1 }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var Response = exports["default"] = _createClass(function Response(code) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  _classCallCheck(this, Response);
  this.status = code && msg ? {
    code: code,
    msg: msg
  } : undefined;
  this.headers = (0, _is["default"])(headers) ? headers : {};
  this.data = {};
  if (data) {
    try {
      if ((0, _is["default"])(options) && options.responseType === _constants.RESPONSE_TYPES.JSON || (headers['content-type'] || '').indexOf('application/json') > -1) {
        this.data = JSON.parse(data);
      } else {
        this.data = data;
      }
    } catch (err) {}
  }
});