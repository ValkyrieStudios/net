'use strict';

export default class Scenario {
    static run (options, cb)  {
        return new Promise((resolve, reject) => {
            try {
                cb(resolve, reject);
            } catch (err) {
                reject(err);
            }
        });
    }
}
