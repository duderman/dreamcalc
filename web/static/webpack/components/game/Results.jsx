import React, { Component } from 'react'
import { RaisedButton } from 'material-ui'

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  button: {
    margin: 30
  },
  text: {
    fontSize: '2em'
  }
}

const round = (num) => Math.round(num * 1000) / 1000

class Intro extends Component {
  render () {
    const { onRestart, times } = this.props
    const total = round(times.reduce((p, c) => p + c, 0) / 1000.0)
    const mid = round(total / times.length)
    return (
      <div style={ styles.container }>
        <div style={ styles.text }>Общее время: { total } сек.</div>
        <div style={ styles.text }>Среднее: { mid } сек.</div>
        <RaisedButton
          onTouchTap={ onRestart }
          label="РВАНУЛИ ПО-НОВОЙ!"
          fullWidth={ true }
          primary={ true }
          style={ styles.button }
        />
      </div>
    )
  }
}

export default Intro
