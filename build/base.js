"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJSON = readJSON;
exports.writeJSON = writeJSON;
var fs = require("node:fs");
var Path = require("node:path");
function readJSON(path) {
    var data;
    try {
        data = fs.readFileSync(Path.resolve(path));
    }
    catch (_a) {
        throw new Error("the database '".concat(path, "' is not exist"));
    }
    try {
        data = JSON.parse(data);
    }
    catch (_b) {
        throw new Error("cannot parse JSON at path '".concat(path, "'"));
    }
    return data;
}
function writeJSON(path, data, check) {
    var strData;
    try {
        strData = JSON.stringify(data, null, '\t');
    }
    catch (_a) {
        throw new Error('circular structures cannot be stored');
    }
    fs.writeFileSync(path, strData);
    if (check && fs.readFileSync(path, 'utf-8') !== strData) {
        var path2 = "backup-".concat(Date.now(), ".json");
        writeJSON(path2, data, false);
        throw new Error("error writing JSON in path '".concat(path, "', backup saved in '").concat(path2, "'"));
    }
}
