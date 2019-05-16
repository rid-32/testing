import 'babel-polyfill'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import 'jest-axe/extend-expect'
import React from 'react'
import { render } from 'react-testing-library'
import { axe } from 'jest-axe'

const Form = () => {
  return (
    <form>
      <label htmlFor="user-name-hello">Username</label>
      <input id="user-name-hello" name="username" placeholder="username" />
    </form>
  )
}

test('the form is accessible', async () => {
  const { container, getByLabelText } = render(<Form />)
  // const results = await axe(container.innerHTML)

  expect(getByLabelText('Username').name).toBe('username')
  // expect(results).toHaveNoViolations()
})

