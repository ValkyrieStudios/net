'use strict';
Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports.RESPONSE_TYPES = exports.METHODS_ALLOWED_BODY = exports.METHOD = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var METHOD = exports.METHOD = Object.freeze({
  GET: 'Get',
  PUT: 'Put',
  PATCH: 'Patch',
  POST: 'Post',
  DELETE: 'Delete',
  HEAD: 'Head',
  OPTIONS: 'Options'
});
var METHODS_ALLOWED_BODY = exports.METHODS_ALLOWED_BODY = Object.freeze(_defineProperty(_defineProperty(_defineProperty({}, METHOD.PUT, !0), METHOD.POST, !0), METHOD.PATCH, !0));
var RESPONSE_TYPES = exports.RESPONSE_TYPES = Object.freeze({
  ARRAY_BUFFER: 'arraybuffer',
  BLOB: 'blob',
  DOCUMENT: 'document',
  JSON: 'json',
  TEXT: 'text'
});