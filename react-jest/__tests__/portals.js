import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import { render, within } from 'react-testing-library'
import { Modal } from '../modal'

test('modal shows the children', () => {
  const { debug } = render(<Modal><div>test</div></Modal>)
  const { getByText } = within(document.getElementById('modal-root'))

  debug()

  expect(getByText('test')).toBeInTheDocument()
})
