import { Link } from 'react-router-dom';
 
import {Routes} from '../../constants/routes';
 
const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to={Routes.SignIn}>Sign In</Link>
      </li>
      <li>
        <Link to={Routes.Landing}>Landing</Link>
      </li>
      <li>
        <Link to={Routes.Home}>Home</Link>
      </li>
      <li>
        <Link to={Routes.Account}>Account</Link>
      </li>
      <li>
        <Link to={Routes.Admin}>Admin</Link>
      </li>
    </ul>
  </div>
);
 
export default Navigation;