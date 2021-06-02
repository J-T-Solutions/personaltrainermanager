import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import Firebase, { withFirebase } from '../Firebase';
import { Routes } from '../../constants/routes';
import { PasswordForgetLink } from '../PasswordForget';

const ERROR_CODE_ACCOUNT_EXISTS =
'auth/account-exists-with-different-credential';
const ERROR_MSG_ACCOUNT_EXISTS = `
An account with an E-Mail address to this social account already exists. Try to login from this account instead and associate your social accounts on your personal account page.
`;


const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignInGoogle />
    <SignInFacebook />
    <SignUpLink />
    <PasswordForgetLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

interface IState {
  email: string;
  password: string;
  error: { message: string } | null;
  [x:string]:string | { message: string} | null;
}

//Do poprawy interface
interface IProps {
  firebase: Firebase;
  history?: any;
}
//Przerzucić klasę do osobnego pliku
class SignInFormBase extends Component<IProps, IState> {

  //Poprawić ANY
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
  
    const { email, password } = this.state;
    
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(Routes.Home);
      })
      .catch(error => {
        this.setState({ error });
      });

      event.preventDefault();
    };

  onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value });
    };

  render() {

    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

interface GoogleState {
  error: { message: string } | null;
}

type socialTypes = {
    uid: string;
    displayName: string;
    email:string;
}

class SignInGoogleBase extends Component<IProps, GoogleState> {
  // Fix Any type
  constructor(props:any) {
    super(props);
    this.state = { error: null };
  }

  

  onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    this.props.firebase
      .doSignInWithGoogle()
      .then((socialAuthUser:any) => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase
        .user(socialAuthUser.user.uid)
        .set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {},
        })
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(Routes.Home);
      })
      .catch(error => {

        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
          }

        this.setState({ error });
      });

    event.preventDefault();

  };

  render() {

    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
      <button type="submit">Sign In with Google</button>
      {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInFacebookBase extends Component<IProps, GoogleState> {
  constructor(props:any) {
    super(props);
    this.state = { error: null };
    }

  onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    this.props.firebase
    .doSignInWithFacebook()
    .then((socialAuthUser:any) => {
      // Create a user in your Firebase Realtime Database too
      return this.props.firebase
      .user(socialAuthUser.user.uid)
      .set({
        username: socialAuthUser.additionalUserInfo.profile.name,
        email: socialAuthUser.additionalUserInfo.profile.email,
        roles: {},
      });
    })
    .then(() => {
      this.setState({ error: null });
      this.props.history.push(Routes.Home);
    })
    .catch(error => {

      if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
        error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }        

      this.setState({ error });
    });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
      <button type="submit">Sign In with Facebook</button>
      {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 
const SignInGoogle = compose(
  withRouter,
  withFirebase,
  )(SignInGoogleBase);

const SignInForm = compose(
  withRouter,
  withFirebase,
  )(SignInFormBase);

const SignInFacebook = compose(
  withRouter,
  withFirebase,
  )(SignInFacebookBase);
    

export default SignInPage;
export { SignInForm, SignInGoogle, SignInFacebook };
