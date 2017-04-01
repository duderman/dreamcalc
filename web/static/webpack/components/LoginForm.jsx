import 'components/LoginForm.less'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as EmailValidator from 'email-validator'
import { requestLogin } from 'ducks/login'

class LoginForm extends Component {
  state = {
    email: ''
  }

  onButtonClick () {
    const email = this.state.email
    if (!email) return
    this.props.requestLogin(email)
  }

  onEmailChange () {
    const email = this.refs.input.value
    const invalid = !EmailValidator.validate(email)
    this.setState({ email, invalid })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ invalid: !nextProps.valid })
  }

  render () {
    const { email, invalid } = this.state
    return (
      <div className="login-form">
        <div className="login-form__label">Your email:</div>
        <input
          className="login-form__input"
          name="email"
          type="email"
          onChange={ this.onEmailChange.bind(this) }
          ref="input" />
        { invalid && <div className="login-form__error">Имэйл инвалид</div> }
        <button className="login-form__btn"
          onClick={ this.onButtonClick.bind(this) }
          disabled={ invalid || !email }>
          Send
        </button>
      </div>
    )
  }
}

const mapState = state => ({
  valid: state.getIn(['login', 'valid']),
  checking: state.getIn(['login', 'checking'])
})
export default connect(mapState, ({ requestLogin }))(LoginForm)

