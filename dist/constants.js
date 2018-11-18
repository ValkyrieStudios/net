'use strict'; //  VERBS

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RESPONSE_TYPES = exports.METHODS_ALLOWED_BODY = exports.METHOD = void 0;

var _Object$freeze;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var METHOD = Object.freeze({
  GET: 'Get',
  PUT: 'Put',
  PATCH: 'Patch',
  POST: 'Post',
  DELETE: 'Delete',
  HEAD: 'Head',
  OPTIONS: 'Options'
}); //  VERBS Allowed to send data in body

exports.METHOD = METHOD;
var METHODS_ALLOWED_BODY = Object.freeze((_Object$freeze = {}, _defineProperty(_Object$freeze, METHOD.PUT, true), _defineProperty(_Object$freeze, METHOD.POST, true), _defineProperty(_Object$freeze, METHOD.PATCH, true), _Object$freeze)); //  RESPONSE TYPES

exports.METHODS_ALLOWED_BODY = METHODS_ALLOWED_BODY;
var RESPONSE_TYPES = Object.freeze({
  ARRAY_BUFFER: 'arraybuffer',
  BLOB: 'blob',
  DOCUMENT: 'document',
  JSON: 'json',
  TEXT: 'text'
});
exports.RESPONSE_TYPES = RESPONSE_TYPES;