'use strict';

class ValueObject {
    equals(other) {
        if (!(other instanceof ValueObject)) {
            return false;
        }
        for(let key of Object.keys(this)) {
            if (!equals(this[key], other[key])) {
                return false;
            }
        }
        return true;
    }
}

function equals(a, b) {
    if (typeof(a.equals) === 'function') {
        return a.equals(b);
    }
    return a === b;
}

module.exports = ValueObject;