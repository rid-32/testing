import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render as rtlRender, fireEvent } from 'react-testing-library'

import { Main } from '../main'

const render = (
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    ...options
  } = {}
) => {
  const utils = rtlRender(
    <Router history={history}>
      {ui}
    </Router>,
    options
  )

  return {
    ...utils,
    history,
  }
}

test('main renders about and home and I can navigate to those pages', () => {
  const { getByTestId, queryByTestId, getByText } = render(<Main />)

  expect(getByTestId('home-screen')).toBeInTheDocument()
  expect(queryByTestId('about-screen')).not.toBeInTheDocument()

  fireEvent.click(getByText(/about/i))

  expect(queryByTestId('home-screen')).not.toBeInTheDocument()
  expect(getByTestId('about-screen')).toBeInTheDocument()
})

test('landing on a bad page shows no match component', () => {
  const history = createMemoryHistory()
  const { getByTestId } = render(
      <Main />,
      { route: '/something-that-does-not-match' }
  )

  expect(getByTestId('no-match-screen')).toBeInTheDocument()
})
