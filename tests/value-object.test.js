'use strict';

const assert = require('assert');
const ValueObject = require('../src/value-object');

class ValueObjectStub extends ValueObject {
    constructor(a, b) {
        super();
        this.a = a;
        this.b = b;
    }
}

describe('ValueObject', () => {
    describe('equals(other)', () => {
        it('is defined', () => {
            let sut = new ValueObjectStub(1, 'test');
            assert.strictEqual(typeof(sut.equals), 'function');
        });

        describe('returns true if other', () => {
            it('is the same object', () => {
                let sut = new ValueObjectStub(1, 'test');
    
                assert.strictEqual(sut.equals(sut), true);
            });
            it('has strictly equal value properties', () => {
                let sut1 = new ValueObjectStub(1, 'test');
                let sut2 = new ValueObjectStub(1, 'test');
    
                assert.strictEqual(sut1.equals(sut2), true);
                assert.strictEqual(sut2.equals(sut1), true);
            });
            it('has the same object properties', () => {
                let child = { x: 1 };
                let sut1 = new ValueObjectStub(2, child);
                let sut2 = new ValueObjectStub(2, child);
    
                assert.strictEqual(sut1.equals(sut2), true);
                assert.strictEqual(sut2.equals(sut1), true);
            });
            it('has equal ValueObject properties', () => {
                let sut1 = new ValueObjectStub(2, new ValueObjectStub(1, 'test'));
                let sut2 = new ValueObjectStub(2, new ValueObjectStub(1, 'test'));
    
                assert.strictEqual(sut1.equals(sut2), true);
                assert.strictEqual(sut2.equals(sut1), true);
            });
        });

        describe('returns false if other', () => {
            it('is null', () => {
                let sut = new ValueObjectStub(1, 'test');
    
                assert.strictEqual(sut.equals(null), false);
            });
            it('is undefined', () => {
                let sut = new ValueObjectStub(1, 'test');
    
                assert.strictEqual(sut.equals(undefined), false);
            });
            it('is not ValueObject', () => {
                let sut = new ValueObjectStub(1, 'test');
                let other = { a: 1, b: 'test' };
    
                assert.strictEqual(sut.equals(other), false);
            });
            it('does not have equal value properties', () => {
                let sut1 = new ValueObjectStub(1, 'test');
                let sut2 = new ValueObjectStub(2, 'test');
    
                assert.strictEqual(sut1.equals(sut2), false);
                assert.strictEqual(sut2.equals(sut1), false);
            });
            it('has similar but not strictly equal value properties', () => {
                let sut1 = new ValueObjectStub(0, 'test');
                let sut2 = new ValueObjectStub(false, 'test');
    
                assert.strictEqual(sut1.equals(sut2), false);
                assert.strictEqual(sut2.equals(sut1), false);
            });
            it('has different object properties', () => {
                let sut1 = new ValueObjectStub(2, { x: 1 });
                let sut2 = new ValueObjectStub(2, { x: 1 });
    
                assert.strictEqual(sut1.equals(sut2), false);
                assert.strictEqual(sut2.equals(sut1), false);
            });
            it('has non-equal ValueObject properties', () => {
                let sut1 = new ValueObjectStub(2, new ValueObjectStub(1, 'test'));
                let sut2 = new ValueObjectStub(2, new ValueObjectStub(1, 'pest'));
    
                assert.strictEqual(sut1.equals(sut2), false);
                assert.strictEqual(sut2.equals(sut1), false);
            });
        });

        describe('where child properties define equals() method', () => {
            class ChildStub {
                constructor(x) {
                    this.x = x;
                }
                equals(other) {
                    return this.x === other.x;
                }
            }

            describe('returns false if', () => {
                it('equals() method returns false', () => {
                    let sut1 = new ValueObjectStub(2, new ChildStub(1));
                    let sut2 = new ValueObjectStub(2, new ChildStub(2));
    
                    assert.strictEqual(sut1.equals(sut2), false);
                    assert.strictEqual(sut2.equals(sut1), false);
                });
            });

            describe('returns true if', () => {
                it('equals() method returns true', () => {
                    let sut1 = new ValueObjectStub(2, new ChildStub(1));
                    let sut2 = new ValueObjectStub(2, new ChildStub(1));
    
                    assert.strictEqual(sut1.equals(sut2), true);
                    assert.strictEqual(sut2.equals(sut1), true);
                });
            });
        });
    });
});