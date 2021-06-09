import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Firebase, { withFirebase } from '../Firebase'
import { Routes } from '../../constants/routes'

const PasswordForgetPage: React.FC = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
)

const INITIAL_STATE = {
  email: '',
  error: null,
}

interface IProps {
  firebase?: Firebase
}

interface IState {
  email: string
  error: { message: string } | null
  [x: string]: string | { message: string } | null
}

class PasswordForgetFormBase extends Component<IProps, IState> {
  // Fix Any type
  constructor(props: IProps) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { email } = this.state

    // Validate condition if necessary
    if (!this.props.firebase) {
      return
    }

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
      })
      .catch((error) => {
        this.setState({ error })
      })

    event.preventDefault()
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { email, error } = this.state
    const isInvalid = email === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

const PasswordForgetLink: React.FC = () => (
  <p>
    <Link to={Routes.PasswordForget}>Forgot Password?</Link>
  </p>
)

export default PasswordForgetPage
const PasswordForgetForm = withFirebase(PasswordForgetFormBase)
export { PasswordForgetForm, PasswordForgetLink }
