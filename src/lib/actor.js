var utils = require('./utils');
var async = require('async');

/**
 * @constructor
 */
function Actor(handlers) {
    if (!(handlers instanceof Array) && (typeof handlers !== 'function')) {
        throw new Error('Wrong params: handlers');
    }
    this.handlers_ = handlers;
}

/**
 * @param {...*} varArgs
 * @returns {*}
 */
Actor.prototype.act = function (varArgs) {
    var args = Array.prototype.slice.call(arguments);
    var callback = utils.getCallback(args);

    if (typeof this.handlers_ === 'function') {
        return this.handlers_.apply(this, args);
    }

    if (this.handlers_ instanceof Array) {
        if (callback) {
            args.pop();
        }

        var boundHandlers = utils.bindFunctions(this.handlers_, args);
        async.series(boundHandlers, function (err, results) {
            callback && callback(err, results);
        });
    }
};

module.exports = Actor;