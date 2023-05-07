'use strict';
Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports.RESPONSE_TYPES = exports.METHODS_ALLOWED_BODY = exports.METHOD = void 0;
var _Object$freeze;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var METHOD = Object.freeze({
  GET: 'Get',
  PUT: 'Put',
  PATCH: 'Patch',
  POST: 'Post',
  DELETE: 'Delete',
  HEAD: 'Head',
  OPTIONS: 'Options'
});
exports.METHOD = METHOD;
var METHODS_ALLOWED_BODY = Object.freeze((_Object$freeze = {}, _defineProperty(_Object$freeze, METHOD.PUT, !0), _defineProperty(_Object$freeze, METHOD.POST, !0), _defineProperty(_Object$freeze, METHOD.PATCH, !0), _Object$freeze));
exports.METHODS_ALLOWED_BODY = METHODS_ALLOWED_BODY;
var RESPONSE_TYPES = Object.freeze({
  ARRAY_BUFFER: 'arraybuffer',
  BLOB: 'blob',
  DOCUMENT: 'document',
  JSON: 'json',
  TEXT: 'text'
});
exports.RESPONSE_TYPES = RESPONSE_TYPES;