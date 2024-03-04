import g from '#glob-test'

export default eventHandler(async (_event) => {
  const { a: hello } = await g['./func/a.ts']
  return hello()
})
