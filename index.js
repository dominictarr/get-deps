var package = require('package')
var join = require('path').join

function merge (a, b) {
  a = a || {}
  b = b || {}
  for(var k in b) {
    a[k] = b[k]
  }
  return a
}

function mergeDeps (p, opts) {
  var m = merge({}, p.dependencies);
  if (opts && opts.dev) {
    m = merge(m, p.devDependencies);
  }
  if (!opts || opts.optional === false) {
    m = merge(m, p.optionalDependencies);
  }
  var a = []
  for(var k in m) a.push(k + '@' + m[k])
  return a
}

exports = module.exports = function (start, opts) {
  start = start || process.cwd()
  return mergeDeps(package({filename: join(start, 'package.json')}), opts)
}

exports.mergeDeps = mergeDeps

if(!module.parent) {
  var opts = require('minimist')(process.argv.slice(2))
  console.log(opts)
  console.log(module.exports(opts._[0], opts))
}
