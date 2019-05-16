import 'jest-dom/extend-expect'
import React from 'react'
import ReactDom from 'react-dom'

import FavoriteNumber from '../favorite-number'

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')

  ReactDom.render(<FavoriteNumber />, div)

  expect(div.querySelector('input')).toHaveAttribute('type', 'number')
  expect(div.querySelector('label')).toHaveTextContent('Favorite Number')
})
