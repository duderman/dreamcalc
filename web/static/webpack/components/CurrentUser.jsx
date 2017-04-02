import React, { Component } from 'react'
import { FlatButton } from 'material-ui'

const styles = {
  main: {
    color: 'white',
    marginTop: 5
  },
  currentEmail: {

  }
}

class CurrentUser extends Component {
  static muiName = 'FlatButton'

  render () {
    const { email, onLogout } = this.props
    return (
      <div style={ styles.main }>
        <span style={ styles.currentEmail }>{ email }</span>
        <FlatButton label="Выйти" onTouchTap={ onLogout } secondary={ true } />
      </div>
    )
  }
}

export default CurrentUser
