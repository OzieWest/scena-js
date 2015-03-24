/**
 * @param {Array} array
 * @returns {*|null}
 */
function getCallback(array) {
    var lastArg = array[array.length - 1];
    if (!lastArg || typeof lastArg !== 'function') {
        return null;
    }
    return lastArg;
}

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

module.exports = {
    bindFunctions: bindFunctions,
    getCallback: getCallback
};