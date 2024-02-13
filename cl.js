'use_strict';

const WTs = require('worker_threads');

exports.cl = function cl (msg) {
    const dN = new Date(Date.now());
    const thNm = (WTs.isMainThread) ? " [main]" : " [work]";
console.log('' + dN.getSeconds() + '.' + dN.getMilliseconds() + ' ' + msg + thNm);

}

// End
