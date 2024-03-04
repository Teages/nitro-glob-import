import nitroGlobImport from '../src'

// https://nitro.unjs.io/config
export default defineNitroConfig({
  modules: [
    nitroGlobImport([{
      path: '#glob-test',
      globInput: ['./func/*.ts'],
    }]),
  ],
})
