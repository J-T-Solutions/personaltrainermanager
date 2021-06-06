import React from 'react';
import AuthUserContext from './context';
import Firebase, { withFirebase } from '../Firebase';

interface IProps {
  firebase: Firebase;
}

interface IState {
  isSent: boolean;
}

const withEmailVerification = (Component:React.FC) => {

  class WithEmailVerification extends React.Component<IProps, IState> {
    constructor(props:any) {
      super(props);
      this.state = { isSent: false };
    }

    onSendEmailVerification = () => {
      this.props.firebase.doSendEmailVerification()
      .then(() => this.setState({ isSent: true }));
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => 
            needsEmailVerification(authUser) ? (
              <div>
                {this.state.isSent ? (
                  <p>
                    E-Mail confirmation sent: Check you E-Mails (Spam
                    folder included) for a confirmation E-Mail.
                    Refresh this page once you confirmed your E-Mail.
                  </p>
                ) : (
                  <p>
                    Verify your E-Mail: Check you E-Mails (Spam folder
                    included) for a confirmation E-Mail or send
                    another confirmation E-Mail.
                  </p>
                )}
                <button
                  type="button"
                  onClick={this.onSendEmailVerification}
                  disabled={this.state.isSent}
                >
                  Send confirmation E-Mail
                </button>
              </div>
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      );
    }
  }
  return withFirebase(WithEmailVerification);
};

const needsEmailVerification = (authUser:any):any => {
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
  .map((provider: { providerId: string }) => provider.providerId)
  .includes('password');
}

export default withEmailVerification;