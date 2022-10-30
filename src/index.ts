import fs, { read } from 'node:fs'
import Path from 'node:path'
import { readJSON, writeJSON, Data } from './base'

function pathResolve (path: string): string {
    return Path.resolve(path)
}

class Database {
    path: string

    constructor (path: string) {
        this.path = path
    }

    public get (key: string): Data | null {
        if (typeof key !== 'string') throw new TypeError("'key' must be a non-empty string")
        return readJSON(pathResolve(this.path))[key]
    }

    public has (key: string): boolean {
        if (typeof key !== 'string') throw new TypeError("'key' must be a non-empty string")
        return readJSON(pathResolve(this.path))[key] ? true : false
    }

    public set (key: string, value: Data): void {
        if (typeof key !== 'string') throw new TypeError("'key' must be a non-empty string")
        var values: any = {}
        try {
            values = readJSON(pathResolve(this.path))
        } catch {
            writeJSON(pathResolve(this.path), {}, true)
        }
        values[key] = value
        writeJSON(pathResolve(this.path), values, true)
    }

    public delete (key: string): void {
        if (typeof key !== 'string') throw new TypeError("'key' must be a non-empty string")
        const values = readJSON(pathResolve(this.path))
        delete values[key]
        writeJSON(pathResolve(this.path), values, true)
    }

    clear () {
        writeJSON(pathResolve(this.path), {}, true)
    }
}

module.exports = Database