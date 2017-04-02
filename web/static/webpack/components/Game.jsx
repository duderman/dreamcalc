import React, { Component } from 'react'
import { connect } from 'react-redux'
import { red500 } from 'material-ui/styles/colors'

import { startGame, next } from 'ducks/game'

import Intro from './game/Intro'
import Question from './game/Question'
import Results from './game/Results'

const styles = {
  game: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  error: {
    color: red500
  }
}

class Game extends Component {
  onStart () {
    this.props.startGame()
  }

  onAnswer () {
    this.props.next()
  }

  renderComponent () {
    const { started, finished, currentQuestion, responseTimes } = this.props

    if (finished) {
      return <Results times={ responseTimes } onRestart={ this.onStart.bind(this) } />
    } else if (!started) {
      return <Intro onStart={ this.onStart.bind(this) } />
    } else if (currentQuestion) {
      return <Question onAnswer={ this.onAnswer.bind(this) } { ...currentQuestion } />
    } else {
      return <div style={ styles.error }>Что-то пошло не так :(</div>
    }
  }

  render () {
    return (
      <div className="game" style={ styles.game }>
        { this.renderComponent() }
      </div>
    )
  }
}

const mapState = state => state.get('game').toJS()
const mapDispatch = { startGame, next }

export default connect(mapState, mapDispatch)(Game)
