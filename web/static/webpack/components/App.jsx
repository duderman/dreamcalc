import React, { Component } from 'react'

import Game from './Game'
import Header from './Header'

const styles = {
  app: {
    height: '100%'
  }
}

class App extends Component {
  render () {
    return (
      <div className="app" style={ styles.app }>
        <Header />
        <Game />
      </div>
    )
  }
}

export default App
