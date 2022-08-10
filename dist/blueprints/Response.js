'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("../constants");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//  Parses the response to a request and returns an object of form {status, data, headers, options}
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
  this.headers = headers;
  this.data = {};

  if (data) {
    try {
      this.data = options.responseType === _constants.RESPONSE_TYPES.JSON || (headers['content-type'] || '').indexOf('application/json') > -1 ? JSON.parse(data) : data;
    } catch (err) {}
  }
});

exports["default"] = Response;