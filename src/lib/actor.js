/**
 * Created with JetBrains WebStorm.
 * User: artem.kolosovich
 * Date: 20.03.15
 * Time: 19:59
 * To change this template use File | Settings | File Templates.
 */

var utils = require('./utils');
var async = require('async');
var noop = require('common_utils').functions.noop;

/**
 * @param {String|Function[]} handlers
 * @constructor
 */
function Actor(handlers) {
    if (!(handlers instanceof Array) && (typeof handlers !== 'function')) {
        throw new Error('Wrong params: handlers');
    }
    this.handlers_ = handlers;
}

/**
 * @param {...*} varArgs Last argument is an optional callback
 * @returns {*}
 */
Actor.prototype.act = function (varArgs) {
    var args = Array.prototype.slice.call(arguments);

    if (typeof this.handlers_ === 'function') {
        return this.handlers_.apply(this, args);
    }

    //now this.handlers_ is an array
    var callback = utils.getCallback(args);
    if (callback) {
        args.pop();
    }
    callback = callback || noop;

    var boundHandlers = utils.bindFunctions(null, this.handlers_, args);
    async.series(boundHandlers, callback);
};

module.exports = Actor;