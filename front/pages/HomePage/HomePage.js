import React from 'react';
import Login from '../../components/Login/Login';


class HomePage extends React.Component {

  render() {
    return (
      <section className="homePage">
        <h1 className="homePage-header">Welcome!</h1>
        <Login />
      </section>
    )
  }
};

export default HomePage;
