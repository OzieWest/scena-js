/**
 * Created with JetBrains WebStorm.
 * User: artem.kolosovich
 * Date: 24.03.15
 * Time: 19:54
 * To change this template use File | Settings | File Templates.
 */

var sinon = require('sinon');
var Scene = require('actors').Scene;

describe('#scene', function () {
    var scene = new Scene();
    var type = 'test';
    var params = { };
    var error = new Error('test');

    describe('#act with function as param', function () {

        describe('#good response', function () {
            beforeEach(function () {
                var fn = sinon.stub().yields(null, 1);
                scene.createActor(type, fn);
            });

            it('should process data and return result', function (done) {
                scene.act(type, params, function (err, result) {
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
                scene.createActor(type, fn);
            });

            it('should return error', function (done) {
                scene.act(type, params, function (err, result) {
                    expect(err).toBeTruthy();
                    expect(err).toBe(error);
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

                scene.createActor(type, [fn1, fn2]);
            });

            it('should process data and return result', function (done) {
                scene.act(type, params, function (err, result) {
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
            beforeEach(function () {
                var fn1 = sinon.stub().yields(error, null);
                var fn2 = sinon.stub().yields(error, null);

                scene.createActor(type, [fn1, fn2]);
            });

            it('should return error', function (done) {
                scene.act(type, params, function (err, result) {
                    expect(err).toBeTruthy();
                    expect(err).toBe(error);

                    done();
                });
            });
        });
    });
});