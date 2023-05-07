'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = serializeURL;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/object/is"));
var _isNotEmpty = _interopRequireDefault(require("@valkyriestudios/utils/object/isNotEmpty"));
var _is2 = _interopRequireDefault(require("@valkyriestudios/utils/string/is"));
var _isNotEmpty2 = _interopRequireDefault(require("@valkyriestudios/utils/string/isNotEmpty"));
var _join = _interopRequireDefault(require("@valkyriestudios/utils/array/join"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function serializeURL(url, options, NET_CONFIG) {
  var base = (0, _is["default"])(options) && options.hasOwnProperty('base') ? options.base : NET_CONFIG.base;
  var serialized_url = (0, _join["default"])([base, url], {
    delim: ''
  });
  var params = (0, _is["default"])(options) && options.hasOwnProperty('params') ? options.params : NET_CONFIG.params;
  if ((0, _is2["default"])(params)) {
    params = params.trim();
  } else if ((0, _isNotEmpty["default"])(params)) {
    params = Object.keys(params).reduce(function (acc, key) {
      if (!(0, _isNotEmpty2["default"])(key)) return acc;
      acc.push("".concat(encodeURIComponent(key).trim(), "=").concat(encodeURIComponent(params[key]).trim()));
      return acc;
    }, []).join('&');
  } else {
    params = !1;
  }
  if (params) serialized_url = "".concat(serialized_url, "?").concat(params);
  return serialized_url;
}