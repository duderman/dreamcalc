import React, { Component } from 'react'

class Button extends Component {
  render () {
    const { onClick, text, disabled } = this.props
    return (
      <button
        className="question__answer"
        onClick={ onClick }
        disabled={ disabled }>
        { text }
      </button>
    )
  }
}

class Question extends Component {
  state = {
    correct: false, answer: ''
  }

  onClick (e) {
    const answer = e.target.textContent
    const correct = (answer === this.props.operation)
    this.setState({ correct: correct, answer: answer })
  }

  finish () {
    this.setState({ correct: false, answer: '' })
    this.props.onAnswer()
  }

  render () {
    const { firstNumber, secondNumber, answer } = this.props
    return (
      <div className="game__question question">
        <div className="question__text">
          <span className="question__first">{ firstNumber } </span>
          { this.state.answer &&
            <span className={ `question__answer question__answer--${this.state.correct ? 'correct' : 'wrong'}` }>
              { this.state.answer }
            </span>
          }
          <span className="question__second"> { secondNumber }</span>
          <span className="question__equals">=</span>
          <span className="question__expected">{ answer }</span>
        </div>
        <Button onClick={ this.onClick.bind(this) } text="+" />
        <Button onClick={ this.onClick.bind(this) } text="-" />
        <Button onClick={ this.onClick.bind(this) } text="*" />
        <Button onClick={ this.onClick.bind(this) } text="/" />
        <Button onClick={ this.finish.bind(this) } text="=" disabled={ !this.state.correct } />
      </div>
    )
  }
}

export default Question
