import React from 'react';
import ReactDOM from 'react-dom';
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
  <div>
    67868
  </div>
  ,
  document.getElementById('root'),
);
