"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeJSON = exports.readJSON = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
function readJSON(path) {
    let data;
    try {
        data = node_fs_1.default.readFileSync(node_path_1.default.resolve(path));
    }
    catch (_a) {
        throw new Error(`the database '${path}' is not exist`);
    }
    try {
        data = JSON.parse(data);
    }
    catch (_b) {
        throw new Error(`cannot parse JSON at path '${path}'`);
    }
    return data;
}
exports.readJSON = readJSON;
function writeJSON(path, data, check) {
    let strData;
    try {
        strData = JSON.stringify(data, null, '\t');
    }
    catch (_a) {
        throw new Error('circular structures cannot be stored');
    }
    node_fs_1.default.writeFileSync(path, strData);
    if (check && node_fs_1.default.readFileSync(path, 'utf-8') !== strData) {
        const path2 = `backup-${Date.now()}.json`;
        writeJSON(path2, data, false);
        throw new Error(`error writing JSON in path '${path}', backup saved in '${path2}'`);
    }
}
exports.writeJSON = writeJSON;
