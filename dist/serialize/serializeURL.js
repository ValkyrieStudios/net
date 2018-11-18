'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = serializeURL;

var _object = require("@valkyriestudios/utils/object");

var _array = require("@valkyriestudios/utils/array");

var _string = require("@valkyriestudios/utils/string");

//
//  PRIVATE
//
//  Serialize a key-value pair object into a query string
//  e.g : {a:1,b:2} => 'a=1&b=2'
function serializeQueryParameters(params) {
  var query = params;

  if (!(0, _object.isObject)(params) && !(0, _string.isString)(params) || (0, _array.isArray)(params)) {
    throw new TypeError('Net:serializeURL expects params option to be either a string or an object');
  }

  if ((0, _object.isObject)(params)) {
    query = Object.keys(params).reduce(function (acc, key) {
      acc.push("".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(params[key])));
      return acc;
    }, []).join('&');
  }

  return query;
} //
//  EXPORTS
//


function serializeURL(url, options, NET_CONFIG) {
  //  Check for possibly configured querystring parameters
  var params = Object.prototype.hasOwnProperty.call(options, 'params') ? options.params : NET_CONFIG.params; //  Check for possibly configured base domain (e.g: https://www.google.com)

  var base = Object.prototype.hasOwnProperty.call(options, 'base') ? options.base : NET_CONFIG.base; //  Build base url

  var serialized_url = "".concat(base ? base : '').concat(url); //  Add possible query string parameters to url

  if (params) {
    serialized_url = "".concat(serialized_url, "?").concat(serializeQueryParameters(params));
  }

  return serialized_url;
}