import 'react-testing-library/cleanup-after-each'
import 'jest-dom/extend-expect'

import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import ErrorBoundary from '../error-boundary'
import { reportError as mockReportError } from '../api'

jest.mock('../api', () => {
  return {
    reportError: jest.fn(() => Promise.resolve({ success: true }))
  }
})

const Bomb = ({ shouldThrow }) => {
  if (shouldThrow) throw new Error('BOMB')

  return null
}

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  console.error.mockRestore()
})

test('calls reportErrors and renders that there was a problem', () => {
  const { container, rerender, getByText } = render(<ErrorBoundary><Bomb /></ErrorBoundary>)

  rerender(<ErrorBoundary><Bomb shouldThrow /></ErrorBoundary>)

  expect(container).toHaveTextContent(/there was a problem/i)
  expect(console.error).toHaveBeenCalledTimes(2)
  expect(mockReportError).toHaveBeenCalledTimes(1)

  const error = expect.any(Error)
  const info = { componentStack: expect.stringContaining('Bomb')}

  expect(mockReportError).toHaveBeenCalledWith(error, info)

  console.error.mockClear()
  mockReportError.mockClear()

  rerender(<ErrorBoundary><Bomb /></ErrorBoundary>)

  const tryButton = getByText(/try again?/i)

  fireEvent.click(tryButton)

  expect(mockReportError).not.toHaveBeenCalled()
  expect(container).not.toHaveTextContent(/there was a problem/i)
  expect(console.error).not.toHaveBeenCalled()
})
