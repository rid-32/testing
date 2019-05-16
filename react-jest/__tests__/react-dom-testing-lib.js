import 'jest-dom/extend-expect'
import React from 'react'
import ReactDom from 'react-dom'
import { getQueriesForElement } from 'dom-testing-library'

import FavoriteNumber from '../favorite-number'

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')

  ReactDom.render(<FavoriteNumber />, div)

  const { getByLabelText } = getQueriesForElement(div)
  const input = getByLabelText(/favorite number/i)

  expect(input).toHaveAttribute('type', 'number')
})
