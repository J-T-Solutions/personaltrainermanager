/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react'
import { withFirebase } from '../Firebase'

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

//Fix Any type
interface IProps {
  firebase?: any
}

interface IState {
  passwordOne: string
  passwordTwo: string
  error: { message: string } | null
  [x: string]: string | { message: string } | null
}

class PasswordChangeForm extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { passwordOne } = this.state

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
      })
      .catch((error: { message: string }) => {
        this.setState({ error })
      })

    event.preventDefault()
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { passwordOne, passwordTwo, error } = this.state

    const isInvalid = passwordOne !== passwordTwo || passwordOne === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default withFirebase(PasswordChangeForm)
