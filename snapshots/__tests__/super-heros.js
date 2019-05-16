const { getFlyingSuperHeros } = require('../super-heros')

test('returns super heros that can fly', () => {
  const flyingHeros = getFlyingSuperHeros()

  expect(flyingHeros).toMatchSnapshot()
})
