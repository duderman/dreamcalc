import 'components/App.less'
import React, { Component } from 'react'

import Game from './Game'

class App extends Component {
  render () {
    return (
      <div className="app">
        { this.props.currentEmail }
        <Game />
      </div>
    )
  }
}

export default App
