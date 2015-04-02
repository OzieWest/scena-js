/**
 * Created with JetBrains WebStorm.
 * User: artem.kolosovich
 * Date: 24.03.15
 * Time: 13:50
 * To change this template use File | Settings | File Templates.
 */

/**
 * @param {Array} array
 * @returns {*}
 */
function getCallback(array) {
    var lastArg = array[array.length - 1];
    if (!lastArg || typeof lastArg !== 'function') {
        return null;
    }
    return lastArg;
}

/**
 * @param {*} context
 * @param {Array} handlers
 * @param {Array} args
 * @returns {Array}
 */
function bindFunctions(context, handlers, args) {
    context = context || undefined;
    return handlers.map(function (handler) {
        return handler.bind.apply(handler, [context].concat(args));
    });
}

module.exports = {
    bindFunctions: bindFunctions,
    getCallback: getCallback
};