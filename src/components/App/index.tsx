import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";

import { Routes } from "../../constants/routes";

const App = () => (
  <Router>
    <div>
      <span>Sign in test</span>
      <Navigation />

      <hr />

      <Route exact path={Routes.Landing} component={LandingPage} />
      <Route path={Routes.SignUp} component={SignUpPage} />
      <Route path={Routes.SignIn} component={SignInPage} />
      <Route path={Routes.PasswordForget} component={PasswordForgetPage} />
      <Route path={Routes.Home} component={HomePage} />
      <Route path={Routes.Account} component={AccountPage} />
      <Route path={Routes.Admin} component={AdminPage} />
    </div>
  </Router>
);

export default App;
