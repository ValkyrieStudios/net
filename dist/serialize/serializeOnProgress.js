'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.default = serializeOnProgress;

var _function = require('@valkyriestudios/utils/function');

//
//  EXPORTS
//

function serializeOnProgress(options, NET_CONFIG) {
    var onProgress = Object.prototype.hasOwnProperty.call(options, 'onProgress') ? options.onProgress : NET_CONFIG.onProgress;

    if (!onProgress) return !1;
    if (!(0, _function.isFunction)(onProgress)) throw new TypeError('Net:serializeOnProgress expects onProgress to be a function');

    return onProgress;
}