'use strict';

class Entity {
    constructor(id) {
        throwIfUndefined(id);
        this.id = id;
    }
    equals(other) {
        if (other instanceof Entity) {
            if (this === other || this.id === other.id) {
                return true;
            }
            if (typeof(this.id.equals) === 'function'
                && typeof(other.id.equals) === 'function'
                && this.id.equals(other.id)) {
                return true;
            }
        }
        return false;
    }
}

function throwIfUndefined(id) {
    if (typeof(id) === 'undefined') {
        throw Error('Entity id cannot be undefined.');
    }
}

module.exports = Entity;