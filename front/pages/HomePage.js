import React from 'react';
import Login from '../components/Login';


class HomePage extends React.Component {

  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <Login />
      </div>
    )
  }
};

export default HomePage;
