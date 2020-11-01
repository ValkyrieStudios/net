'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = serializeURL;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/object/is"));

var _is2 = _interopRequireDefault(require("@valkyriestudios/utils/array/is"));

var _is3 = _interopRequireDefault(require("@valkyriestudios/utils/string/is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//
//  PRIVATE
//
//  Serialize a key-value pair object into a query string
//  e.g : {a:1,b:2} => 'a=1&b=2'
function serializeQueryParameters(params) {
  var query = params;

  if (!(0, _is["default"])(params) && !(0, _is3["default"])(params) || (0, _is2["default"])(params)) {
    throw new TypeError('Net:serializeURL expects params option to be either a string or an object');
  }

  if ((0, _is["default"])(params)) {
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