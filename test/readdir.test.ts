import test from "ava"
import path from "path"
import { readdir, readdirSync } from "../src/readdir"

let dir = path.join(__dirname, "..", "fixture")

test.cb("readdir(dir, callback)", t => {
	t.plan(2)
	readdir(dir, (err, entries) => {
		t.is(err, null)
		t.deepEqual(entries, ["a", "b", "c"])
		t.end()
	})
})

test.cb("readdir(dir, {}, callback)", t => {
	t.plan(2)
	readdir(dir, {}, (err, entries) => {
		t.is(err, null)
		t.deepEqual(entries, ["a", "b", "c"])
		t.end()
	})
})

test.cb("readdir(dir, { withFileTypes: true }, callback)", t => {
	t.plan(5)
	readdir(dir, { withFileTypes: true }, (err, entries) => {
		t.is(err, null)
		t.true(Array.isArray(entries))
		t.is(entries[0].name, "a")
		t.is(entries[1].name, "b")
		t.is(entries[2].name, "c")
		t.end()
	})
})

test("readdir(dir, { withFileTypes: true })", t => {
	t.throws(() => {
		;(readdir as any)(dir, { withFileTypes: true })
	})
})

test("readdirSync(dir)", t => {
	let entries = readdirSync(dir)
	t.deepEqual(entries, ["a", "b", "c"])
})

test("readdirSync(dir, {})", t => {
	let entries = readdirSync(dir, {})
	t.deepEqual(entries, ["a", "b", "c"])
})

test("readdirSync(dir, { withFileTypes: true })", t => {
	let entries = readdirSync(dir, { withFileTypes: true })
	t.true(Array.isArray(entries))
	t.is(entries[0].name, "a")
	t.is(entries[1].name, "b")
	t.is(entries[2].name, "c")
})
