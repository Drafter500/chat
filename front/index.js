import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import './styles/style.sass';
import App from './components/App';
import HomePage from './pages/HomePage/HomePage';
import RoomPage from './pages/RoomPage';
import NotFoundPage from './pages/NotFoundPage';
import history from './config/history';


ReactDOM.render(
  <Router history={history}>
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
