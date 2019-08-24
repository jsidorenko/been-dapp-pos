import React from 'react';
import LoggedIn from './LoggedIn';
import Home from './Home';
import Agenda from './Agenda';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import Profile from './Profile';
import { Storage, STORAGE_KEYS } from '../services/storage';

const AuthButton = withRouter(({ history }) => {
  const existingPk = Storage.get(STORAGE_KEYS.PRIVATE_KEY);
  if (!existingPk) return <p>Not logged in</p>;
  return (
    <div>
      <button onClick={() => {
        history.push('/');
        Storage.reset();
      }}
      >
        Sign out
      </button>
      <a href="/profile">My Profile</a>
    </div>
  );
});

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route exact {...rest} render={(props) => {
    return (
      Storage.isStored(STORAGE_KEYS.PRIVATE_KEY)
        ? <Component {...props} />
        : <Redirect to={{
          pathname: '/signup',
          state: { from: props.location },
        }} />
    )
  }} />
);

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <AuthButton/>
          <PrivateRoute path='/' component={LoggedIn} />
          <PrivateRoute exact path='/loggedIn' component={LoggedIn} />
          <PrivateRoute exact path='/profile' component={Profile} />
          <Route exact path="/:pk" component={Home} />
          <Route exact path="/agenda" component={Agenda} />
        </div>
      </Router>
    )
  }
}
