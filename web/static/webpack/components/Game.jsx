import React, { Component } from 'react'
import { connect } from 'react-redux'

import { startGame, next } from 'ducks/game'

import Intro from './game/Intro'
import Question from './game/Question'
import Results from './game/Results'

class Game extends Component {
  onStart () {
    this.props.startGame()
  }

  onAnswer () {
    this.props.next()
  }

  render () {
    const { started, finished, currentQuestion, responseTimes } = this.props
    let component = <div className="game__error">Что-то пошло не так :(</div>
    if (finished) {
      component = <Results times={ responseTimes } onRestart={ this.onStart.bind(this) } />
    } else if (!started) {
      component = <Intro onStart={ this.onStart.bind(this) } />
    } else if (currentQuestion) {
      component = <Question onAnswer={ this.onAnswer.bind(this) } { ...currentQuestion } />
    }

    return (
      <div className="game">
        { component }
      </div>
    )
  }
}

const mapState = state => state.get('game').toJS()
const mapDispatch = { startGame, next }

export default connect(mapState, mapDispatch)(Game)
