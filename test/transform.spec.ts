import vitePluginAsyncCatch from '../src/index'

const { transform } = vitePluginAsyncCatch()
const id = 'test.js'

describe('transform async function', () => {
  test('function', async() => {
    const code = `
    async function created() {
      await Promise.reject('Throw error.')
    }
`
    // @ts-ignore
    const res = await transform(code, id)
    expect(res).toBe(`async function created() {
  try {
    await Promise.reject('Throw error.');
  } catch (e) {
    console.error(e);
  }
}`)
  })

  test('arrow function', async() => {
    const code = `
    const created = async () => {
      await Promise.reject('Throw error.')
    }
`
    // @ts-ignore
    const res = await transform(code, id)
    expect(res).toBe(`const created = async () => {
  try {
    await Promise.reject('Throw error.');
  } catch (e) {
    console.error(e);
  }
};`)
  })

  test('function of object', async() => {
    const code = `
    const obj = {
      methods: {
        async doSomethings() {
          await Promise.reject('Throw error.')
        }
      }
    }
`
    // @ts-ignore
    const res = await transform(code, id)
    expect(res).toBe(`const obj = {
  methods: {
    async doSomethings() {
      try {
        await Promise.reject('Throw error.');
      } catch (e) {
        console.error(e);
      }
    }

  }
};`)
  })

  test('arrow function of object', async() => {
    const code = `
    const obj = {
      methods: {
        doSomethings: async () => {
          await Promise.reject('Throw error.')
        }
      }
    }
`
    // @ts-ignore
    const res = await transform(code, id)
    expect(res).toBe(`const obj = {
  methods: {
    doSomethings: async () => {
      try {
        await Promise.reject('Throw error.');
      } catch (e) {
        console.error(e);
      }
    }
  }
};`)
  })
})
