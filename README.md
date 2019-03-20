# fs.readdir-withFileTypes

> A ponyfill for `fs.readdir(path, { withFileTypes: true })`

## Install

```sh
npm install --save readdir-withfiletypes
```

## Usage

**Before:** No support for Node <10

```js
import fs from "fs"

fs.readdir("./dir", { withFileTypes: true }, (err, dirents) => {
	// ...
})

let dirents = readdirSync("./dir", { withFileTypes: true })
```

**After:** Support for Node <10

```js
import { readdir, readdirSync } from "readdir-withFileTypes"

readdir("./dir", { withFileTypes: true }, (err, dirents) => {
	// ...
})

let dirents = readdirSync("./dir", { withFileTypes: true })
```
