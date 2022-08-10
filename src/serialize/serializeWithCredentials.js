'use strict';

export default function serializeWithCredentials (options, NET_CONFIG) {
    return options.hasOwnProperty('withCredentials')
        ? options.withCredentials
        : NET_CONFIG.withCredentials;
}
