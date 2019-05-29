import React, { Component } from 'react'
const randomWords = require('random-words')

class Layout extends Component {
  constructor () {
    super()
    this.state = {
      lives: 0,
      won: 0,
      lost: 0,
      split: [],
      splt: [],
      chosen: false,
      hasWord: false,
      key: []
    }
  }

  newGame = () => {
    const random = randomWords()
    const letter = random.split('')
    this.setState({
      split: letter,
      splt: [],
      chosen: false,
      lives: 7,
      key: [],
      hasWord: false
    })
  }
  componentDidMount = () => {
    this.newGame()
  }

  onKeyPressed = (e) =>{
    // Cheks if he chooses a repeated chossen letter
    const key = this.state.key.slice(0)
    key.push(e.key)
    if (!this.state.key.includes(e.key)) {
      this.setState({
        key: key
      })
    } else {
      this.setState({
        chosen: true
      })
    }
    // Cheks if the random word array has the the key(letter) pressed
    if (this.state.split.includes(e.key)) {
      this.setState({
        hasWord: true
      })
      for(var word of this.state.split) {
        if((word === e.key) && !this.state.chosen) {
          this.state.splt.push(word)
          if(this.state.splt.length === this.state.split.length) {
            this.youWin()
          }
        }
      }
    }
    else { 
      this.setState({
        lives: this.state.lives-1,
        hasWord: false
      })
      if (this.state.lives <= 1) {
        this.gameOver()
      } 
    }
  }

  youWin = () => {
    this.setState({
      won: this.state.won+1
    })
    if (window.confirm('You Win! \n Do you what to play Again?')){
      this.componentDidMount()
    }else {
      console.log('NO :(')
    }
  }

  gameOver = () => {
    this.setState({
      lost: this.state.lost+1
    })
    if (window.confirm('Game Over \n Do you want to play again?')){
      this.componentDidMount()
    }else {
      console.log('NO :(')
    }
  }
  render () {
    const entries = this.state.split
    const character = this.state.key
    const visible = this.state.hasWord ? 'guess-visible' : 'guess'
    const guesses = this.state.lives
    return (
      <div onKeyDown={(e) => this.onKeyPressed(e)} tabIndex='0' className='app'>
        <div className='header'>
          <h1>Hangman Game</h1>
          <h3>Guess the word</h3>
        </div>
        <section className='layout'>
          <ol className='word'>
            { entries.map((letters, index) => 
              <li className='letter' key={index} ><span className={visible} >{letters}</span></li>
            )}
          </ol>
        </section>
        <div className='board'>
          <table>
            <thead>
              <tr>
                <th>Letters</th>
                <th>Guesses</th>
                <th>Win</th>
                <th>Lost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> 
                  { character.map((char, index) => 
                    <li className='chars' key={index}><span>{char}</span></li>
                  )}
                </td>
                <td>{guesses}</td>
                <td>{this.state.won}</td>
                <td>{this.state.lost}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='instructions'>
          <h2>Instructions</h2>
          <ul>
            <li>Click on the screen to start playing</li>
            <li>Click on any key letter of the english alphabet to guess the word</li>
            <li>If the letter is correct it would appear if not you will loose 1 live</li>
            <li>Every time you loose or win you will beasked if you want to played again </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Layout
