import React, { Component } from 'react'
const randomWords = require('random-words')

class Layout extends Component {
  constructor () {
    super()
    this.state = {
      lives: 7,
      guesses: 0,
      split: [],
      hasWord: false,
      // word: [],
      // letters: 0,
      // letter: '',
      key: []
    }
  }

  componentDidMount = () => {
    const random = randomWords()
    const letter = random.split('')
    this.setState({
      split: letter,
    })
  }

  onKeyPressed = (e) =>{
    const key = this.state.key.slice(0)
    key.push(e.key)
    if (!this.state.key.includes(e.key)) {
      this.setState({
        key: key
      })
    } else {
      console.log('already chose word!')
    }
    console.log('split', this.state.split)
    if ((this.state.split).includes(e.key)) {
      this.setState({
        hasWord: true
      })
    }
  }
  render () {
    const entries = this.state.split
    const character = this.state.key
    const visible = this.state.hasWord ? 'guess-visible' : 'guess'
    return (
      <div onKeyDown={(e) => this.onKeyPressed(e)} tabIndex='0'>
        <h1>Hangman Game</h1>
        <h3>Guess the word</h3>
        <section className='layout'>
          <ol className='word'>
            { entries.map((letters) => 
              <li className='letter' key={letters}><span className={visible}>{letters}</span></li>
            )}
          </ol>
        </section>
        <div className='board'>
          <table>
            <thead>
              <tr>
                <th>Letters</th>
                <th>Lives</th>
                <th>Guesses</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> 
                  { character.map((char) => 
                    <li className='chars' key={char}><span>{char}</span></li>
                  )}
                </td>
                <td>7</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Layout
