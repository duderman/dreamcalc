import React, { Component } from 'react'
import { RaisedButton } from 'material-ui'
import { red500, green500 } from 'material-ui/styles/colors'

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  text: {
    fontSize: '2em',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  span: {
    height: 50,
    width: 50,
    minWidth: 50,
    margin: 10,
    textAlign: 'center'
  },
  answerDefault: {
  },
  correct: {
    color: green500,
    borderBottomColor: green500
  },
  incorrect: {
    color: red500,
    borderBottomColor: red500
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    margin: '30px 0'
  },
  button: {
    width: 50,
    height: 50,
    margin: 10
  },
  eqButtonDiv: {
    width: '100%'
  },
  eqButton: {
    height: 70
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

  calculateAnswerStyle () {
    const base = { ...styles.span, ...styles.answerDefault }
    if (!this.state.answer) return base
    const answerExtraStyle = this.state.correct ? styles.correct : styles.incorrect
    return { ...base, ...answerExtraStyle }
  }

  render () {
    const { firstNumber, secondNumber, answer, operation } = this.props

    return (
      <div style={ styles.container }>
        <div style={ styles.text }>
          <span style={ styles.span }>{ firstNumber }</span>
          <span style={ this.calculateAnswerStyle() }>
            { operation }
          </span>
          <span style={ styles.span }>{ secondNumber }</span>
          <span style={ styles.span }>=</span>
          <span style={ styles.span }>{ answer }</span>
        </div>
        <div style={ styles.buttons }>
          <RaisedButton onTouchTap={ this.onClick.bind(this) } label="+" style={ { ...styles.button, marginLeft: 0 } } />
          <RaisedButton onTouchTap={ this.onClick.bind(this) } label="-" style={ styles.button } />
          <RaisedButton onTouchTap={ this.onClick.bind(this) } label="*" style={ styles.button } />
          <RaisedButton onTouchTap={ this.onClick.bind(this) } label="/" style={ { ...styles.button, marginRight: 0 } } />
        </div>
        <div style={ styles.eqButtonDiv }>
          <RaisedButton
            onTouchTap={ this.finish.bind(this) }
            label="="
            fullWidth={ true }
            disabled={ !this.state.correct }
            primary={ true }
            style={ styles.eqButton }
          />
        </div>
      </div>
    )
  }
}

export default Question
