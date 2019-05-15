const sum = (a, b) => a + b
const subtract = (a, b) => a - b

const sumAsync = (a, b) => new Promise((res, rej) => {
  setTimeout(() => res(a - b), 100)
})

const subtractAsync = (a, b) => new Promise((res, rej) => {
  setTimeout(() => res(a - b), 100)
})

module.exports = {
  sum,
  subtract,
  sumAsync,
  subtractAsync
}
