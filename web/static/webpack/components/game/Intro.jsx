import React, { Component } from 'react'
import { RaisedButton } from 'material-ui'

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  disclaimer: {
    fontSize: '2em'
  },
  button: {
    margin: 30
  }
}

class Intro extends Component {
  render () {
    const { onStart } = this.props
    return (
      <div style={ styles.container }>
        <div style={ styles.disclaimer }>Ну давай там отвечай всякое</div>
        <RaisedButton
          label="РВАНУЛИ!"
          primary={ true }
          style={ styles.button }
          onTouchTap={ onStart }
        />
      </div>
    )
  }
}

export default Intro
