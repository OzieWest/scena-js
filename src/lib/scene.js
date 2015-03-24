var utils = require('./utils');
var Actor = require('./actor');

function Scene() {
    this.map_ = { };
}

/**
 * @param {string} name
 * @param {function|function[]} handlers
 */
Scene.prototype.createActor = function (name, handlers) {
    if (!name || typeof name !== 'string') {
        throw new Error('Wrong param: name');
    }
    if (!(handlers instanceof Array) && (typeof handlers !== 'function')) {
        throw new Error('Wrong param: handlers');
    }
    this.map_[name] = new Actor(handlers);
};

/**
 * @param {...*} varArgs
 */
Scene.prototype.act = function (varArgs) {
    var args = Array.prototype.slice.call(arguments);
    var msgType = args.shift();
    var actor = this.map_[msgType];
    if (actor) {
        actor.act.apply(actor, args);
    } else {
        var callback = utils.getCallback(args);
        callback(null, null);
    }
};

module.exports = Scene;

