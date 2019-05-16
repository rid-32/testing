const superHeros = [
  {name: 'Dynaguy', powers: ['disintegration ray', 'fly']},
  {name: 'Apogee', powers: ['gravity control', 'fly']},
  {name: 'Frozone', powers: ['freeze water'] },
  {name: 'Violet', powers: ['invisibility', 'force fields']},
  {name: 'Jack-Jack', powers: ['shapeshifting', 'fly']},
]

const getFlyingSuperHeros = () =>
  superHeros.filter(hero => hero.powers.includes('fly'))

module.exports = { getFlyingSuperHeros }
