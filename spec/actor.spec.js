/**
 * Created with JetBrains WebStorm.
 * User: artem.kolosovich
 * Date: 24.03.15
 * Time: 18:33
 * To change this template use File | Settings | File Templates.
 */

var sinon = require('sinon');
var Actor = require('actors').Actor;

describe('#actor', function () {
    var actor;
    var params = { };
    var error = new Error('test');

    describe('#create', function () {
        it('should throw exception if are not like in JSDoc', function () {
            expect(function () {
                actor = new Actor();
            }).toThrow();
        });

        it('should not throw exception if params are array', function () {
            expect(function () {
                actor = new Actor([]);
            }).not.toThrow();
        });

        it('should not throw exception if params are function', function () {
            expect(function () {
                actor = new Actor(function () {
                });
            }).not.toThrow();
        });
    });

    describe('#act with function as param', function () {

        describe('#good response', function () {
            beforeEach(function () {
                var fn = sinon.stub().yields(null, 1);
                actor = new Actor(fn);
            });

            it('should process data and return result', function (done) {
                actor.act(params, function (err, result) {
                    expect(err).toBeFalsy();
                    expect(result).toBeTruthy();
                    expect(result).toBe(1);
                    done();
                });
            });
        });

        describe('#bad response', function () {
            beforeEach(function () {
                var fn = sinon.stub().yields(error, null);
                actor = new Actor(fn);
            });

            it('should return error', function (done) {
                actor.act(params, function (err, result) {
                    expect(err).toBeTruthy();
                    expect(err).toBe(error);
                    expect(result).toBeFalsy();
                    done();
                });
            });
        });
    });

    describe('#act with array of functions as param', function () {

        describe('#good response', function () {
            beforeEach(function () {
                var fn1 = sinon.stub().yields(null, 1);
                var fn2 = sinon.stub().yields(null, 2);

                actor = new Actor([fn1, fn2]);
            });

            it('should process data and return result', function (done) {
                actor.act(params, function (err, result) {
                    expect(err).toBeFalsy();
                    expect(result).toBeTruthy();
                    expect(result.length).toBeTruthy();
                    expect(result[0]).toBe(1);
                    expect(result[1]).toBe(2);
                    done();
                });
            });
        });

        describe('#bad response', function () {
            var fn1;
            var fn2;

            beforeEach(function () {
                fn1 = sinon.stub();
                fn2 = sinon.stub();

                actor = new Actor([fn1, fn2]);
            });

            it('should return error if both function return error', function (done) {
                fn1.yields(error, null);
                fn2.yields(error, null);

                actor.act(params, function (err, result) {
                    expect(err).toBeTruthy();
                    expect(err).toBe(error);
                    done();
                });
            });

            it('should return error if one function return error', function (done) {
                fn1.yields(error, null);
                fn2.yields(null, error);

                actor.act(params, function (err, result) {
                    expect(err).toBeTruthy();
                    expect(err).toBe(error);
                    done();
                });
            });
        });
    });
});