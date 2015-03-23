var async = require('async');
 
/**
 * @constructor
 */
function Locator() {
    this.map_ = { };
}
 
Locator.prototype.register = function (type, handlers) {
    if (!type || !isString(type)) {
        throw new Error("Wrong params");
    }
    if (!handlers || !isArray(handlers) && !isFunction(handlers)) {
        throw new Error("Wrong params");
    }
    this.map_[type] = handlers;
};
 
/**
 * @param {string} type
 * @param {*?} [data...]
 * @param {function?} callback
 * @returns {*}
 */
Locator.prototype.resolve = function () {
    var args = convertToArray(arguments);
    var type = shiftType(args);
    var callback = getCallback(args);
 
    var handlers = this.map_[type];
    if (!handlers) {
        return callback && callback(null, null);
    }
 
    if (isFunction(handlers)) {
        return handlers.apply(undefined, args);
    } else {
        removeCallback(args);
    }
 
    if (isArray(handlers)) {
        var boundHandlers = bindFunctions(handlers, args);
        async.series(boundHandlers, function (err, results) {
            callback(err, results);
        });
    }
};
 
/**
 * @param {Array} handlers
 * @param {Array} args
 * @returns {Array}
 */
function bindFunctions(handlers, args) {
    return handlers.map(function (handler) {
        return handler.bind.apply(handler, [null].concat(args));
    });
}
 
/**
 * @param obj
 * @returns {boolean}
 */
function isFunction(obj) {
    return typeof obj === 'function';
}
 
/**
 * @param obj
 * @returns {boolean}
 */
function isArray(obj) {
    return Array.isArray(obj);
}
 
/**
 * @param obj
 * @returns {boolean}
 */
 
function isString(obj) {
    return typeof obj === 'string';
}
 
/**
 * @param arguments
 * @returns {*}
 */
function convertToArray(arguments) {
    return Array.prototype.slice.call(arguments);
}
 
/**
 * @param array
 * @returns {*}
 */
function getCallback(array) {
    var lastArg = array[array.length - 1];
    if (!lastArg || !isFunction(lastArg)) {
        return null;
    }
    return lastArg;
}
 
/**
 * @param array
 */
function removeCallback(array) {
    array.pop();
}
 
/**
 * @param array
 * @returns {*}
 */
function shiftType(array) {
    return array.shift();
}
 
module.exports = Locator;