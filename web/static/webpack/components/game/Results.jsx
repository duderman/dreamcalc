import React, { Component } from 'react'

class Intro extends Component {
  render () {
    const { onRestart, times } = this.props
    const total = times.reduce((p, c) => p + c, 0) / 1000.0
    const mid = total / times.length
    return (
      <div className="game__results results">
        <div className="results__total">Общее время: { total }</div>
        <div className="results__mid">Среднее: { mid }</div>
        <button onClick={ onRestart }>РВАНУЛИ ПО-НОВОЙ!</button>
      </div>
    )
  }
}

export default Intro
