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

module.exports = function (start, opts) {
  start = start || process.cwd()
  var p = package({filename: join(start, 'package.json')})
  var m = !opts || opts.dev !== false
        ? merge(merge({}, p.dependencies), p.devDependencies)
        : p.dependencies
  var a = []
  for(var k in m) a.push(k + '@' + m[k])
  return a
}

if(!module.parent)
  console.log(module.exports(process.argv[2]))
