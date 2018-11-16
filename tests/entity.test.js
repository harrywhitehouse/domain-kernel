'use strict';

const assert = require('assert');
const Entity = require('../src/entity');

class EntityStub extends Entity {
    constructor(id, a) {
        super(id);
        this.a = a;
    }
}

describe('Entity', () => {
    describe('constructor(id)', () => {
        it('throws if parameter is undefined', () => {
            assert.throws(() => {
                new EntityStub(undefined, 'test');
            });
        });
        it('assigns id', () => {
            let id = 'id123';
            let sut = new EntityStub(id, 'test');
            
            assert.strictEqual(sut.id, id);
        });
    });

    describe('id', () => {
        it('is defined', () => {
            let sut = new EntityStub(1, 'test');
            
            assert.notStrictEqual(typeof(sut.id), 'undefined');
        });
    });

    describe('equals(other)', () => {
        it('is defined', () => {
            let sut = new EntityStub(1, 'test');

            assert.strictEqual(typeof(sut.equals), 'function');
        });

        describe('returns true if other', () => {
            it('is the same object', () => {
                let sut = new EntityStub(1, 'test');
    
                assert.strictEqual(sut.equals(sut), true);
            });
            it('has the same id', () => {
                let sut1 = new EntityStub(1, 'test1');
                let sut2 = new EntityStub(1, 'test2');
    
                assert.strictEqual(sut1.equals(sut2), true);
                assert.strictEqual(sut2.equals(sut1), true);
            });
        });

        describe('returns false if other', () => {
            it('is null', () => {
                let sut = new EntityStub(1, 'test');
    
                assert.strictEqual(sut.equals(null), false);
            });
            it('is undefined', () => {
                let sut = new EntityStub(1, 'test');
    
                assert.strictEqual(sut.equals(undefined), false);
            });
            it('has different id', () => {
                let sut1 = new EntityStub(1, 'test1');
                let sut2 = new EntityStub(2, 'test2');
    
                assert.strictEqual(sut1.equals(sut2), false);
                assert.strictEqual(sut2.equals(sut1), false);
            });
            it('has similar but not strictly equal id', () => {
                let sut1 = new EntityStub(0, 'test1');
                let sut2 = new EntityStub(false, 'test2');
    
                assert.strictEqual(sut1.equals(sut2), false);
                assert.strictEqual(sut2.equals(sut1), false);
            });
        });

        describe('where ids define equals() method', () => {
            class ComplexId {
                constructor(value) {
                    this.value = value;
                }
                equals(other) {
                    return this.value === other.value;
                }
            }

            describe('returns true if', () => {
                it('equals() returns true', () => {
                    let sut1 = new EntityStub(new ComplexId(1), 'test1');
                    let sut2 = new EntityStub(new ComplexId(1), 'test2');
        
                    assert.strictEqual(sut1.equals(sut2), true);
                    assert.strictEqual(sut2.equals(sut1), true);
                });
            });

            describe('returns false if', () => {
                it('equals() returns false', () => {
                    let sut1 = new EntityStub(new ComplexId(1), 'test1');
                    let sut2 = new EntityStub(new ComplexId(2), 'test2');
        
                    assert.strictEqual(sut1.equals(sut2), false);
                    assert.strictEqual(sut2.equals(sut1), false);
                });
            });
        });
    });
});