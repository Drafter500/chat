import React from 'react';
import Login from '../../components/Login/Login';
import './styles/_main.sass';


class HomePage extends React.Component {

  render() {
    return (
      <div className="homePage">
        <h1 className="homePage-header">Welcome!</h1>
        <Login />
      </div>
    )
  }
};

export default HomePage;
