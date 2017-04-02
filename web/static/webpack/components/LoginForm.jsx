import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as EmailValidator from 'email-validator'
import { requestLogin } from 'ducks/login'
import { TextField, RaisedButton } from 'material-ui'

class LoginForm extends Component {
  state = {
    email: ''
  }

  onButtonClick () {
    const email = this.state.email
    if (!email) return
    this.props.requestLogin(email)
  }

  onEmailChange (e) {
    const email = e.target.value
    const invalid = !EmailValidator.validate(email)
    this.setState({ email, invalid })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ invalid: !nextProps.valid })
  }

  render () {
    const { email, invalid } = this.state
    const { checking } = this.props
    return (
      <div className="login-form">
        <TextField
          floatingLabelText="Твой имэйл"
          errorText={ invalid ? 'инвалид' : '' }
          onChange={ this.onEmailChange.bind(this) }
          fullWidth={ true }
        />
        <RaisedButton
          label="Войти"
          fullWidth={ true }
          primary={ true }
          disabled={ invalid || !email || checking }
          onTouchTap={ this.onButtonClick.bind(this) }
        />
      </div>
    )
  }
}

const mapState = state => ({
  valid: state.getIn(['login', 'valid']),
  checking: state.getIn(['login', 'checking'])
})
export default connect(mapState, ({ requestLogin }))(LoginForm)

