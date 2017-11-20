'use strict';

//  VERBS

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _Object$freeze;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }); } else { obj[key] = value; } return obj; }

var METHOD = exports.METHOD = Object.freeze({
    GET: 'Get',
    PUT: 'Put',
    PATCH: 'Patch',
    POST: 'Post',
    DELETE: 'Delete',
    HEAD: 'Head',
    OPTIONS: 'Options'
});

//  VERBS Allowed to send data in body
var METHODS_ALLOWED_BODY = exports.METHODS_ALLOWED_BODY = Object.freeze((_Object$freeze = {}, _defineProperty(_Object$freeze, METHOD.PUT, !0), _defineProperty(_Object$freeze, METHOD.POST, !0), _defineProperty(_Object$freeze, METHOD.PATCH, !0), _Object$freeze));