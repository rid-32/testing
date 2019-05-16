import 'jest-dom/extend-expect'
import React from 'react'
// import ReactDom from 'react-dom'
// import { getQueriesForElement } from 'dom-testing-library'
import 'react-testing-library/cleanup-after-each'
import { render, fireEvent } from 'react-testing-library'

import FavoriteNumber from '../favorite-number'

// const render = ui => {
//   const container = document.createElement('div')
//
//   ReactDom.render(ui, container)
//
//   const queries = getQueriesForElement(container)
//
//   return {
//     container,
//     ...queries,
//   }
// }

// afterEach(() => {
//   cleanup()
//
//   console.log(document.body.outerHTML)
// })

test('renders a number input with a label "Favorite Number"', () => {
  const { getByLabelText /*, unmount*/, debug } = render(<FavoriteNumber />)

  const input = getByLabelText(/favorite number/i)

  expect(input).toHaveAttribute('type', 'number')

  // unmount()
})

test('entering an invalid value shows an error message', () => {
  const { getByLabelText, getByTestId, queryByTestId, getByText, rerender, debug } = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)

  fireEvent.change(input, { target: { value: 10 }})

  expect(getByTestId('error-message')).toHaveTextContent(/the number is invalid/i)

  rerender(<FavoriteNumber max={10} />)

  expect(queryByTestId('error-message')).toBeNull()
})
