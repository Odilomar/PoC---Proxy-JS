var momentHooks = require('moment');

const DEFAULT_MASK = 'dd/mm/yyyy';

console.log(momentHooks('2020-10-06 13:12:21', 'xpto'));

var handler = {
    get: function (target, property) {
        // console.log(`GET has been accessed!`);

        if(property === 'mask' && !(property in target)) target.mask = DEFAULT_MASK;

        // if (!(property in target)) console.log('GET property not exists!');

        if(property === 'original') return target;

        return target[property];
    },

    set: function (target, property, newValue) {
        // console.log(`SET has been accessed!`);
        
        target[property] = newValue;

        return true;
    },

    apply: function (target, thisArgs, lstArgs) {
        // console.log(`APPLY has been accessed!`);
        let momentOriginalTarget;
        let momentResult = target(...lstArgs);

        if(typeof lstArgs[0] === 'object'){
            momentOriginalTarget = lstArgs[0].original;
            momentResult = momentHooks(momentOriginalTarget);
        }

        let momentProxed = new Proxy(momentResult, handler);
        if(typeof lstArgs[0] === 'object') momentProxed.mask = momentOriginalTarget.mask;
        
        return momentProxed;
    }
}

var moment = new Proxy(momentHooks, handler);

module.exports = moment;