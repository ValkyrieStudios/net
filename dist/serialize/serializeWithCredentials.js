'use strict';

//
//  EXPORTS
//

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.default = serializeWithCredentials;
function serializeWithCredentials(options, NET_CONFIG) {
    return options.hasOwnProperty('withCredentials') ? options.withCredentials : NET_CONFIG.withCredentials;
}