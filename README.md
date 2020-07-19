# Exerimental ES module loader for Svelte

Svelte ships with the ability to import `.svelte` files. Currently it only works with `commonjs`. This is an experiment to add support for esm's `import` syntax as well.

## CommonJS

CommonJS is built into svelte:

```
require('svelte/register')
const App = require('./App.svelte').default

const output = App.render(...)
```

## ESM

Specify the loader `--experimental-loader loader.mjs` when running `node`:

```
node \
  --experimental-modules \
  --experimental-loader ./loader.mjs \
  src/server.js
```

Then you can import `.svelte` files using `import` statements:

```
// The ESM way
import App from './App.svelte'

const output = App.render(...)
```

# License

MIT
