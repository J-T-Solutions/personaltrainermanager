import { Component } from 'react';
import { compose } from 'recompose';


import Firebase, { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';

import UserList from './UserList';

interface IProps {
  firebase: Firebase;
}

interface IState {
  loading: boolean;
  users: { uid: string, email: string, username: string }[];
}

class AdminPage extends Component<IProps, IState> {

  constructor(props:any) {
    super(props);
    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    console.log(this.props.firebase.users())
    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => 
        ({
          ...usersObject[key],
          uid: key,
        })
      );

        
      this.setState({
        users: usersList,
        loading: false,
      });
      
    });
    console.log(this.state)
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
    }
    

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>
        <p>
          The Admin Page is accessible by every signed in admin user.
        </p>  
        {loading && <div>Loading ...</div>}
        <UserList users={users} />
      </div>
    );
  }
}

const condition = (authUser:any) =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase,
  )(AdminPage);
