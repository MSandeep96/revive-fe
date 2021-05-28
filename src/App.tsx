import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.css';
import { Home } from './features/home/Home';
import { Landing } from './features/landing/Langing';
import { useAppDispatch } from './redux/hooks';
import {
  isAuthenticated,
  setAuthToken,
  setRefreshToken,
} from './util/tokenStore';

function App() {
  const query = new URLSearchParams(useLocation().search);
  const qToken = query.get('t');
  const qRefreshToken = query.get('r_t');
  const history = useHistory();
  const isUserAuthenticated = isAuthenticated();
  const dispatch = useAppDispatch();

  if (qToken !== null && qRefreshToken !== null) {
    setAuthToken(qToken);
    setRefreshToken(qRefreshToken);
    history.replace({
      search: '',
    });
  }

  return (
    <Switch>
      <Route path="/">{isUserAuthenticated ? <Home /> : <Landing />}</Route>
    </Switch>
  );
}

export default App;
