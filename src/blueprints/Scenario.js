'use strict';

export default class Scenario {

    static run (options, next)  {
        return new Promise((resolve, reject) => {
            try {
                return next(resolve, reject);
            } catch (err) {
                return reject(err);
            }
        });
    }

}
