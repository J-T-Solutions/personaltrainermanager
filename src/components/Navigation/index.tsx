
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import { Routes } from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import { AuthUserContext } from '../Session';

 
const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      { authUser => authUser ? ( <NavigationAuth authUser={authUser }/> ) : ( <NavigationNonAuth /> )}
    </AuthUserContext.Consumer>
    
  </div>
);

const NavigationAuth = ({ authUser }:any) => (
  <ul>
    <li>
      <Link to={Routes.Landing}>Landing</Link>
    </li>
    <li>
      <Link to={Routes.Home}>Home</Link>
    </li>
    <li>
      <Link to={Routes.Account}>Account</Link>
    </li>
    {!!authUser.roles[ROLES.ADMIN] && (
      <li>
        <Link to={Routes.Admin}>Admin</Link>
      </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={Routes.Landing}>Landing</Link>
    </li>
    <li>
      <Link to={Routes.SignIn}>Sign In</Link>
    </li>
    <li>
      <Link to={Routes.SignUp}>Sign Up</Link>
    </li>
  </ul>
  );
  
 
export default Navigation;