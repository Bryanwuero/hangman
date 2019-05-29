import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { shallow } from 'enzyme'
import Layout from './../src/components/Layout/index'

describe('Testing Hangman page', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  it('should have a header', () => {
    const wrapper = shallow(<Layout />)
    const result = wrapper.find({ className: 'header' })
    expect(result).to.have.lengthOf(1)
  })
})
