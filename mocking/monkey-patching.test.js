const thumbWar = require('./thumb-war')
const utils = require('./utils.js')

// Другой путь замОкать функции в модуле
// модуль utils мОкается данными из __mock__/utils.js
jest.mock('./utils')

describe('Monkey patching', () => {
  // beforeAll(() => {
  //   // мОкает ф-цию utils.getWinner. Но без каких-либо других действий замОканная
  //   // функция остаётся прежней
  //   // также добавляет этой замОканной функции метод mockImplementation, в который
  //   // можно передать фукцию, которой будет мОкаться utils.getWinner
  //   jest.spyOn(utils, 'getWinner')
  //
  //   utils.getWinner.mockImplementation((p1, p2) => p1)
  // })

  afterAll(() => {
    // это нужно, если мы мОкаем с помощью spyOn
    // utils.getWinner.mockRestore()

    // а это - если с помощью jest.mock()
    utils.getWinner.mockReset()
  })

  test('Kent C. Doods must win', () => {
    const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler')

    expect(winner).toBe('Kent C. Dodds')
    expect(utils.getWinner).toHaveBeenCalledTimes(2)
    expect(utils.getWinner).toHaveBeenCalledWith('Kent C. Dodds', 'Ken Wheeler')
  })
})
