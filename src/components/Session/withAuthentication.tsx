import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

interface IProps {
  firebase?: any;
}

interface IState {
  authUser: any;
}


const withAuthentication = (Component: React.FC) => {
  class WithAuthentication extends React.Component<IProps, IState> {
    listener:any;
    constructor(props:any) {
      super(props);
      
      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser')!),

      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        (authUser:any) => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.setState({ authUser });
        },
        () => {
          localStorage.removeItem('authUser');
          this.setState({ authUser: null });
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;