import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render as rtlRender, fireEvent } from 'react-testing-library'

import { ConnectedCounter, reducer } from '../redux-app'

const render = (
  ui,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...options
  } = {}
) => {
  const utils = rtlRender(
    <Provider store={store}>
      { ui }
    </Provider>,
    options
  )

  return {
    ...utils,
  }
}

test('can render with redux with defaults', () => {
  const { getByTestId, getByText } = render(<ConnectedCounter />)

  fireEvent.click(getByText('+'))

  expect(getByTestId('count-value')).toHaveTextContent('1')
})

test('can render with redux with custom initial state', () => {
  // const store = createStore(reducer, { count: 3 })
  const { getByTestId, getByText } = render(
    <ConnectedCounter />,
    {
      initialState: { count: 3 },
    }
  )

  fireEvent.click(getByText('-'))

  expect(getByTestId('count-value')).toHaveTextContent('2')
})
