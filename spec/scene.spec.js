var sinon = require('sinon');
var Scene = require('../src').Scene;

describe('#scene', function () {
    var scene = new Scene();
    var msgType = 'test';
    var params = { };
    var error = new Error('test');

    describe('#act with function as param', function () {

        describe('#good response', function () {
            beforeEach(function () {
                var fn = sinon.stub().yields(null, 1);
                scene.createActor(msgType, fn);
            });

            it('should process data and return result', function (done) {
                scene.act(msgType, params, function (err, result) {
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
                scene.createActor(msgType, fn);
            });

            it('should return error', function (done) {
                scene.act(msgType, params, function (err, result) {
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

                scene.createActor(msgType, [fn1, fn2]);
            });

            it('should process data and return result', function (done) {
                scene.act(msgType, params, function (err, result) {
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

                scene.createActor(msgType, [fn1, fn2]);
            });

            it('should return error', function (done) {
                scene.act(msgType, params, function (err, result) {
                    expect(err).toBeTruthy();
                    expect(err).toBe(error);

                    done();
                });
            });
        });
    });
});