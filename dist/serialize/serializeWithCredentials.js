'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = serializeWithCredentials;

function serializeWithCredentials(options, NET_CONFIG) {
  return options.hasOwnProperty('withCredentials') ? options.withCredentials : NET_CONFIG.withCredentials;
}