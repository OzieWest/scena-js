/**
 * Created with JetBrains WebStorm.
 * User: artem.kolosovich
 * Date: 23.03.15
 * Time: 20:33
 * To change this template use File | Settings | File Templates.
 */

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
    this.map_[name] = new Actor(handlers);
};

/**
 * @param {...*} varArgs
 */
Scene.prototype.act = function (varArgs) {
    var args = Array.prototype.slice.call(arguments);
    var type = args.shift();
    var actor = this.map_[type];
    if (actor) {
        actor.act.apply(actor, args);
    } else {
        var callback = utils.getCallback(args);
        callback(null, null);
    }
};

module.exports = Scene;

