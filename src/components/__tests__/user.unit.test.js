// https://reactjs.org/docs/test-utils.html

import React from 'react'
import renderer from 'react-test-renderer'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import User from '../User'

import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

const mockStore = configureStore([])

describe('test User component', () => {
  let store
  let component
  let container

  beforeEach(() => {
    // mock store
    store = mockStore({
      user: {
        userList: [{
          name: 'zhangsan'
        }]
      }
    })

    // setup a DOM element as a render target
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container)
    document.body.removeChild(container)
    container = null
  })

  test('render successfully', () => {
    component = renderer.create(
      <Provider store={store}>
        <User />
      </Provider>
    ).toJSON()
    expect(component).toMatchSnapshot()
  })

  test('on click to add user', () => {
    // get a hold of the button element, and trigger some clicks on it
    act(() => {
      render(
        <Provider store={store}>
          <User />
        </Provider>,
        container
      )
    })
    const user = document.querySelector('.user')
    expect(user.innerHTML).toBe('zhangsan')
  })
})
