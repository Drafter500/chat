import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import App from './components/App';
import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';
import NotFoundPage from './pages/NotFoundPage';
import './style.sass';


const backendUrl = 'http://localhost';
const port = 3000;
const basePath = `${backendUrl}:${port}`;

$(document).ready(() => {
  $('#enter-button').click(() => {
    alert(123123123);
    const username = $('#username').val();
    const age = $('#age').val();
    const gender = $('#gender').val();

    // $.post('http://localhost:3000', { username, age, gender })
    //   .done(() => {
    //     console.log('success');
    //   });

    $.get(`${basePath}/users`, (res) => {
      console.log(res);
    });
  });
});

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <App>
      <Route exact path="/" component={HomePage} />
      <Route path="/room" component={RoomPage} />
    </App>
  </Router>
  ,
  document.getElementById('root'),
);
