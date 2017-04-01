import React, { Component } from 'react'

class Intro extends Component {
  render () {
    const { onStart } = this.props
    return (
      <div className="game__intro">
        Ну давай там отвечай всякое
        <button onClick={ onStart }>РВАНУЛИ!</button>
      </div>
    )
  }
}

export default Intro
