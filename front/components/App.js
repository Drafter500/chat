import React from 'react';
import propTypes from 'prop-types';
import Header from './Header';
import LogoutButton from './LogoutButton/LogoutButton';
import history from '../config/history';


class App extends React.Component {

  static isInTheRoom() {
    return history.location.pathname === '/room';
  }

  render() {
    return (
      <div>
        <Header>
          { App.isInTheRoom() && <LogoutButton /> }
        </Header>
        <div className="main">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: propTypes.node,
};

App.defaultProps = {
  children: null,
};

export default App;
