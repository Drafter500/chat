import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import App from './components/App';
import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';
import NotFoundPage from './pages/NotFoundPage';
import './style.sass';


ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <App>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/room" component={RoomPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </App>
  </Router>
  ,
  document.getElementById('root'),
);
