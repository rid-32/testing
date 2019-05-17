import 'babel-polyfill'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import { Redirect as MockRedirect } from 'react-router'
import { render, fireEvent, wait, waitForElement } from 'react-testing-library'
import { build, fake, sequence } from 'test-data-bot'

import { Editor } from '../post-editor-01-markup'
import { savePost as mockSavePost } from '../api'

jest.mock('react-router', () => ({
  Redirect: jest.fn(() => null)
}))

jest.mock('../api', () => {
  return {
    savePost: jest.fn(() => Promise.resolve())
  }
})

afterEach(() => {
  mockSavePost.mockClear()

  MockRedirect.mockClear()
})

const postBuilder = build('Post').fields({
  title: fake(faker => faker.lorem.words()),
  content: fake(faker => faker.lorem.paragraphs().replace(/\r/g, '')),
  tags: fake(faker => [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()])
})

const userBuilder = build('User').fields({
  id: sequence(s => `user-${s}`),
})

const renderEditor = () => {
  const fakePost = postBuilder()
  const fakeUser = userBuilder()
  const utils = render(<Editor user={fakeUser} />)

  utils.getByLabelText(/title/i).value = fakePost.title
  utils.getByLabelText(/content/i).value = fakePost.content
  utils.getByLabelText(/tags/i).value = fakePost.tags.join(',')

  const submitButton = utils.getByText(/submit/i)

  return {
    ...utils,
    submitButton,
    fakeUser,
    fakePost,
  }
}

test('testing a form with title, content, tags and a submit button', async () => {
  const { getByLabelText, getByText, fakePost, fakeUser, submitButton } = renderEditor()
  const preDate = Date.now()

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled()
  expect(mockSavePost).toHaveBeenCalledTimes(1)
  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    date: expect.any(String),
    authorId: fakeUser.id
  })

  const postDate = Date.now()
  const data = new Date(mockSavePost.mock.calls[0][0].date).getTime()

  expect(data).toBeGreaterThanOrEqual(preDate)
  expect(data).toBeLessThanOrEqual(postDate)

  await wait(() => expect(MockRedirect).toHaveBeenCalledTimes(1))

  expect(MockRedirect).toHaveBeenCalledWith({ to: '/' }, {})
})

test('renders an error message from the server', async () => {
  const testError = 'test error'
  mockSavePost.mockRejectedValueOnce({ data: { error: testError}})
  const { getByLabelText, getByText, getByTestId, submitButton } = renderEditor()

  fireEvent.click(submitButton)

  const postError = await waitForElement(() => getByTestId('post-error'))

  expect(postError).toHaveTextContent(testError)
  expect(submitButton).not.toBeDisabled()
})
