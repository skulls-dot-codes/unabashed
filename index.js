import open, { openApp } from 'open'
import { resolve } from 'node:path'
import { argv, cwd } from 'node:process'
import { readFile } from 'node:fs/promises'

// If a filename is included in argv then use that filename
argv.length > 1 ? unabashed(argv[2]) : unabashed()

/**
 * Opens each item base on item type
 * @param {?string} file
 */
async function unabashed (file = 'unabashed.json') {
  const json = await parseFileJSON(file)

  if (isValid(json)) {
    for (const item of json) {
      if (item.type === 'app') await openAppPath(item)
      if (item.type === 'browser') await openBrowserURLs(item)
      if (item.type === 'file') await openFilePath(item)
    }
  }
}

/**
 * Gets the file from the same directory as the command is run and parses it to a JSON object
 * @param {string} file
 * @returns {Promise<object>}
 */
async function parseFileJSON (file) {
  return JSON.parse(await readFile(resolve(cwd(), './' + file)))
}

/**
 * Validates the JSON object
 * @param {object} json
 * @returns {boolean}
 * @throws {Error|TypeError}
 */
function isValid (json) {
  if (!Array.isArray(json)) throw new TypeError('JSON must be an array!')

  json.forEach((item) => {
    if (!Object.hasOwn(item, 'type')) throw new Error('Item must include a "type" property')
    if (!['app', 'browser', 'file'].includes(item.type)) throw new Error('Item "type" must be "app", "browser", or "file"')
    if ((item.type === 'app' || item.type === 'file') && !Object.hasOwn(item, 'path')) throw new Error('Item must include a "path" property')
    if (item.type === 'browser' && !Object.hasOwn(item, 'urls')) throw new Error('Item must include a "urls" property')
  })

  return true
}

/**
 * Opens an application
 * @param {object} item
 * @throws {Error|TypeError}
 */
async function openAppPath (item) {
  Object.hasOwn(item, 'options') ? await openApp(item.path, item.options) : await openApp(item.path)
}

/**
 * Opens browser URLs
 * @param {object} item
 * @throws {Error|TypeError}
 */
async function openBrowserURLs (item) {
  for (const url in item.urls) {
    await delay(500)
    Object.hasOwn(item, 'options') ? await open(item.urls[url], item.options) : await open(item.urls[url])
  }
}

/**
 * Opens a file
 * @param {object} item
 * @throws {Error|TypeError}
 */
async function openFilePath (item) {
  Object.hasOwn(item, 'options') ? await open(item.path, item.options) : await open(item.path)
}

/**
 * Delays execution by ms
 * @param {number} ms
 * @returns {Promise}
 */
function delay (ms) {
  return new Promise((resolve) => { setTimeout(() => resolve(), ms) })
}
