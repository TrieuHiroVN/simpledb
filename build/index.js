"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_path_1 = require("node:path");
var base_1 = require("./base");
function pathResolve(path) {
    return node_path_1.default.resolve(path);
}
var Database = /** @class */ (function () {
    function Database(path) {
        this.path = path;
    }
    Database.prototype.get = function (key) {
        if (typeof key !== 'string')
            throw new TypeError("'key' must be a non-empty string");
        return (0, base_1.readJSON)(pathResolve(this.path))[key];
    };
    Database.prototype.has = function (key) {
        if (typeof key !== 'string')
            throw new TypeError("'key' must be a non-empty string");
        return (0, base_1.readJSON)(pathResolve(this.path))[key] ? true : false;
    };
    Database.prototype.set = function (key, value) {
        if (typeof key !== 'string')
            throw new TypeError("'key' must be a non-empty string");
        var values = {};
        try {
            values = (0, base_1.readJSON)(pathResolve(this.path));
        }
        catch (_a) {
            (0, base_1.writeJSON)(pathResolve(this.path), {}, true);
        }
        values[key] = value;
        (0, base_1.writeJSON)(pathResolve(this.path), values, true);
        return value;
    };
    Database.prototype.delete = function (key) {
        if (typeof key !== 'string')
            throw new TypeError("'key' must be a non-empty string");
        var values = (0, base_1.readJSON)(pathResolve(this.path));
        delete values[key];
        (0, base_1.writeJSON)(pathResolve(this.path), values, true);
    };
    Database.prototype.clear = function () {
        (0, base_1.writeJSON)(pathResolve(this.path), {}, true);
    };
    return Database;
}());
module.exports = Database;
