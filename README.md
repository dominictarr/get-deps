# get-deps

get the deps that will be installed if no arguments are specified

``` js
var deps = require('get-deps')

console.log(deps(process.cwd(), opts))
//['package@1.0.1',...]
```

`opts` should be command line opts parsed by minimist.
if the `--no-optional` argument is given, then this not include
optional deps.

## License

MIT
