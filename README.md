# @teages/nitro-glob-import

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

<!-- [![bundle][bundle-src]][bundle-href] -->
<!-- [![Codecov][codecov-src]][codecov-href] -->

A module to provide glob import for Nitro Server.

## Usage

Install package:

> Make sure you have [nitro](https://nitro.unjs.io) installed.

```sh
# npm
npm install @teages/nitro-glob-import

# yarn
yarn add @teages/nitro-glob-import

# pnpm
pnpm install @teages/nitro-glob-import

# bun
bun install @teages/nitro-glob-import
```

How to use:

1. In your `nitro.config.ts` file, import the package and add it to the `modules` array.
```js
import nitroGlobImport from '@teages/nitro-glob-import'

export default defineNitroConfig({
  modules: [
    nitroGlobImport([{
      path: '#glob-test',
      globInput: ['./func/*.ts'],
    }]),
  ],
})
```

2. Then you can import the module in your code.
```ts
import loaders from '#glob-test'

const { yourFunc } = await loaders['./func/a.ts']()
```

## What is the package for?

Some time you need to import a lot of file from some folder, such as graphql api:
```
src
├── graphql
│   ├── mutation
│   │   ├── a.ts
│   │   ├── b.ts
│   ├── query
│   │   ├── c.ts
```
In this case, you need to add a lot of import codes.

With this package, you just need to:
```js
import nitroGlobImport from '@teages/nitro-glob-import'

export default defineNitroConfig({
  modules: [
    nitroGlobImport([{
      path: '#gql-schema',
      globInput: ['./schema/*.ts'],
    }]),
  ],
})
```

Then you can get all in one variable, and no longer need to maintain import code.

## Development

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install` and then `pnpm dev:prepare`
- Run interactive tests using `pnpm dev`

## License

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@teages/nitro-glob-import?style=flat&color=blue
[npm-version-href]: https://npmjs.com/package/@teages/nitro-glob-import
[npm-downloads-src]: https://img.shields.io/npm/dm/@teages/nitro-glob-import?style=flat&color=blue
[npm-downloads-href]: https://npmjs.com/package/@teages/nitro-glob-import

<!-- [codecov-src]: https://img.shields.io/codecov/c/gh/Teages/nitro-glob-import/main?style=flat&color=blue
[codecov-href]: https://codecov.io/gh/Teages/nitro-glob-import

[bundle-src]: https://img.shields.io/bundlephobia/minzip/@teages/nitro-glob-import?style=flat&color=blue
[bundle-href]: https://bundlephobia.com/result?p=@teages/nitro-glob-import -->
