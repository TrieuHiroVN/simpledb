import fs from 'node:fs'
import Path from 'node:path'

export type Data = string | number | boolean | object | null

export function readJSON (path: string) {
    let data: any

    try {
        data = fs.readFileSync(Path.resolve(path))
    } catch {
        throw new Error(`the database '${path}' is not exist`)
    }

    try {
        data = JSON.parse(data)
    } catch {
        throw new Error(`cannot parse JSON at path '${path}'`)
    }

    return data
}

export function writeJSON (path: string, data: Data, check: boolean): void {
    let strData

    try {
        strData = JSON.stringify(data, null, '\t')
    } catch {
        throw new Error('circular structures cannot be stored')
    }

    fs.writeFileSync(path, strData)

    if (check && fs.readFileSync(path, 'utf-8') !== strData) {
        const path2 = `backup-${Date.now()}.json`
        writeJSON(path2, data, false)
        throw new Error(`error writing JSON in path '${path}', backup saved in '${path2}'`)
    }
}