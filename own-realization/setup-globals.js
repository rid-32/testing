const expect = actual => ({
  toBe: expected => {
    if (actual !== expected) {
      throw new Error(`${actual} is not equal ${expected}`)
    }
  }
})

const test = async (title, callback) => {
  try {
    await callback()

    console.log(`+ ${title}`)
  } catch (error) {
    console.error(`- ${title}`)
    console.error(error)
  }
}

global.test = test
global.expect = expect
