import fs from "fs"
import path from "path"
import { promisify } from "util"

let fsReaddir = promisify(fs.readdir)
let fsLstat = promisify(fs.lstat)

function createDirent(name: string, stat: fs.Stats): fs.Dirent {
	return {
		name,
		isBlockDevice: stat.isBlockDevice.bind(stat),
		isCharacterDevice: stat.isCharacterDevice.bind(stat),
		isDirectory: stat.isDirectory.bind(stat),
		isFIFO: stat.isFIFO.bind(stat),
		isFile: stat.isFile.bind(stat),
		isSocket: stat.isSocket.bind(stat),
		isSymbolicLink: stat.isSymbolicLink.bind(stat),
	}
}

export const readdir: typeof fs.readdir = ((
	dir: fs.PathLike,
	options: any,
	callback: any,
): any => {
	if (typeof options === "function") {
		callback = options
		options = {}
	}

	if (typeof callback !== "function") {
		let err: any = new TypeError("Callback must be a function")
		err.code = "ERR_INVALID_CALLBACK"
		throw err
	}

	fsReaddir(dir, options)
		.then((entries: any[]) => {
			if (!options.withFileTypes) return entries
			return Promise.all(
				entries.map(entry => {
					if (typeof entry !== "string") return entry
					return fsLstat(path.join(dir.toString(), entry)).then(stat =>
						createDirent(entry, stat),
					)
				}),
			)
		})
		.then(results => callback(null, results))
		.catch(err => callback(err))
}) as any

export const readdirSync: typeof fs.readdirSync = ((dir: any, options: any) => {
	let entries = fs.readdirSync(dir, options)
	if (!(options && options.withFileTypes)) return entries
	return entries.map(entry => {
		if (typeof entry !== "string") return entry
		let stat = fs.lstatSync(path.join(dir, entry))
		return createDirent(entry, stat)
	})
}) as any
