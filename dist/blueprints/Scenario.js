'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || !1; descriptor.configurable = !0; if ("value" in descriptor) descriptor.writable = !0; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scenario = function () {
    function Scenario() {
        _classCallCheck(this, Scenario);
    }

    _createClass(Scenario, null, [{
        key: 'run',
        value: function run(options, cb) {
            return new Promise(function (resolve, reject) {
                try {
                    cb(resolve, reject);
                } catch (err) {
                    reject(err);
                }
            });
        }
    }]);

    return Scenario;
}();

exports.default = Scenario;