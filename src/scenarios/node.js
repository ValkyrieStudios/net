import { isObject } from '@valkyriestudios/utils/object';
import { isFunction } from '@valkyriestudios/utils/function';
import { isArray } from '@valkyriestudios/utils/array';
import { isString } from '@valkyriestudios/utils/string';
import { METHODS_ALLOWED_BODY } from '../constants';
import Response from '../blueprints/Response';
import Scenario from '../blueprints/Scenario';
import http from 'http';
import https from 'https';
import url from 'url';
import zlib from 'zlib';

//  Creates a request to the provided url and applies the configured options to it
export default class NodeScenario extends Scenario {
    static run (options) {
        return super.run(options, (resolve, reject) => {
            let aborted = false;
            let timer = false;

            //  Parse url
            const url_parsed = url.parse(options.url);

            //  Retrieve library to do request with
            const lib = (url_parsed.protocol === 'https:') ? https : http;

            //  Create request
            const req = lib.request({
                hostname    : url_parsed.hostname,
                port        : url_parsed.port,
                path        : url_parsed.path,
                method      : options.method.toUpperCase(),
                headers     : options.headers || {},
                protocol    : url_parsed.protocol,
            }, (res) => {
                //  Keep track of the amount of downloaded vs total bytes
                const total = parseInt(res.headers['content-length'], 10);
                let loaded = 0;
                let data = [];

                //  uncompress the response body transparently if required
                switch (res.headers['content-encoding']) {
                    case 'gzip':
                    case 'compress':
                    case 'deflate':
                        res = res.pipe(zlib.createUnzip());
                        delete res.headers['content-encoding'];
                    break;
                    default:
                        break;
                }

                //  Set encoding to utf8
                res.setEncoding('utf8');

                //  Incoming data
                res.on('data', (chunk) => {
                    loaded += chunk.length;
                    data.push(chunk);

                    if (options.onProgress) options.onProgress({ total, loaded });
                });

                //  If request was aborted, throw a custom error, otherwise simply reject
                res.on('error', (err) => reject(aborted
                    ? (() => {
                        const e = new Error(`Net: Timeout of ${options.timeout} was reached`);
                        e.code = 'ECONNABORTED';
                        return e;
                    })()
                    : err
                ));

                //  End of response
                res.on('end', () => {
                    const { statusCode, headers, statusMessage } = res;
                    resolve(new Response(statusCode, statusMessage, data.join(''), headers));
                });
            });

            //  If initial request was aborted ... reject
            req.on('error', reject);

            //  Timeout
            if (options.timeout) {
                timer = setTimeout(() => {
                    aborted = true;
                    req.abort()
                }, Math.floor(options.timeout));
            }

            //  Send request
            if (options.data && METHODS_ALLOWED_BODY[options.method]) {
                let data = options.data;

                //  Stream
                if (isObject(options.data) && isFunction(options.data)) {
                    data.pipe(req);
                    return;
                }

                //  Apply some conversion
                if (Object.prototype.toString.call(data) === '[object ArrayBuffer]') {
                    data = new Buffer(new Uint8Array(data));
                } else if (isArray(data) || isObject(data)) {
                    data = new Buffer(JSON.stringify(data), 'utf-8');
                } else {
                    data = new Buffer(''+data, 'utf-8');
                }

                req.end(data);
            } else {
                req.end();
            }
        });
    }
}
