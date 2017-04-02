import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Paper } from 'material-ui'

import LoginForm from './LoginForm'

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  paper: {
    padding: 30
  }
}

class Login extends Component {
  render () {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const redirectToReferrer = !!this.props.currentEmail

    if (redirectToReferrer) {
      return (
        <Redirect to={ from }/>
      )
    }

    return (
      <div style={ styles.container }>
        <Paper zDepth={ 2 } style={ styles.paper }>
          <LoginForm />
        </Paper>
      </div>
    )
  }
}

const mapState = state => ({ currentEmail: state.getIn(['login', 'email']) })

export default connect(mapState)(Login)
