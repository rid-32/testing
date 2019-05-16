import 'babel-polyfill'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import { render, fireEvent, wait } from 'react-testing-library'

import GreetingLoader from '../greeting-loader-01-mocking'
import { loadGreeting as mockLoadGreeting } from '../api'

jest.mock('../api', () => {
  return {
    loadGreeting: jest.fn(subject => Promise.resolve({ data: { greeting: `Hi ${subject}`} })),
  }
})

test('loads greeting on click', async () => {
  const { getByTestId, getByLabelText, getByText } = render(<GreetingLoader />)
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load greeting/i)

  nameInput.value = 'Mary'

  fireEvent.click(loadButton)

  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')

  await wait(() => expect(getByTestId('greeting')).toHaveTextContent('Hi Mary'))
})
