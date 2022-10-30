"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const base_1 = require("./base");
function pathResolve(path) {
    return node_path_1.default.resolve(path);
}
class Database {
    constructor(path) {
        this.path = path;
    }
    get(key) {
        if (typeof key !== 'string')
            throw new TypeError("'key' must be a non-empty string");
        return (0, base_1.readJSON)(pathResolve(this.path))[key];
    }
    has(key) {
        if (typeof key !== 'string')
            throw new TypeError("'key' must be a non-empty string");
        return (0, base_1.readJSON)(pathResolve(this.path))[key] ? true : false;
    }
    set(key, value) {
        if (typeof key !== 'string')
            throw new TypeError("'key' must be a non-empty string");
        var values = {};
        try {
            values = (0, base_1.readJSON)(pathResolve(this.path));
        }
        catch (_a) {
            (0, base_1.writeJSON)(pathResolve(this.path), {}, true);
        }
        ;
        values[key] = value;
        (0, base_1.writeJSON)(pathResolve(this.path), values, true);
    }
    delete(key) {
        if (typeof key !== 'string')
            throw new TypeError("'key' must be a non-empty string");
        const values = (0, base_1.readJSON)(pathResolve(this.path));
        delete values[key];
        (0, base_1.writeJSON)(pathResolve(this.path), values, true);
    }
    clear() {
        (0, base_1.writeJSON)(pathResolve(this.path), {}, true);
    }
}
module.exports = Database;
