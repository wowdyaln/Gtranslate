const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')
const root = require('./path.js')

const isDirectory = source => lstatSync(source).isDirectory()

const getDirectories = source =>
readdirSync(source).map(name => join(source, name)).filter(isDirectory)

module.exports = getDirectories